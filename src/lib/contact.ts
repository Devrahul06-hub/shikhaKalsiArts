/**
 * Single source of truth for how the studio is reached.
 * All enquiries go to WhatsApp — there is no enquiry form/API on the site.
 */

export const WHATSAPP_NUMBER = '918104390986'
export const WHATSAPP_DISPLAY = '+91 81043 90986'

export const socialLinks = {
  instagram: 'https://www.instagram.com/shikhakalsiarts/',
  linkedin: 'https://www.linkedin.com/company/shikha-kalsi-arts/',
  facebook: 'https://www.facebook.com/share/v/14quA2z4ucn/?mibextid=wwXIfr',
} as const

const DEFAULT_MESSAGE =
  "Hello Shikha Kalsi Arts, I'd like to discuss a sculpture commission."

/**
 * Builds a wa.me deep link. Works on both mobile (opens the app) and
 * desktop (opens WhatsApp Web), which is why wa.me is used over the
 * api.whatsapp.com/send form.
 */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
