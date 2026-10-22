import React from 'react';
import {
  Monitor,
  Eye,
  Shield,
  ShieldAlert,
  ClipboardList,
  AlertCircle,
  Pill,
  Scan,
  Glasses,
  Baby,
  Activity,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import Badge from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';

const iconMap = {
  Monitor,
  Eye,
  Shield,
  ShieldAlert,
  ClipboardList,
  AlertCircle,
  Pill,
  Scan,
  Glasses,
  Baby,
  Activity,
  Stethoscope,
};

/**
 * ServiceCard: Professional clinical card presenting hospital ophthalmic services.
 * Follows human agency design: subtle border, modest radius, restrained red accents.
 */
export default function ServiceCard({
  service,
  onSelect,
  className = ''
}) {
  const { t } = useLanguage();
  const IconComponent = iconMap[service.iconName] || Eye;

  const handleConsult = (e) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(service);
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
    <article
      className={`service-card ${className}`}
      aria-label={`${service.title} - ${service.description}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div className="service-card__icon-wrapper" aria-hidden="true">
          <IconComponent size={22} />
        </div>
        {service.highlight && (
          <Badge variant="accent">
            {service.highlight}
          </Badge>
        )}
      </div>

      <div className="service-card__hindi-title">
        {service.hindiTitle}
      </div>

      <h3 className="service-card__title">
        {service.title}
      </h3>

      <p className="service-card__description">
        {service.description}
      </p>

      <div className="service-card__footer">
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
          {t('openToday', 'Available Daily')}
        </span>
        <a
          href="#appointment"
          className="service-card__link"
          onClick={handleConsult}
          aria-label={`Book clinical consultation for ${service.title}`}
        >
          <span>{t('bookConsultBtn', 'Book Consult')}</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
