'use client'

import { usePathname } from 'next/navigation'
import { useActionState, useState, useSyncExternalStore } from 'react'

import { submitEnquiry, type EnquiryState } from '@/app/(frontend)/actions'
import { SITE } from '@/lib/site'

import { Arrow } from './Arrow'

const ROLES = [
  { value: 'buyer', label: 'Buyer' },
  { value: 'partner', label: 'Partner (NGO / FPO)' },
  { value: 'other', label: 'Other' },
]

// What a partner may be after: the same choices as the form on the current site
const INTERESTS = ['Partnering for biochar production', 'Information on carbon credits', 'Selling credits', 'Something else']

const INITIAL: EnquiryState = { status: 'idle' }

// The mark on a field that has to be filled in; screen readers get the word from the input itself
const Required = () => (
  <span className="field__req" aria-hidden="true">
    *
  </span>
)

// The address bar's query string: empty on the server, read once in the browser
const subscribeToNothing = () => () => {}
const useQueryString = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => location.search,
    () => '',
  )

/**
 * The enquiry form. A link can preselect who is asking with ?role=partner,
 * and any utm_* parameters on the address are sent along with the enquiry.
 */
export function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, INITIAL)
  const pathname = usePathname()
  const params = new URLSearchParams(useQueryString())

  const asked = params.get('role')
  const [picked, setPicked] = useState<string | null>(null)
  const role = picked ?? (ROLES.some((r) => r.value === asked) ? asked : 'buyer')
  // After a failed send the form is rebuilt; this puts back what was typed
  const typed = (name: string) => state.values?.[name] ?? ''

  if (state.status === 'sent') {
    return (
      <div className="form form--sent glass" role="status">
        <h3>Thank you. Your enquiry is with us.</h3>
        <p>We’ll get back to you by email and take it from there.</p>
      </div>
    )
  }

  return (
    <form className="form glass" action={action} noValidate data-reveal>
      <fieldset className="field">
        <legend className="label-sm">I am a</legend>
        <div className="seg">
          {ROLES.map(({ value, label }) => (
            <label key={value}>
              <input type="radio" name="role" value={value} checked={role === value} onChange={() => setPicked(value)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form__row">
        <label className="field">
          <span className="label-sm">
            Full name <Required />
          </span>
          <input
            className="input"
            name="name"
            autoComplete="name"
            required
            defaultValue={typed('name')}
            aria-invalid={Boolean(state.errors?.name)}
          />
          {state.errors?.name && <span className="field__error">{state.errors.name}</span>}
        </label>
        <label className="field">
          <span className="label-sm">
            Organisation <Required />
          </span>
          <input
            className="input"
            name="organisation"
            autoComplete="organization"
            required
            defaultValue={typed('organisation')}
            aria-invalid={Boolean(state.errors?.organisation)}
          />
          {state.errors?.organisation && <span className="field__error">{state.errors.organisation}</span>}
        </label>
      </div>

      <div className="form__row">
        <label className="field">
          <span className="label-sm">
            Work email <Required />
          </span>
          <input
            className="input"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={typed('email')}
            aria-invalid={Boolean(state.errors?.email)}
          />
          {state.errors?.email && <span className="field__error">{state.errors.email}</span>}
        </label>
        <label className="field">
          <span className="label-sm">
            Phone <Required />
          </span>
          <input
            className="input"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={typed('phone')}
            aria-invalid={Boolean(state.errors?.phone)}
          />
          {state.errors?.phone && <span className="field__error">{state.errors.phone}</span>}
        </label>
      </div>

      {role === 'buyer' && (
        <div className="form__row">
          <label className="field">
            <span className="label-sm">Credits needed (tCO₂)</span>
            <input
              className="input"
              name="quantity"
              inputMode="numeric"
              placeholder="e.g. 500"
              defaultValue={typed('quantity')}
            />
          </label>
          <label className="field">
            <span className="label-sm">Preferred geography</span>
            <input className="input" name="geography" placeholder="Optional" defaultValue={typed('geography')} />
          </label>
        </div>
      )}

      {role === 'partner' && (
        <label className="field">
          <span className="label-sm">
            What are you looking for? <Required />
          </span>
          <select
            className="input"
            name="interest"
            required
            defaultValue={typed('interest')}
            aria-invalid={Boolean(state.errors?.interest)}
          >
            <option value="" disabled>
              Choose one
            </option>
            {INTERESTS.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
          {state.errors?.interest && <span className="field__error">{state.errors.interest}</span>}
        </label>
      )}

      <label className="field">
        <span className="label-sm">Message</span>
        <textarea className="input" name="message" rows={4} defaultValue={typed('message')} />
      </label>

      <label className="check">
        <input type="checkbox" name="siteVisit" defaultChecked={typed('siteVisit') === 'on'} />
        <span>I’d like to visit a project site</span>
      </label>

      <p className="form__note">
        <Required /> Required
      </p>

      {/* Hidden from people; see the bot check in the server action */}
      <input className="form__trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="page" value={pathname} />
      {['utm_source', 'utm_medium', 'utm_campaign'].map((name) => (
        <input key={name} type="hidden" name={name} value={params.get(name) ?? ''} />
      ))}

      {state.message && (
        <p className="field__error" role="alert">
          {state.message} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      )}

      <button className="btn" type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send enquiry'} <Arrow />
      </button>
    </form>
  )
}
