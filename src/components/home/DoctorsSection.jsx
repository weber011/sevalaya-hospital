import React from 'react';
import {
  UserCheck,
  Clock,
  Calendar,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Play
} from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';

/**
 * Doctors & Clinical Availability Section
 */
export default function DoctorsSection({ onBookAppointment, onReplayIntro }) {
  const { t } = useLanguage();

  const handleBook = (e) => {
    e.preventDefault();
    if (onBookAppointment) {
      onBookAppointment();
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
      id="doctors"
      className="section-spacing"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}
      aria-labelledby="doctors-heading"
    >
      <Container>
        <SectionHeader
          id="doctors-heading"
          eyebrow={t('doctorsEyebrow', 'CLINICAL OPHTHALMOLOGY TEAM')}
          title={t('doctorsTitle', 'Eye Specialists & Qualified Optometrists')}
          subtitle={t('doctorsSubtitle', 'Experienced ophthalmologists and certified optometrists provide attentive patient examinations, computerized vision testing, and surgical guidance daily.')}
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-8)'
          }}
        >
          {/* Card 1: Daily Consultation Hours */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-primary-tint)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-hidden="true"
              >
                <Clock size={22} />
              </div>
              <Badge variant="subtle">Daily Consultations</Badge>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-2)', color: 'var(--color-text-main)' }}>
              {t('doctorsCard1Title', 'Daily Specialist Availability')}
            </h3>

            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, flexGrow: 1, marginBottom: 'var(--space-4)' }}>
              {t('doctorsCard1Desc', 'Both ophthalmologists and optometrists are available every day from 9:00 AM to 7:00 PM for routine assessments, ocular evaluations, and post-procedural reviews.')}
            </p>

            <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {t('openToday', 'Walk-in & scheduled consultations')}
              </span>
            </div>
          </div>

          {/* Card 2: Clinical Examination Scope */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-primary-tint)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-hidden="true"
              >
                <UserCheck size={22} />
              </div>
              <Badge variant="subtle">Clinical Guidance</Badge>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-2)', color: 'var(--color-text-main)' }}>
              {t('doctorsCard2Title', 'Attentive & Patient-Centered Care')}
            </h3>

            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, flexGrow: 1, marginBottom: 'var(--space-4)' }}>
              {t('doctorsCard2Desc', 'Our clinicians take time to discuss test results thoroughly, helping patients and families understand eye health, optical prescriptions, and appropriate surgical or medical treatment pathways.')}
            </p>

            <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Objective refraction & slit-lamp biomicroscopy
              </span>
            </div>
          </div>

          {/* Card 3: Direct Hospital Registration */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(17, 24, 39, 0.06)',
                  color: 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-hidden="true"
              >
                <ShieldCheck size={22} />
              </div>
              <Badge variant="primary">Verified Desk</Badge>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-2)', color: 'var(--color-text-main)' }}>
              {t('doctorsCard3Title', 'Appointment & Inquiries')}
            </h3>

            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, flexGrow: 1, marginBottom: 'var(--space-4)' }}>
              {t('doctorsCard3Desc', 'Specialist duty rosters and surgical slots are managed directly through our hospital reception. Reach out directly by phone or request an appointment online.')}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'auto' }}>
              <Button
                variant="primary"
                size="sm"
                iconLeft={Calendar}
                onClick={handleBook}
                href="#appointment"
              >
                {t('bookAppointment', 'Book Appointment')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconLeft={Phone}
                href={hospitalData.contact.phoneTel}
              >
                {hospitalData.contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>

        {/* Source of Truth & Session Controls Callout */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-4) var(--space-5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <ShieldCheck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              <strong>Clinical Verification:</strong> All scheduling information is verified directly against hospital operating banners (Daily 9:00 AM – 7:00 PM).
            </span>
          </div>

          {onReplayIntro && (
            <Button
              variant="ghost"
              size="sm"
              iconLeft={Play}
              onClick={onReplayIntro}
            >
              Replay Opening Intro
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
