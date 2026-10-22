import React from 'react';
import {
  Calendar,
  ArrowRight,
  Phone,
  Eye,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Container from '../common/Container';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * Homepage Hero Section for Sevalaya Eye Hospital
 * Premium, natural healthcare aesthetic with editorial typography,
 * authentic hospital photography, floating clinical credentials, and high conversion CTAs.
 */
export default function HeroSection({ onOpenAppointment }) {
  const { t, language } = useLanguage();

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

  const trustHighlights = [
    {
      id: 1,
      title: t('trust1', 'Comprehensive Eye Examinations'),
      desc:
        language === 'hi'
          ? 'कंप्यूटर द्वारा सटीक नंबर जाँच'
          : language === 'nag'
          ? 'कम्प्यूटर से नजर कर नंबर जाँच'
          : 'Objective Refraction & Diagnostic Exams',
      icon: Eye
    },
    {
      id: 2,
      title: t('trust2', 'Modern Diagnostic Technology'),
      desc:
        language === 'hi'
          ? 'मोतियाबिंद व रेटिना परीक्षण'
          : language === 'nag'
          ? 'मोतियाबिंद आउर पर्दा इलाज'
          : 'Slit-Lamp, Cataract & Retina Care',
      icon: Sparkles
    },
    {
      id: 3,
      title: t('trust3', 'Patient-Focused Care'),
      desc:
        language === 'hi'
          ? 'प्रतिदिन ओपीडी: सुबह 9 से शाम 7'
          : language === 'nag'
          ? 'रोज बिहान 9 से सांझ 7 बजे'
          : 'Daily Specialists: 9:00 AM – 7:00 PM',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="home" className="hero-section" aria-label="Introduction & Eye Care Overview">
      {/* Ambient decorative backdrop glows */}
      <div className="hero-ambient-glow hero-ambient-glow--right" aria-hidden="true" />
      <div className="hero-ambient-glow hero-ambient-glow--left" aria-hidden="true" />

      <Container>
        <div className="hero-grid">
          {/* Left Column: Editorial Content */}
          <div className="hero-content">
            {/* Pill 1: Eyebrow Badge with Live Pulse */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow__pulse" aria-hidden="true" />
              <Eye size={13} className="hero-eyebrow__icon" aria-hidden="true" />
              <span>{t('heroEyebrow', 'COMPASSIONATE EYE CARE')}</span>
              <span className="hero-eyebrow__divider" aria-hidden="true">•</span>
              <span className="hero-eyebrow__location">RANCHI</span>
            </div>

            {/* Pill 2: Authentic Hospital Tagline from Poster */}
            <div className="hero-motto-pill" role="note" aria-label="Hospital motto">
              <span className="hero-motto-pill__hindi">{hospitalData.mottoHindi}</span>
              <span className="hero-motto-pill__sep">•</span>
              <span className="hero-motto-pill__eng">{hospitalData.mottoEnglish}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="hero-heading">
              {t('heroTitlePrefix', 'See the World with ')}
              <span className="hero-heading__accent">{t('heroTitleHighlight', 'Clarity.')}</span>
            </h1>

            {/* Supporting Copy */}
            <p className="hero-lead">
              {t(
                'heroSubtitle',
                'Advanced eye care, modern diagnostic technology and personalised attention for your vision.'
              )}
            </p>

            {/* Prominent Action Buttons */}
            <div className="hero-actions">
              <a
                href="#appointment"
                className="hero-btn hero-btn--primary"
                onClick={handleAppointmentClick}
                role="button"
                aria-label="Book an Appointment at Sevalaya Eye Hospital"
              >
                <Calendar size={17} aria-hidden="true" />
                <span>{t('heroPrimaryCta', 'Book an Appointment')}</span>
                <ArrowRight size={15} className="hero-btn__arrow" aria-hidden="true" />
              </a>

              {/* Call Helpline Button */}
              <a
                href={hospitalData.contact.phoneTel}
                className="hero-btn hero-btn--call"
                aria-label={`Call Hospital Helpline at ${hospitalData.contact.phoneDisplay}`}
              >
                <Phone size={15} aria-hidden="true" />
                <span>{t('callNow', 'Call')}: {hospitalData.contact.primaryPhone}</span>
              </a>

              <a
                href="#services"
                className="hero-btn hero-btn--secondary"
                onClick={handleServicesClick}
                role="button"
                aria-label="Explore Eye Care Services offered by Sevalaya Eye Hospital"
              >
                <span>{t('heroSecondaryCta', 'Explore Eye Care Services')}</span>
                <ArrowRight size={15} className="hero-btn__arrow" aria-hidden="true" />
              </a>
            </div>

            {/* Clinical Trust Micro-Cards (3 Columns) */}
            <div className="hero-trust-grid" role="list" aria-label="Key clinical pillars">
              {trustHighlights.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.id} className="hero-trust-card" role="listitem">
                    <div className="hero-trust-card__icon-box" aria-hidden="true">
                      <IconComp size={16} />
                    </div>
                    <div className="hero-trust-card__text">
                      <div className="hero-trust-card__title">{item.title}</div>
                      <div className="hero-trust-card__desc">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Natural Hospital Photography with Floating Clinical Badges */}
          <div className="hero-visual">
            <div className="hero-image-card">
              {/* Floating Glassmorphic Badge: Modern Diagnostics (Top Right) */}
              <div className="hero-float-badge hero-float-badge--top">
                <div className="hero-float-badge__icon">
                  <Sparkles size={14} />
                </div>
                <div className="hero-float-badge__text">
                  <span className="hero-float-badge__strong">Modern Diagnostics</span>
                  <span className="hero-float-badge__sub">Computerized Precision</span>
                </div>
              </div>

              {/* Authentic Hospital Photograph */}
              <img
                src={heroImageSrc}
                alt="Detailed clinical eye examination and clarity ophthalmology at Sevalaya Eye Hospital"
                className="hero-image"
                width="700"
                height="450"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  if (e.target.src !== '/assets/info-banner.jpeg') {
                    e.target.src = '/assets/info-banner.jpeg';
                  }
                }}
              />

              {/* Floating Glassmorphic Badge: Verified Location (Bottom Left) */}
              <div className="hero-float-badge hero-float-badge--bottom">
                <div className="hero-float-badge__icon hero-float-badge__icon--location">
                  <MapPin size={14} />
                </div>
                <div className="hero-float-badge__text">
                  <span className="hero-float-badge__strong">Piska Nagri, NH-43</span>
                  <span className="hero-float-badge__sub">Ranchi • Daily OPD</span>
                </div>
              </div>

              {/* Clinical Live Information Bar */}
              <div className="hero-image-caption">
                <div className="hero-image-caption__left">
                  <span className="hero-status-dot" aria-hidden="true" />
                  <span>{t('specialistsAvailable', 'Daily Specialists & Optometrists')}</span>
                </div>
                <div className="hero-image-caption__badge">
                  <Clock size={12} aria-hidden="true" style={{ display: 'inline', marginRight: '4px' }} />
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
