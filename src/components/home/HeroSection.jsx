import React from 'react';
import { Calendar, ArrowRight, CheckCircle2, Phone, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * Homepage Hero Section for Sevalaya Hospital
 */
export default function HeroSection({ onOpenAppointment }) {
  const { t } = useLanguage();

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

  const handleServicesClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Primary hero image derived from supplied hospital assets with fallback support
  const heroImageSrc = '/assets/hospital-hero.jpg';

  const trustPoints = [
    { id: 1, title: t('trust1', 'Comprehensive Eye Examinations'), icon: Eye },
    { id: 2, title: t('trust2', 'Modern Diagnostic Technology'), icon: Sparkles },
    { id: 3, title: t('trust3', 'Patient-Focused Care'), icon: ShieldCheck }
  ];

  return (
    <section id="home" className="hero-section" aria-label="Introduction & Eye Care Overview">
      <Container>
        <div className="hero-grid">
          {/* Left Column: 44-48% Editorial Content */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <Eye size={13} className="hero-eyebrow__icon" aria-hidden="true" />
              <span>{t('heroEyebrow', 'COMPASSIONATE EYE CARE')}</span>
            </div>

            <h1 className="hero-heading">
              {t('heroTitlePrefix', 'See the World with ')}<span className="hero-heading__accent">{t('heroTitleHighlight', 'Clarity.')}</span>
            </h1>

            <p className="hero-lead">
              {t('heroSubtitle', 'Advanced eye care, modern diagnostic technology and personalised attention for your vision.')}
            </p>

            {/* Prominent Action Buttons */}
            <div className="hero-actions">
              <a
                href="#appointment"
                className="hero-btn hero-btn--primary"
                onClick={handleAppointmentClick}
                role="button"
                aria-label="Book an Appointment at Sevalaya Hospital"
              >
                <Calendar size={16} aria-hidden="true" />
                <span>{t('heroPrimaryCta', 'Book an Appointment')}</span>
              </a>

              {/* Direct Tap-to-Call Helpline Button on Mobile */}
              <a
                href={hospitalData.contact.phoneTel}
                className="hero-btn hero-btn--call show-mobile"
                aria-label={`Call Hospital Helpline at ${hospitalData.contact.phoneDisplay}`}
              >
                <Phone size={15} aria-hidden="true" />
                <span>{t('callNow', 'Call')}: {hospitalData.contact.phoneDisplay}</span>
              </a>

              <a
                href="#services"
                className="hero-btn hero-btn--secondary"
                onClick={handleServicesClick}
                role="button"
                aria-label="Explore Eye Care Services offered by Sevalaya Hospital"
              >
                <span>{t('heroSecondaryCta', 'Explore Eye Care Services')}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>

            {/* Trust Points Badges */}
            <div className="hero-trust-list" role="list" aria-label="Key clinical pillars">
              {trustPoints.map((point) => {
                const IconComp = point.icon;
                return (
                  <div key={point.id} className="hero-trust-item" role="listitem">
                    <CheckCircle2 size={16} className="hero-trust-icon" aria-hidden="true" />
                    <span>{point.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 52-56% Natural Hospital Photography */}
          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src={heroImageSrc}
                alt="Detailed clinical eye examination and clarity ophthalmology at Sevalaya Hospital"
                className="hero-image"
                width="700"
                height="450"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  // Fallback to supplied info-banner if necessary
                  if (e.target.src !== '/assets/info-banner.jpeg') {
                    e.target.src = '/assets/info-banner.jpeg';
                  }
                }}
              />

              {/* Restrained Clinical Information Bar */}
              <div className="hero-image-caption">
                <div className="hero-image-caption__left">
                  <span className="hero-status-dot" aria-hidden="true" />
                  <span>{t('specialistsAvailable', 'Daily Specialists & Optometrists')}</span>
                </div>
                <div className="hero-image-caption__badge">
                  <span>OPD: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
