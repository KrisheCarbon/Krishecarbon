'use server'

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
 * Sends an enquiry to the team's Google Sheet. The sheet has a small Apps Script
 * attached (integrations/google-sheet/Code.gs) that receives the enquiry and adds a row.
 *   ENQUIRY_SHEET_WEBHOOK_URL  the script's web-app address
 *   ENQUIRY_SHEET_SECRET       the same secret the script was given, so nobody else can add rows
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

  const webhook = process.env.ENQUIRY_SHEET_WEBHOOK_URL
  if (!webhook) {
    console.error('Enquiry received but ENQUIRY_SHEET_WEBHOOK_URL is not set, so it was not saved.')
    return { status: 'error', message: FAILED, values }
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...enquiry,
        secret: process.env.ENQUIRY_SHEET_SECRET ?? '',
        receivedAt: new Date().toISOString(),
      }),
    })
    // The script answers with { ok: true } once the row is written
    const result = (await response.json()) as { ok?: boolean; error?: string }
    if (!response.ok || !result.ok) throw new Error(result.error || `Sheet answered ${response.status}`)
  } catch (error) {
    console.error('Could not send enquiry to the sheet:', error)
    return { status: 'error', message: FAILED, values }
  }

  return { status: 'sent' }
}
