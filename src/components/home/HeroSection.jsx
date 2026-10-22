import React from 'react';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    t('trust1', 'Comprehensive Eye Examinations'),
    t('trust2', 'Modern Diagnostic Technology'),
    t('trust3', 'Patient-Focused Care')
  ];

  return (
    <section id="home" className="hero-section" aria-label="Introduction & Eye Care Overview">
      <Container>
        <div className="hero-grid">
          {/* Left Column: 44-48% Editorial Content */}
          <div className="hero-content">
            <span className="hero-eyebrow">
              {t('heroEyebrow', 'COMPASSIONATE EYE CARE')}
            </span>

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

            {/* Trust Points */}
            <div className="hero-trust-list" role="list" aria-label="Key clinical pillars">
              {trustPoints.map((point) => (
                <div key={point} className="hero-trust-item" role="listitem">
                  <CheckCircle2 size={17} className="hero-trust-icon" aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
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
                  <span>Daily Eye Specialists & Optometrists</span>
                </div>
                <div className="hero-image-caption__badge">
                  <span>OPD: {hospitalData.timings.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
