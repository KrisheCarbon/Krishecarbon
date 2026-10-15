import type { CollectionConfig } from 'payload'

const loggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Enquiries sent from the website's contact form. The form saves them from the server,
 * so the public can never read, add or change them through the API; only people logged in to the CMS can.
 * Each one is also sent to the team's Google Sheet; `savedToSheet` shows whether that worked.
 */
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organisation', 'role', 'email', 'createdAt', 'savedToSheet'],
    description: 'Sent from the contact form on the website. Also copied to the Google Sheet.',
  },
  access: {
    read: loggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Buyer', value: 'buyer' },
        { label: 'Partner', value: 'partner' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'organisation', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'interest', type: 'text', label: 'Looking for' },
    { name: 'quantity', type: 'text', label: 'Credits needed (tCO2)' },
    { name: 'geography', type: 'text', label: 'Preferred geography' },
    { name: 'siteVisit', type: 'checkbox', label: 'Wants a site visit' },
    { name: 'message', type: 'textarea' },
    {
      type: 'collapsible',
      label: 'Where it came from',
      admin: { initCollapsed: true },
      fields: [
        { name: 'page', type: 'text' },
        { name: 'utmSource', type: 'text', label: 'UTM source' },
        { name: 'utmMedium', type: 'text', label: 'UTM medium' },
        { name: 'utmCampaign', type: 'text', label: 'UTM campaign' },
      ],
    },
    {
      name: 'savedToSheet',
      type: 'checkbox',
      label: 'Copied to Google Sheet',
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}
