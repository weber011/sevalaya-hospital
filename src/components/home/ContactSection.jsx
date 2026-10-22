import React from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Navigation,
  ExternalLink
} from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';
import { getGeneralWhatsAppInquiryUrl, WHATSAPP_CONFIG } from '../../config/whatsappConfig';

/**
 * Contact & Hospital Visitation Section for Sevalaya Hospital
 */
export default function ContactSection({ onOpenAppointment }) {
  const { t } = useLanguage();
  const whatsappInquiryUrl = getGeneralWhatsAppInquiryUrl();

  const handleAppointmentClick = (e) => {
    e.preventDefault();
    if (onOpenAppointment) {
      onOpenAppointment();
    } else {
      const el = document.getElementById('appointment');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const input = document.getElementById('fullName');
          if (input) input.focus();
        }, 500);
      }
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <Container>
        <SectionHeader
          id="contact-heading"
          eyebrow={t('contactEyebrow', 'COMMUNICATION & HOSPITAL VISITATION')}
          title={t('contactTitle', 'Contact Sevalaya Hospital')}
          subtitle={t('contactSubtitle', 'Direct telephone helpline, outpatient consultation hours, and verified communication pathways for patient eye care.')}
          centered
        />

        {/* 1. Core Contact Details Grid */}
        <div className="contact-grid">
          {/* Card 1: Direct Telephone Helpline (Call Now) */}
          <div className="contact-card">
            <div className="contact-card__icon-wrapper" aria-hidden="true">
              <Phone size={22} />
            </div>

            <h3 className="contact-card__title">{t('helplineTitle', 'Confirmed Telephone Helpline')}</h3>
            <div className="contact-card__highlight">
              {hospitalData.contact.phoneDisplay}
            </div>

            <p className="contact-card__desc">
              {t('helplineDesc', 'Speak directly with our hospital reception for appointment coordination, emergency ophthalmic inquiries, and doctor availability.')}
            </p>

            <div className="contact-card__action">
              <a
                href={hospitalData.contact.phoneTel}
                className="btn btn--primary btn-call-now"
                aria-label={`Call Now at ${hospitalData.contact.phoneDisplay}`}
              >
                <Phone size={16} aria-hidden="true" />
                <span>{t('callNow', 'Call Now')}</span>
              </a>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle)', textAlign: 'center', marginTop: '0.5rem' }}>
                Opens phone dialler on supported mobile devices
              </div>
            </div>
          </div>

          {/* Card 2: Consultation & OPD Hours */}
          <div className="contact-card">
            <div className="contact-card__icon-wrapper" aria-hidden="true">
              <Clock size={22} />
            </div>

            <h3 className="contact-card__title">{t('hoursCardTitle', 'Verified Consultation Hours')}</h3>
            <div className="contact-card__highlight">
              {hospitalData.timings.hours}
            </div>

            <div className="contact-pending-badge" role="note">
              <AlertTriangle size={13} aria-hidden="true" />
              <span>{t('hoursPendingNote', 'Pending formal hospital verification before launch')}</span>
            </div>

            <p className="contact-card__desc">
              {t('hoursDesc', 'Eye specialists and certified optometrists are available daily for outpatient examinations, computerized eye testing, and surgical reviews.')}
            </p>

            <div className="contact-card__action">
              <a
                href="#appointment"
                onClick={handleAppointmentClick}
                className="btn btn--outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={15} aria-hidden="true" />
                <span>{t('scheduleConsultation', 'Schedule Consultation')}</span>
              </a>
            </div>
          </div>

          {/* Card 3: WhatsApp Contact */}
          <div className="contact-card">
            <div className="contact-card__icon-wrapper" aria-hidden="true">
              <MessageSquare size={22} />
            </div>

            <h3 className="contact-card__title">{t('whatsappCardTitle', 'Confirmed WhatsApp Contact')}</h3>
            <div className="contact-card__highlight">
              {WHATSAPP_CONFIG.displayNumber}
            </div>

            <div className="contact-pending-badge" role="note">
              <ShieldCheck size={13} aria-hidden="true" />
              <span>{t('whatsappBadge', 'Centrally configured click-to-chat integration')}</span>
            </div>

            <p className="contact-card__desc">
              {t('whatsappCardDesc', 'Connect directly via WhatsApp to submit appointment requests, inquire about diagnostic tests, or receive hospital information.')}
            </p>

            <div className="contact-card__action">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                style={{ width: '100%', justifyContent: 'center' }}
                aria-label="Contact Sevalaya Hospital on WhatsApp"
              >
                <MessageSquare size={15} aria-hidden="true" />
                <span>{t('chatWhatsAppBtn', 'Chat on WhatsApp')}</span>
                <ExternalLink size={14} aria-hidden="true" style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Google Maps Location & Physical Address Section */}
        <div className="contact-map-wrapper">
          <div className="contact-map-header">
            <div className="contact-map-header__title">
              <MapPin size={18} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <span>{t('mapHeaderTitle', 'Hospital Address & Google Maps Location')}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge--subtle" style={{ fontSize: '0.72rem' }}>
                Hospital Identity: {hospitalData.name} ({hospitalData.hindiName})
              </span>
            </div>
          </div>

          {hospitalData.location.isMapConfirmed && hospitalData.location.googleMapsEmbedUrl ? (
            <iframe
              src={hospitalData.location.googleMapsEmbedUrl}
              title="Sevalaya Hospital Google Maps Location"
              width="100%"
              height="340"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="contact-map-body" role="region" aria-label="Hospital map status">
              <div className="contact-map-placeholder-card">
                <div className="contact-map-pin-icon" aria-hidden="true">
                  <Navigation size={24} />
                </div>

                <h4>{t('mapPendingTitle', 'Physical Address & Location Confirmation Pending')}</h4>
                <p>
                  {hospitalData.location.mapPlaceholderNotice}
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1.25rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-main)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Building2 size={15} style={{ color: 'var(--color-primary)' }} />
                  <span>
                    <strong>Registered Name:</strong> {hospitalData.name} ({hospitalData.hindiName})
                  </span>
                </div>

                <div>
                  <a
                    href={hospitalData.contact.phoneTel}
                    className="btn btn--primary btn--md"
                    aria-label="Call reception at 7004214800 for hospital address and location directions"
                  >
                    <Phone size={15} aria-hidden="true" />
                    <span>{t('mapCallBtn', 'Call for Location & Directions')}: {hospitalData.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Bottom Primary Conversion Strip: Book an Appointment */}
        <div className="contact-conversion-strip" role="region" aria-label="Appointment and message options">
          <div className="contact-conversion-strip__text">
            <h4>{t('readyConsultTitle', 'Ready to Consult with an Eye Care Specialist?')}</h4>
            <p>
              {t('readyConsultDesc', 'Book an appointment online with pre-selected clinical services or speak directly with hospital reception.')}
            </p>
          </div>

          <div className="contact-conversion-strip__actions">
            <a
              href="#appointment"
              onClick={handleAppointmentClick}
              className="btn btn--primary btn--md"
              role="button"
            >
              <Calendar size={16} aria-hidden="true" />
              <span>{t('bookAppointment', 'Book an Appointment')}</span>
            </a>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              aria-label="Contact Sevalaya Hospital on WhatsApp"
            >
              <MessageSquare size={16} aria-hidden="true" />
              <span>{t('chatWhatsAppBtn', 'Contact on WhatsApp')}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
