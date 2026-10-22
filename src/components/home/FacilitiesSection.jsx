import React from 'react';
import {
  Monitor,
  Eye,
  Scan,
  ShieldAlert,
  ClipboardList,
  Pill,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Badge from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * Facilities Section for Sevalaya Hospital
 */
export default function FacilitiesSection({ onConsultFacility }) {
  const { t } = useLanguage();

  const facilities = [
    {
      id: 'diagnostic-testing',
      title: 'Eye Examination & Diagnostic Testing',
      icon: Monitor,
      availability: 'Daily 9:00 AM – 7:00 PM',
      highlight: 'Core Diagnostic',
      description:
        'Equipped for computerized visual testing, objective refraction measurements, and clinical slit-lamp examinations to assess optical clarity and ocular health.'
    },
    {
      id: 'cataract-services',
      title: 'Cataract-Related Surgical Services',
      icon: Eye,
      availability: 'Scheduled Procedures',
      highlight: 'Surgical Suite',
      description:
        'Surgical infrastructure dedicated to cataract evaluation, lens assessment, and modern micro-incision surgical interventions for cloudy lenses.'
    },
    {
      id: 'retinal-care',
      title: 'Retinal Examination & Treatment',
      icon: Scan,
      availability: 'Specialist Evaluation',
      highlight: 'Posterior Segment',
      description:
        'Specialized diagnostic and clinical care facilities focusing on the retina, evaluating diabetic changes, vascular conditions, and macula health.'
    },
    {
      id: 'glaucoma-care',
      title: 'Glaucoma-Related Care',
      icon: ShieldAlert,
      availability: 'Regular Monitoring',
      highlight: 'Pressure Screening',
      description:
        'Systematic intraocular pressure measurement and optic nerve assessments to detect early signs of glaucoma and manage chronic ocular pressure.'
    },
    {
      id: 'general-outpatient',
      title: 'General Outpatient Services',
      icon: ClipboardList,
      availability: 'Daily 9:00 AM – 7:00 PM',
      highlight: 'Walk-In & Appointment',
      description:
        'Consultation chambers for non-surgical ocular health issues including eye infections, allergies, foreign body sensations, and chronic eye strain.'
    },
    {
      id: 'pharmacy-dispensary',
      title: 'In-House Pharmacy',
      icon: Pill,
      availability: 'Hospital Hours',
      highlight: 'On-Site Facility',
      description:
        'On-premises dispensary providing direct access to verified ophthalmic eye drops, lubricating solutions, and medications prescribed by our specialists.'
    }
  ];

  const handleFacilityClick = (facilityId) => {
    if (onConsultFacility) {
      onConsultFacility(facilityId);
    } else {
      const el = document.getElementById('appointment');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const selectField = document.getElementById('serviceId');
          if (selectField) selectField.focus();
        }, 500);
      }
    }
  };

  return (
    <section id="facilities" className="facilities-section" aria-labelledby="facilities-heading">
      <Container>
        <SectionHeader
          id="facilities-heading"
          eyebrow={t('facilitiesEyebrow', 'CLINICAL INFRASTRUCTURE')}
          title={t('facilitiesTitle', 'Hospital Facilities & Clinical Care')}
          subtitle={t('facilitiesSubtitle', 'A clear overview of the specialized ophthalmic facilities and clinical departments available at Sevalaya Eye Hospital.')}
          centered
        />

        {/* 6 Core Facilities Grid */}
        <div
          className="facilities-grid"
          role="region"
          aria-label="Overview of 6 Hospital Facilities"
        >
          {facilities.map((fac) => {
            const IconComp = fac.icon;
            return (
              <article key={fac.id} className="facility-card">
                <div className="facility-card__header">
                  <div className="facility-card__icon-wrapper" aria-hidden="true">
                    <IconComp size={22} />
                  </div>
                  <Badge variant="subtle">
                    {fac.highlight}
                  </Badge>
                </div>

                <h3 className="facility-card__title">{fac.title}</h3>

                <p className="facility-card__desc">{fac.description}</p>

                <div className="facility-card__footer">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                    <span>{fac.availability}</span>
                  </span>

                  <button
                    type="button"
                    className="service-card__link"
                    onClick={() => handleFacilityClick(fac.id)}
                    aria-label={`Inquire about ${fac.title}`}
                  >
                    <span>{t('inquireBtn', 'Inquire')}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Operating Hours & Scheduling Transparency Notice */}
        <div className="facilities-hours-notice" role="note">
          <div className="facilities-hours-notice__text">
            <Info size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
            <div>
              {t('facilitiesHoursNotice', 'Operating Hours Policy: Outpatient consultations and diagnostic testing operate Daily 9:00 AM – 7:00 PM. Scheduled surgical procedures are planned following clinical consultation.')}
            </div>
          </div>
          <a
            href={hospitalData.contact.phoneTel}
            className="btn btn--outline btn--sm"
            style={{ flexShrink: 0 }}
          >
            {t('inquireBtn', 'Inquiries')}: {hospitalData.contact.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
