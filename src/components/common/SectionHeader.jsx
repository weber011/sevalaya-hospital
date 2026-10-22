import React from 'react';

/**
 * Editorial SectionHeader with eyebrow category, serif title, and explanatory subtitle.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
  as: TitleTag = 'h2',
  ...props
}) {
  return (
    <header
      className={`section-header ${centered ? 'section-header--centered' : ''} ${className}`}
      {...props}
    >
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      <TitleTag className="section-title">{title}</TitleTag>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  );
}
