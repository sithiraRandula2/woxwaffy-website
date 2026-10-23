export const BUSINESS = {
  whatsappNumber: '94744108853',
  whatsappDisplay: '+94 74 410 8853',
  telephone: '074 410 8853',
  telephoneHref: '+94744108853',
  email: 'hello@woxwaffy.com',
  instagramUrl: 'https://www.instagram.com/woxwaffy.lk?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==',
  facebookUrl: 'https://www.facebook.com/share/1C1VhE41ML/?mibextid=wwXIfr',
  delivery: 'Delivery areas and timing to be confirmed',
  location: 'No. 28, Church Road, Mabima',
} as const;

// Product and commercial details shown here are preview content pending brand confirmation.

export function whatsappUrl(message: string) {
  if (!BUSINESS.whatsappNumber) return '';
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
