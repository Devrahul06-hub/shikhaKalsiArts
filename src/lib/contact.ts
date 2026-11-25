/**
 * Single source of truth for how the studio is reached.
 *
 * Email is listed first on purpose: overseas corporate buyers, architects and
 * procurement teams often will not open a project on WhatsApp, so a
 * WhatsApp-only site loses them. WhatsApp stays for clients who prefer it.
 */

export const EMAIL = 'Shikhakalsiarts@gmail.com'

export const WHATSAPP_NUMBER = '918104390986'
export const WHATSAPP_DISPLAY = '+91 81043 90986'

export const socialLinks = {
  instagram: 'https://www.instagram.com/shikhakalsiarts/',
  linkedin: 'https://www.linkedin.com/company/shikha-kalsi-arts/',
  facebook: 'https://www.facebook.com/shikha.kalsi.arts',
} as const

const DEFAULT_MESSAGE =
  "Hello Shikha Kalsi Arts, I'd like to discuss a sculpture commission."

const DEFAULT_SUBJECT = 'Commission enquiry'

/**
 * Prompts for the details that make a quote possible, so the first reply does
 * not have to ask for all of them.
 */
const DEFAULT_EMAIL_BODY = `Hello Shikha Kalsi Arts,

I'd like to discuss a commission.

Piece / reference:
Approximate size:
Quantity:
Indoor or outdoor:
Delivery city or port:
Deadline:

Thank you,`

/**
 * Builds a wa.me deep link. Works on both mobile (opens the app) and
 * desktop (opens WhatsApp Web), which is why wa.me is used over the
 * api.whatsapp.com/send form.
 */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Builds a mailto: link with a subject and a prompted body. */
export function emailUrl(
  subject: string = DEFAULT_SUBJECT,
  body: string = DEFAULT_EMAIL_BODY
): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
}
