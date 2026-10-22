import React from 'react';

/**
 * Reusable Badge for categories, status indicators, and highlights.
 */
export default function Badge({
  children,
  variant = 'subtle', // 'accent' | 'subtle' | 'success'
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <span className={`badge badge--${variant} ${className}`} {...props}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
