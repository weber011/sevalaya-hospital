/**
 * Sevalaya Hospital - Central WhatsApp Configuration & Appointment Metadata
 *
 * Requirements Met:
 * 1. One central configuration value for the hospital's WhatsApp number.
 * 2. Uses international country-code format (digits only: 917004214800) without '+' or punctuation.
 * 3. Sourced from the hospital's verified hotline (7004214800 from poster info 1.jpeg) with +91 country prefix.
 * 4. Transparent placeholder / status note until hospital administration confirms dedicated WhatsApp business line.
 * 5. Configurable service options approved for eye hospital consultations.
 * 6. Configurable consultation time slots within verified hospital hours (9:00 AM – 7:00 PM).
 */

export const WHATSAPP_CONFIG = {
  // Central WhatsApp number for click-to-chat.
  // Format: International digits without plus or spaces (e.g. "917004214800").
  // Derived from official hospital hotline 7004214800 with India country code 91.
  // Update this single central value if hospital designates a separate WhatsApp number.
  phoneNumber: '917004214800',

  // Formatted display representation
  displayNumber: '+91 70042 14800',

  // Status flag: Telephone 7004214800 is verified on banner; dedicated WhatsApp confirmation status.
  isDedicatedWhatsAppConfirmed: false,

  // WhatsApp Universal Web/App click-to-chat base URL
  baseUrl: 'https://wa.me',
};

/**
 * 8 Configurable Service Options required by hospital administration
 */
export const APPOINTMENT_SERVICES = [
  { value: 'general-consultation', label: 'General Eye Consultation' },
  { value: 'computerised-eye-test', label: 'Computerised Eye Test' },
  { value: 'cataract-consultation', label: 'Cataract Consultation' },
  { value: 'glaucoma-consultation', label: 'Glaucoma Consultation' },
  { value: 'retina-consultation', label: 'Retina Consultation' },
  { value: 'childrens-eye-examination', label: "Children's Eye Examination" },
  { value: 'spectacle-lens-consultation', label: 'Spectacle or Lens Consultation' },
  { value: 'other', label: 'Other' },
];

/**
 * Daily consultation time slots within verified hospital hours (9:00 AM – 7:00 PM).
 */
export const CONSULTATION_TIME_SLOTS = [
  { value: '09:00 AM - 10:00 AM', label: '09:00 AM – 10:00 AM (Morning)' },
  { value: '10:00 AM - 11:00 AM', label: '10:00 AM – 11:00 AM (Morning)' },
  { value: '11:00 AM - 12:00 PM', label: '11:00 AM – 12:00 PM (Morning)' },
  { value: '12:00 PM - 01:00 PM', label: '12:00 PM – 01:00 PM (Mid-day)' },
  { value: '01:00 PM - 02:00 PM', label: '01:00 PM – 02:00 PM (Afternoon)' },
  { value: '02:00 PM - 03:00 PM', label: '02:00 PM – 03:00 PM (Afternoon)' },
  { value: '03:00 PM - 04:00 PM', label: '03:00 PM – 04:00 PM (Afternoon)' },
  { value: '04:00 PM - 05:00 PM', label: '04:00 PM – 05:00 PM (Evening)' },
  { value: '05:00 PM - 06:00 PM', label: '05:00 PM – 06:00 PM (Evening)' },
  { value: '06:00 PM - 07:00 PM', label: '06:00 PM – 07:00 PM (Evening)' },
];

/**
 * Maps incoming service IDs from other components (Hero, Services Grid, Facilities Grid)
 * to one of the 8 canonical appointment service values.
 */
export function mapServiceIdToAppointmentOption(serviceId) {
  if (!serviceId) return '';
  const id = serviceId.toLowerCase();

  if (id.includes('computerised') || id.includes('refract') || id.includes('diagnostic')) {
    return 'computerised-eye-test';
  }
  if (id.includes('cataract')) {
    return 'cataract-consultation';
  }
  if (id.includes('glaucoma')) {
    return 'glaucoma-consultation';
  }
  if (id.includes('retin')) {
    return 'retina-consultation';
  }
  if (id.includes('children') || id.includes('pediatric')) {
    return 'childrens-eye-examination';
  }
  if (id.includes('spectacle') || id.includes('lens') || id.includes('glasses')) {
    return 'spectacle-lens-consultation';
  }
  if (id.includes('general') || id.includes('opd') || id.includes('pterygium') || id.includes('emergency')) {
    return 'general-consultation';
  }
  if (id.includes('other') || id.includes('pharmacy')) {
    return 'other';
  }

  // Check if it already matches a value directly
  const directMatch = APPOINTMENT_SERVICES.find((s) => s.value === id);
  if (directMatch) return directMatch.value;

  return 'general-consultation';
}

/**
 * Constructs a structured, human-readable WhatsApp message string.
 */
export function buildWhatsAppAppointmentMessage({
  fullName,
  mobile,
  preferredDate,
  preferredTime,
  serviceLabel,
  message
}) {
  const lines = [
    `*Appointment Request – Sevalaya Eye Hospital*`,
    ``,
    `*Patient Name:* ${fullName.trim()}`,
    `*Mobile Number:* ${mobile.trim()}`,
    `*Service Required:* ${serviceLabel}`,
    `*Preferred Date:* ${preferredDate}`,
    `*Preferred Time:* ${preferredTime}`,
    message?.trim() ? `*Additional Message:* ${message.trim()}` : null,
    ``,
    `---`,
    `_Sent via Sevalaya Eye Hospital Website. Please review and send this message to coordinate your consultation._`
  ].filter((line) => line !== null);

  return lines.join('\n');
}

/**
 * Generates the complete, properly URL-encoded WhatsApp click-to-chat link.
 */
export function generateWhatsAppLink(formData, serviceLabel) {
  const messageText = buildWhatsAppAppointmentMessage({
    ...formData,
    serviceLabel
  });
  const encodedMessage = encodeURIComponent(messageText);
  return `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
}

/**
 * Generates general WhatsApp inquiry click-to-chat URL for quick contact actions.
 */
export function getGeneralWhatsAppInquiryUrl(customMessage) {
  const defaultText =
    'Hello Sevalaya Eye Hospital, I would like to inquire about eye care services and specialist consultation availability.';
  const message = customMessage || defaultText;
  return `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
}
