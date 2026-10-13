import type { Metadata } from 'next'

import { EnquiryForm } from '@/components/EnquiryForm'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Buy KriSHE carbon credits, partner with us as an NGO or FPO, or ask to visit a project site.',
}

export default function EnquirePage() {
  return (
    <section className="sec sec--top on-light">
      <div className="wrap enquire">
        <div>
          <p className="eyebrow" data-reveal>
            Enquire
          </p>
          <h1 className="title" data-reveal>
            Tell us what <em>you’re looking for.</em>
          </h1>
          <p className="sec__sub" data-reveal>
            Looking to buy credits, partner with KriSHE, or visit a project site? Start here. We’ll get back to you by
            email and take it from there.
          </p>

          <dl className="contact" data-reveal>
            <div>
              <dt className="label-sm">Email</dt>
              <dd>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </dd>
            </div>
            <div>
              <dt className="label-sm">Phone</dt>
              <dd>
                <a href={`tel:${SITE.phone.href}`}>{SITE.phone.label}</a>
              </dd>
            </div>
            <div>
              <dt className="label-sm">Office</dt>
              <dd>{SITE.address}</dd>
            </div>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  )
}
