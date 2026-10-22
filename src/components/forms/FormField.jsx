import React from 'react';

/**
 * Accessible form field wrapper providing label, input rendering, error message, and screen-reader wiring.
 */
export default function FormField({
  id,
  label,
  required = false,
  error,
  helper,
  type = 'text',
  as: Component = 'input',
  options = [],
  className = '',
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helper ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const controlClasses = [
    Component === 'textarea'
      ? 'form-textarea'
      : Component === 'select'
      ? 'form-select'
      : 'form-input',
    error ? 'form-input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label
          htmlFor={id}
          className={`form-label ${required ? 'form-label--required' : ''}`}
        >
          {label}
        </label>
      )}

      {Component === 'select' ? (
        <select
          id={id}
          className={controlClasses}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : Component === 'textarea' ? (
        <textarea
          id={id}
          className={controlClasses}
          required={required}
          rows={4}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={controlClasses}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
      )}

      {helper && !error && (
        <p id={helperId} className="form-helper">
          {helper}
        </p>
      )}

      {error && (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
