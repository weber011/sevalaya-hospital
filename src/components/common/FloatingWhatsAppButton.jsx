import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getGeneralWhatsAppInquiryUrl, WHATSAPP_CONFIG } from '../../config/whatsappConfig';

/**
 * Floating WhatsApp Click-to-Chat Button
 */
export default function FloatingWhatsAppButton() {
  const { t } = useLanguage();
  const whatsappUrl = getGeneralWhatsAppInquiryUrl();

  return (
    <aside className="floating-whatsapp-container" aria-label="Quick WhatsApp contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label={t('floatingWhatsAppAria', 'Contact Sevalaya Eye Hospital on WhatsApp')}
        title={t('floatingWhatsAppAria', 'Contact Sevalaya Eye Hospital on WhatsApp')}
      >
        <span className="floating-whatsapp-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.19-.48-.31z" />
          </svg>
        </span>
        <span className="floating-whatsapp-label">{t('floatingWhatsAppLabel', 'Chat on WhatsApp')}</span>
      </a>
    </aside>
  );
}
