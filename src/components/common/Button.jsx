import React from 'react';

/**
 * Accessible Button component supporting multiple design system variants.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  type = 'button',
  disabled = false,
  className = '',
  href,
  onClick,
  ...props
}) {
  const buttonClass = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    className
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        onClick={onClick}
        role="button"
        {...props}
      >
        {IconLeft && <IconLeft size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} aria-hidden="true" />}
        <span>{children}</span>
        {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {IconLeft && <IconLeft size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} aria-hidden="true" />}
    </button>
  );
}
