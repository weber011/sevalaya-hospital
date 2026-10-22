import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Container from './components/common/Container';
import SectionHeader from './components/common/SectionHeader';
import AppointmentForm from './components/forms/AppointmentForm';
import IntroAnimation from './components/intro/IntroAnimation';
import HeroSection from './components/home/HeroSection';
import AboutSection from './components/home/AboutSection';
import ServicesSection from './components/home/ServicesSection';
import FacilitiesSection from './components/home/FacilitiesSection';
import DoctorsSection from './components/home/DoctorsSection';
import ContactSection from './components/home/ContactSection';
import FloatingWhatsAppButton from './components/common/FloatingWhatsAppButton';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [replayIntro, setReplayIntro] = useState(false);

  const handleSelectService = (service) => {
    const serviceId = typeof service === 'string' ? service : service?.id || '';
    setSelectedService(serviceId);
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const selectField = document.getElementById('serviceId');
        if (selectField) {
          selectField.value = serviceId;
          selectField.focus();
        }
      }, 500);
    }
  };

  const handleOpenAppointment = () => {
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 450);
    }
  };

  return (
    <div className="site-wrapper">
      {/* Opening Intro Animation (Session-cached & reduced-motion aware) */}
      <IntroAnimation
        forceShow={replayIntro}
        onFinish={() => setReplayIntro(false)}
      />

      {/* Global Reusable Navigation Header */}
      <Header activeSection={activeNav} />

      <main id="main-content" role="main">
        {/* 1. Official Homepage Hero Section (#home) */}
        <HeroSection onOpenAppointment={handleOpenAppointment} />

        {/* 2. About Sevalaya Eye Hospital Section (#about) */}
        <AboutSection />

        {/* 3. Eye Care Services Section (Complete 10-Service Clinical Grid) (#services) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. Hospital Facilities & Clinical Infrastructure Section (#facilities) */}
        <FacilitiesSection onConsultFacility={handleSelectService} />

        {/* 5. Doctors & Specialist Availability Schedule (#doctors) */}
        <DoctorsSection
          onBookAppointment={handleOpenAppointment}
          onReplayIntro={() => setReplayIntro(true)}
        />

        {/* 6. Real Clinical Consultation & Appointment Booking Section (#appointment) */}
        <section
          id="appointment"
          className="section-spacing"
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            borderTop: '1px solid var(--color-border-subtle)',
            borderBottom: '1px solid var(--color-border-subtle)'
          }}
          aria-labelledby="appointment-heading"
        >
          <Container narrow>
            <SectionHeader
              id="appointment-heading"
              eyebrow="PATIENT CONSULTATIONS"
              title={t('bookAppointment', 'Book an Eye Care Appointment')}
              subtitle="Ophthalmologists & Optometrists available daily (9:00 AM – 7:00 PM). Complete the form or call directly."
              centered
            />
            <AppointmentForm initialServiceId={selectedService} />
          </Container>
        </section>

        {/* 7. Verified Contact Actions & Direct Communication Section (#contact) */}
        <ContactSection onOpenAppointment={handleOpenAppointment} />
      </main>

      {/* Global Reusable Footer */}
      <Footer />

      {/* Floating WhatsApp Click-to-Chat Button (Bottom-Right Viewport) */}
      <FloatingWhatsAppButton />
    </div>
  );
}
