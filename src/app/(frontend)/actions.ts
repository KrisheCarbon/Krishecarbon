'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

export type EnquiryState = {
  status: 'idle' | 'sent' | 'error'
  message?: string
  errors?: { name?: string; organisation?: string; email?: string; phone?: string; interest?: string }
  // What was typed, handed back when sending fails so the form does not come back empty
  values?: Record<string, string>
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// A phone number in any common spelling: at least seven digits once spaces, dashes and brackets are set aside
const hasPhoneDigits = (phone: string) => /^\+?[\d\s().-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 7
const ROLES = ['buyer', 'partner', 'other'] as const
const FAILED = 'We could not send your enquiry just now. Please email us instead:'

/**
 * Saves an enquiry in two places, so it survives either one being down:
 *   - the website's database, where the team sees it under Enquiries in the CMS
 *   - the team's Google Sheet, through the small Apps Script attached to it
 *     (integrations/google-sheet/Code.gs)
 *       ENQUIRY_SHEET_WEBHOOK_URL  the script's web-app address
 *       ENQUIRY_SHEET_SECRET       the same secret the script was given, so nobody else can add rows
 * The visitor is told it worked when at least one of the two kept it.
 */
export async function submitEnquiry(_previous: EnquiryState, form: FormData): Promise<EnquiryState> {
  const text = (name: string) => String(form.get(name) ?? '').trim()

  // People never see this field; anything that fills it in is a bot. Pretend it worked.
  if (text('website')) return { status: 'sent' }

  const enquiry = {
    role: ROLES.find((role) => role === text('role')) ?? 'other',
    name: text('name'),
    organisation: text('organisation'),
    email: text('email'),
    phone: text('phone'),
    interest: text('interest'),
    quantity: text('quantity'),
    geography: text('geography'),
    siteVisit: form.get('siteVisit') === 'on',
    message: text('message'),
    page: text('page'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
  }

  const { siteVisit, ...typed } = enquiry
  const values = { ...typed, siteVisit: siteVisit ? 'on' : '' }

  const errors: EnquiryState['errors'] = {}
  // The same fields the form on KriSHE's current website insists on, plus the email we reply to
  if (!enquiry.name) errors.name = 'Please tell us your name.'
  if (!enquiry.organisation) errors.organisation = 'Please tell us your organisation.'
  if (!EMAIL.test(enquiry.email)) errors.email = 'Please enter a valid email address.'
  if (!hasPhoneDigits(enquiry.phone)) errors.phone = 'Please enter a phone number.'
  if (enquiry.role === 'partner' && !enquiry.interest) errors.interest = 'Please choose one.'
  if (Object.keys(errors).length > 0) return { status: 'error', errors, values }

  const receivedAt = new Date().toISOString()
  const [saved, savedToSheet] = await Promise.all([saveToDatabase(enquiry), sendToSheet({ ...enquiry, receivedAt })])

  if (saved && savedToSheet) await markSavedToSheet(saved)
  if (!saved && !savedToSheet) return { status: 'error', message: FAILED, values }

  return { status: 'sent' }
}

type Enquiry = {
  role: (typeof ROLES)[number]
  name: string
  organisation: string
  email: string
  phone: string
  interest: string
  quantity: string
  geography: string
  siteVisit: boolean
  message: string
  page: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
}

/** The id of the saved enquiry, or null when the database could not be reached. */
async function saveToDatabase(enquiry: Enquiry): Promise<number | string | null> {
  try {
    const payload = await getPayload({ config })
    const doc = await payload.create({ collection: 'enquiries', data: { ...enquiry, savedToSheet: false } })
    return doc.id
  } catch (error) {
    console.error('Could not save enquiry to the database:', error)
    return null
  }
}

async function markSavedToSheet(id: number | string) {
  try {
    const payload = await getPayload({ config })
    await payload.update({ collection: 'enquiries', id, data: { savedToSheet: true } })
  } catch (error) {
    console.error('Enquiry reached the sheet but could not be marked as such:', error)
  }
}

/** Whether the sheet kept the enquiry. */
async function sendToSheet(enquiry: Enquiry & { receivedAt: string }): Promise<boolean> {
  const webhook = process.env.ENQUIRY_SHEET_WEBHOOK_URL
  if (!webhook) {
    console.error('ENQUIRY_SHEET_WEBHOOK_URL is not set, so the enquiry was not sent to the sheet.')
    return false
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...enquiry, secret: process.env.ENQUIRY_SHEET_SECRET ?? '' }),
    })
    // The script answers with { ok: true } once the row is written
    const result = (await response.json()) as { ok?: boolean; error?: string }
    if (!response.ok || !result.ok) throw new Error(result.error || `Sheet answered ${response.status}`)
    return true
  } catch (error) {
    console.error('Could not send enquiry to the sheet:', error)
    return false
  }
}
