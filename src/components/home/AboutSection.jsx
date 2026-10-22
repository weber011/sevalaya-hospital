import React from 'react';
import { ShieldCheck, HeartHandshake, Clock, Phone, Calendar, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * About Sevalaya Hospital Section
 */
export default function AboutSection() {
  const { t } = useLanguage();

  const handleAppointmentClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 500);
    }
  };

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <Container>
        <div className="about-grid">
          {/* Left Column: Editorial Information */}
          <div className="about-content">
            <span className="about-eyebrow">
              {t('aboutEyebrow', 'ABOUT SEVALAYA EYE HOSPITAL')}
            </span>

            <h2 id="about-heading" className="about-heading">
              {t('aboutHeading', 'Care That Puts Your Vision First')}
            </h2>

            <p className="about-intro">
              {t('aboutIntro', 'Sevalaya Eye Hospital is dedicated to eye care, combining attentive patient support with eye examinations and treatment services. Our focus is on helping patients understand their eye health and access appropriate care.')}
            </p>

            <p className="about-body">
              {t('aboutBody', 'Whether you are scheduling a routine computerized refractive assessment, exploring surgical options for cataracts, or managing ongoing ocular conditions like glaucoma or retina disorders, our clinical team provides clear guidance tailored to your specific needs.')}
            </p>

            {/* Factual Clinical Focus Pillars */}
            <div className="about-pillars" role="list">
              <div className="about-pillar" role="listitem">
                <HeartHandshake size={20} className="about-pillar__icon" aria-hidden="true" />
                <div>
                  <h3 className="about-pillar__title">{t('pillar1Title', 'Attentive Patient Support')}</h3>
                  <p className="about-pillar__desc">
                    {t('pillar1Desc', 'Comprehensive clinical discussions to help patients and families understand diagnosis, care paths, and optical prescriptions.')}
                  </p>
                </div>
              </div>

              <div className="about-pillar" role="listitem">
                <Clock size={20} className="about-pillar__icon" aria-hidden="true" />
                <div>
                  <h3 className="about-pillar__title">{t('pillar2Title', 'Daily Specialist Availability')}</h3>
                  <p className="about-pillar__desc">
                    {t('pillar2Desc', 'Ophthalmologists and certified optometrists are available every day from 9:00 AM to 7:00 PM for outpatient consultations.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
              <Button
                variant="primary"
                size="md"
                iconLeft={Calendar}
                onClick={handleAppointmentClick}
                href="#appointment"
              >
                {t('scheduleConsultation', 'Schedule Consultation')}
              </Button>
              <Button
                variant="outline"
                size="md"
                iconLeft={Phone}
                href={hospitalData.contact.phoneTel}
              >
                {t('callNow', 'Call')}: {hospitalData.contact.primaryPhone}
              </Button>
            </div>
          </div>

          {/* Right Column: Authentic Hospital Clinical Photograph */}
          <div className="about-visual">
            <div className="about-image-card">
              <img
                src="/assets/doctor-slitlamp-clinical.jpg"
                alt="Authentic ophthalmic clinical slit-lamp eye examination conducted at Sevalaya Eye Hospital"
                className="about-image"
                width="720"
                height="400"
                loading="lazy"
              />

              <div className="about-image-caption">
                <span>
                  <strong>Clinical Practice:</strong> Slit-lamp biomicroscopy examination
                </span>
                <span className="badge badge--subtle" style={{ fontSize: '0.7rem' }}>
                  Authentic Hospital Media
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
