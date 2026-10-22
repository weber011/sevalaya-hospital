import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Clock, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import ThemeLanguageControls from '../common/ThemeLanguageControls';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * Responsive Navigation Header for Sevalaya Hospital
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('navHome', 'Home'), href: '#home' },
    { id: 'about', label: t('navAbout', 'About Us'), href: '#about' },
    { id: 'services', label: t('navServices', 'Eye Care Services'), href: '#services' },
    { id: 'doctors', label: t('navDoctors', 'Our Doctors'), href: '#doctors' },
    { id: 'facilities', label: t('navFacilities', 'Facilities'), href: '#facilities' },
    { id: 'contact', label: t('navContact', 'Contact'), href: '#contact' },
  ];

  // Active section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth navigation handler
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', '#home');
      }
      setActiveSection('home');
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${targetId}`);
      }
      setActiveSection(targetId);

      // Focus management for appointment CTA
      if (targetId === 'appointment') {
        setTimeout(() => {
          const firstField = document.getElementById('fullName');
          if (firstField) firstField.focus();
        }, 500);
      }
    }
  };

  return (
    <header className="site-header" role="banner">
      {/* Top Clinical Utility Bar */}
      <div className="top-bar">
        <Container>
          <div className="top-bar__container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              <div className="top-bar__item">
                <Clock size={13} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
                <span>{t('topbarHours', 'OPD Consultation Hours:')} <strong>{hospitalData.timings.hours}</strong></span>
              </div>
              <div className="top-bar__item hide-mobile">
                <span className="badge badge--success" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                  {t('openToday', 'Open Today')}
                </span>
                <span>{t('specialistsAvailable', 'Specialists available everyday')}</span>
              </div>
            </div>

            <div className="top-bar__item">
              <Phone size={13} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
              <span>{t('helpline', 'Helpline:')}</span>
              <a
                href={hospitalData.contact.phoneTel}
                className="top-bar__link"
                aria-label={`Call Now at ${hospitalData.contact.phoneDisplay}`}
              >
                {hospitalData.contact.phoneDisplay}
              </a>
              <a
                href={hospitalData.contact.phoneTel}
                className="btn btn--outline btn--sm hide-mobile"
                style={{ padding: '0.15rem 0.5rem', height: '24px', fontSize: '0.7rem', marginLeft: '0.35rem' }}
                aria-label={`Call Now at ${hospitalData.contact.phoneDisplay}`}
              >
                {t('callNow', 'Call Now')}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="nav-bar">
        <Container>
          <div className="nav-bar__container">
            {/* Left: Original Hospital Logo and Name */}
            <a
              href="#home"
              className="brand"
              onClick={(e) => handleNavClick(e, 'home')}
              aria-label="Sevalaya Hospital - Return to homepage"
            >
              <img
                src={hospitalData.logoUrl}
                alt="Sevalaya Hospital Official Logo"
                className="brand__logo-img"
                width="44"
                height="44"
              />
              <div className="brand__text">
                <span className="brand__name">{hospitalData.name}</span>
                <span className="brand__tagline">{hospitalData.tagline}</span>
              </div>
            </a>

            {/* Center: Desktop Horizontal Navigation */}
            <nav className="nav-menu" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Theme/Language controls, Primary Red Appointment CTA & Mobile Toggle */}
            <div className="nav-actions">
              <div className="hide-mobile">
                <ThemeLanguageControls isCompact={true} />
              </div>

              <a
                href="#appointment"
                className="btn btn--primary btn--md hide-mobile"
                onClick={(e) => handleNavClick(e, 'appointment')}
                role="button"
              >
                <Calendar size={15} aria-hidden="true" />
                <span>{t('bookAppointment', 'Book an Appointment')}</span>
              </a>

              {/* Accessible Mobile Menu Toggle Button */}
              <button
                type="button"
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Menu Drawer & Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="mobile-drawer mobile-drawer--open"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile site navigation"
        >
          {/* Mobile Theme & Language Controls */}
          <div style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'center' }}>
            <ThemeLanguageControls isCompact={false} />
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} aria-hidden="true" style={{ opacity: 0.5 }} />
                </a>
              );
            })}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <a
              href="#appointment"
              className="btn btn--primary btn--lg"
              onClick={(e) => handleNavClick(e, 'appointment')}
              role="button"
              style={{ width: '100%' }}
            >
              <Calendar size={16} aria-hidden="true" />
              <span>{t('bookAppointment', 'Book an Appointment')}</span>
            </a>

            <a
              href={hospitalData.contact.phoneTel}
              className="btn btn--secondary btn--md"
              style={{ width: '100%', justifyContent: 'center' }}
              aria-label={`Call Now at ${hospitalData.contact.phoneDisplay}`}
            >
              <Phone size={15} aria-hidden="true" />
              <span>{t('callNow', 'Call Now')}: {hospitalData.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
