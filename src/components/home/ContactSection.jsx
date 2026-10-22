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
          title={t('contactTitle', 'Contact Sevalaya Eye Hospital')}
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
            <div className="contact-card__highlight" style={{ fontSize: '1.15rem' }}>
              <div>{hospitalData.contact.phoneDisplay}</div>
              <div style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {hospitalData.contact.secondaryPhoneDisplay}
              </div>
            </div>

            <p className="contact-card__desc">
              {t('helplineDesc', 'Speak directly with our hospital reception for appointment coordination, emergency ophthalmic inquiries, and doctor availability.')}
            </p>

            <div className="contact-card__action" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href={hospitalData.contact.phoneTel}
                className="btn btn--primary btn-call-now"
                aria-label={`Call primary line at ${hospitalData.contact.phoneDisplay}`}
              >
                <Phone size={15} aria-hidden="true" />
                <span>{t('callNow', 'Call Now')}: {hospitalData.contact.primaryPhone}</span>
              </a>
              <a
                href={hospitalData.contact.secondaryPhoneTel}
                className="btn btn--outline"
                style={{ width: '100%', justifyContent: 'center' }}
                aria-label={`Call secondary line at ${hospitalData.contact.secondaryPhoneDisplay}`}
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call Line 2: {hospitalData.contact.secondaryPhone}</span>
              </a>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle)', textAlign: 'center' }}>
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

            <div className="contact-pending-badge" style={{ backgroundColor: 'var(--color-success-bg, #EDFBF4)', color: 'var(--color-success, #0D7A4D)', borderColor: 'rgba(13, 122, 77, 0.2)' }} role="note">
              <ShieldCheck size={13} aria-hidden="true" />
              <span>Verified OPD: 9:00 AM – 7:00 PM (Daily)</span>
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
                aria-label="Contact Sevalaya Eye Hospital on WhatsApp"
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span className="badge badge--success" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} aria-hidden="true" />
                Verified Hospital Address
              </span>
              <a
                href={hospitalData.location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--sm"
                style={{ height: '32px', fontSize: '0.78rem', padding: '0 0.85rem' }}
                aria-label="Get directions to Sevalaya Eye Hospital on Google Maps"
              >
                <Navigation size={13} aria-hidden="true" />
                <span>Get Directions</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Verified Hospital Address Details Strip */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--color-bg-surface)',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                Physical Location (पता)
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.4 }}>
                {hospitalData.location.addressHindi}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {hospitalData.location.addressDisplay}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                <strong>Landmark:</strong> {hospitalData.location.landmark}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                <strong>Direct Contact:</strong> {hospitalData.contact.phoneDisplay} / {hospitalData.contact.secondaryPhoneDisplay}
              </div>
            </div>
          </div>

          {/* Google Maps Responsive Interactive Iframe */}
          <div style={{ position: 'relative', width: '100%', minHeight: '360px', backgroundColor: 'var(--color-bg-subtle)' }}>
            <iframe
              src={hospitalData.location.googleMapsEmbedUrl}
              title="Sevalaya Eye Hospital Google Maps Location"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
              aria-label="Contact Sevalaya Eye Hospital on WhatsApp"
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
