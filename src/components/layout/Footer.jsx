import React, { useState } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import Container from '../common/Container';
import PolicyModal from '../common/PolicyModal';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';
import { getGeneralWhatsAppInquiryUrl, WHATSAPP_CONFIG } from '../../config/whatsappConfig';

/**
 * Global Footer for Sevalaya Hospital
 */
export default function Footer({ onNavigate }) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | null
  const whatsappUrl = getGeneralWhatsAppInquiryUrl();

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${id}`);
        }
      }
    }
  };

  const handleOpenAppointment = (e) => {
    e.preventDefault();
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 450);
    }
  };

  return (
    <>
      <footer className="site-footer" role="contentinfo">
        <Container>
          <div className="footer-grid">
            {/* Column 1: Hospital Brand Identity */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <img
                  src={hospitalData.logoUrl}
                  alt="Sevalaya Eye Hospital"
                  style={{
                    width: 46,
                    height: 46,
                    objectFit: 'contain',
                    backgroundColor: '#FFFFFF',
                    padding: '3px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
                <div>
                  <div className="footer-brand__name">{hospitalData.name}</div>
                  <div
                    style={{
                      color: 'var(--color-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {hospitalData.hindiName}
                  </div>
                </div>
              </div>

              <p className="footer-brand__desc">
                {t('footerDesc', 'Dedicated center for eye care and clinical ophthalmology. Providing modern cataract surgeries, pediatric vision examinations, glaucoma therapy, and computerized vision assessments daily.')}
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.8125rem', color: '#9AA6B8' }}>
                <Clock size={15} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                <span>{hospitalData.timings.dailyAvailable}</span>
              </div>
            </div>

            {/* Column 2: Clinical Eye Care Services */}
            <div>
              <h4 className="footer-col__title">{t('servicesColTitle', 'Eye Care Services')}</h4>
              <ul className="footer-links">
                {hospitalData.services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      onClick={(e) => handleLinkClick(e, 'services')}
                      className="footer-link"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Site Navigation */}
            <div>
              <h4 className="footer-col__title">{t('quickNavTitle', 'Quick Navigation')}</h4>
              <ul className="footer-links">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => handleLinkClick(e, 'home')}
                    className="footer-link"
                  >
                    {t('navHome', 'Home Overview')}
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleLinkClick(e, 'about')}
                    className="footer-link"
                  >
                    {t('navAbout', 'About Us')}
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, 'services')}
                    className="footer-link"
                  >
                    {t('navServices', 'All Eye Care Services')}
                  </a>
                </li>
                <li>
                  <a
                    href="#facilities"
                    onClick={(e) => handleLinkClick(e, 'facilities')}
                    className="footer-link"
                  >
                    {t('navFacilities', 'Clinical Facilities')}
                  </a>
                </li>
                <li>
                  <a
                    href="#doctors"
                    onClick={(e) => handleLinkClick(e, 'doctors')}
                    className="footer-link"
                  >
                    {t('navDoctors', 'Our Doctors & Timings')}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, 'contact')}
                    className="footer-link"
                  >
                    {t('navContact', 'Contact & Helpdesk')}
                  </a>
                </li>
                <li>
                  <a
                    href="#appointment"
                    onClick={handleOpenAppointment}
                    className="footer-link"
                    style={{ color: '#FCA5A5', fontWeight: 600 }}
                  >
                    {t('bookAppointment', 'Book an Appointment')} →
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Details & Central Configuration */}
            <div>
              <h4 className="footer-col__title">{t('contactColTitle', 'Contact & Inquiries')}</h4>

              {/* Telephone */}
              <div className="footer-contact-item">
                <Phone size={16} aria-hidden="true" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A8799' }}>Direct Phone Helpline</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2px' }}>
                    <a
                      href={hospitalData.contact.phoneTel}
                      style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}
                      aria-label={`Call Now at ${hospitalData.contact.phoneDisplay}`}
                    >
                      {hospitalData.contact.phoneDisplay}
                    </a>
                    <a
                      href={hospitalData.contact.phoneTel}
                      className="btn btn--primary btn--sm"
                      style={{ padding: '0.2rem 0.55rem', height: '24px', fontSize: '0.7rem' }}
                      aria-label={`Call Now at ${hospitalData.contact.phoneDisplay}`}
                    >
                      {t('callNow', 'Call Now')}
                    </a>
                  </div>
                  <div style={{ marginTop: '4px' }}>
                    <a
                      href={hospitalData.contact.secondaryPhoneTel}
                      style={{ color: '#CBD5E1', fontSize: '0.85rem' }}
                      aria-label={`Call Line 2 at ${hospitalData.contact.secondaryPhoneDisplay}`}
                    >
                      Line 2: {hospitalData.contact.secondaryPhoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="footer-contact-item">
                <MessageSquare size={16} aria-hidden="true" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A8799' }}>WhatsApp Inquiries</div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    aria-label="Chat with Sevalaya Eye Hospital on WhatsApp"
                  >
                    <span>{WHATSAPP_CONFIG.displayNumber}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="footer-contact-item">
                <Clock size={16} aria-hidden="true" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A8799' }}>Consultation Hours</div>
                  <div style={{ color: '#E2E8F0', fontSize: '0.85rem' }}>{hospitalData.timings.hours}</div>
                  <div style={{ fontSize: '0.72rem', color: '#10B981', marginTop: '1px' }}>Open All 7 Days</div>
                </div>
              </div>

              {/* Verified Hospital Address */}
              <div className="footer-contact-item">
                <MapPin size={16} aria-hidden="true" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A8799' }}>Hospital Address & Directions</div>
                  <div style={{ color: '#E2E8F0', fontSize: '0.85rem', lineHeight: 1.4, marginTop: '2px' }}>
                    {hospitalData.location.addressDisplay}
                  </div>
                  <div style={{ marginTop: '4px' }}>
                    <a
                      href={hospitalData.location.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#F87171', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}
                      aria-label="Open Sevalaya Eye Hospital in Google Maps"
                    >
                      <span>Open Google Maps</span>
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Verification Notice */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-4) var(--space-5)',
              marginBottom: 'var(--space-6)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
              <ShieldCheck size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div style={{ fontSize: '0.75rem', color: '#9AA6B8', lineHeight: 1.55 }}>
                <strong style={{ color: '#E2E8F0' }}>Verified Hospital Information:</strong> All hospital services, consultation hours ({hospitalData.timings.hours}), specialist doctor availability, physical address (Main Road, Piska Nagri, NH-43, Ranchi), and telephone numbers ({hospitalData.contact.primaryPhone} / {hospitalData.contact.secondaryPhone}) are verified from hospital information.
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Policy Links Bar */}
          <div className="footer-bottom">
            <div>
              © {currentYear} {hospitalData.name} ({hospitalData.hindiName}). {t('allRightsReserved', 'All clinical rights reserved.')}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setModalType('privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9AA6B8',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
                aria-label="Read Privacy Policy"
              >
                {t('privacyPolicy', 'Privacy Policy')}
              </button>

              <span aria-hidden="true">•</span>

              <button
                type="button"
                onClick={() => setModalType('terms')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9AA6B8',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
                aria-label="Read Terms and Conditions"
              >
                {t('termsConditions', 'Terms and Conditions')}
              </button>

              <span aria-hidden="true">•</span>

              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Ophthalmology & Eye Care
              </span>
            </div>
          </div>
        </Container>
      </footer>

      {/* Accessible Policy Dialog Modal */}
      <PolicyModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </>
  );
}
