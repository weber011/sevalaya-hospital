import React from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import ServiceCard from '../cards/ServiceCard';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * Eye Care Services Section
 */
export default function ServicesSection({ onSelectService }) {
  const { t } = useLanguage();

  const handleSelect = (service) => {
    if (onSelectService) {
      onSelectService(service);
    } else {
      const el = document.getElementById('appointment');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const selectField = document.getElementById('serviceId');
          if (selectField) {
            selectField.value = service.id;
            selectField.focus();
          }
        }, 500);
      }
    }
  };

  return (
    <section
      id="services"
      className="section-spacing"
      style={{ backgroundColor: 'var(--color-bg-page)', borderBottom: '1px solid var(--color-border-subtle)' }}
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeader
          id="services-heading"
          eyebrow={t('servicesEyebrow', 'Specialized Eye Care & Clinical Facilities')}
          title={t('servicesTitle', 'Complete Eye Care, All in One Place')}
          subtitle={t(
            'servicesSubtitle',
            'From comprehensive eye testing and computerised refraction to Phaco & SICS cataract surgery, Pterygium care, General OPD, in-house Pharmacy, and Lenskart Optical Store — Sevalaya Eye Hospital provides dedicated ophthalmic facilities daily.'
          )}
          centered
        />

        {/* Responsive 8-Service Clinical Grid */}
        <div
          className="services-grid"
          role="region"
          aria-label="List of 8 Clinical Ophthalmology Services and Optical Facilities"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {hospitalData.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
