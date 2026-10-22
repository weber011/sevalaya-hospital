import React from 'react';

/**
 * Container component providing consistent responsive max-width and margins.
 */
export default function Container({
  children,
  narrow = false,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const containerClasses = [
    'container',
    narrow ? 'container--narrow' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
}
