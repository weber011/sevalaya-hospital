/**
 * Form Validation Utilities for Sevalaya Hospital
 * Comprehensive, accessible error messages adhering to Indian healthcare and phone standards.
 */

/**
 * Validates an Indian mobile number.
 * Accepts formats:
 * - 9876543210
 * - 98765 43210 / 98765-43210
 * - +91 9876543210 / +919876543210
 * - 919876543210
 * - 09876543210
 *
 * Strict validation: Clean number must be 10 digits starting with 6, 7, 8, or 9.
 */
export function validateIndianMobile(value) {
  if (!value || !value.trim()) {
    return {
      isValid: false,
      error: 'Please enter patient mobile number.'
    };
  }

  const raw = value.trim();

  // Strip all non-digit characters
  let digits = raw.replace(/\D/g, '');

  // Handle leading country code or trunk prefix
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  if (digits.length !== 10) {
    return {
      isValid: false,
      error: 'Mobile number must be exactly 10 digits.'
    };
  }

  // Indian mobile numbers start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(digits)) {
    return {
      isValid: false,
      error: 'Indian mobile numbers must start with 6, 7, 8, or 9.'
    };
  }

  return {
    isValid: true,
    cleanedNumber: digits
  };
}

/**
 * Validates patient full name.
 * Requires at least 2 characters, sensible alphabetic names with spaces/dots/hyphens.
 */
export function validatePatientName(value) {
  if (!value || !value.trim()) {
    return {
      isValid: false,
      error: 'Please enter patient full name.'
    };
  }

  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'Patient name must be at least 2 characters.'
    };
  }

  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Name should contain letters, spaces, and standard punctuation only.'
    };
  }

  return { isValid: true };
}

/**
 * Validates preferred appointment date.
 * Strictly prevents past dates. Compares against local date (YYYY-MM-DD).
 */
export function validateAppointmentDate(value) {
  if (!value || !value.trim()) {
    return {
      isValid: false,
      error: 'Please select a preferred appointment date.'
    };
  }

  // Parse YYYY-MM-DD
  const parts = value.split('-');
  if (parts.length !== 3) {
    return {
      isValid: false,
      error: 'Please select a valid date.'
    };
  }

  const selectedYear = parseInt(parts[0], 10);
  const selectedMonth = parseInt(parts[1], 10) - 1; // 0-indexed
  const selectedDay = parseInt(parts[2], 10);

  const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
  selectedDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return {
      isValid: false,
      error: 'Appointment date cannot be in the past. Please select today or an upcoming date.'
    };
  }

  // Check reasonable future horizon (e.g. within 90 days)
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);
  if (selectedDate > maxDate) {
    return {
      isValid: false,
      error: 'Appointments can only be scheduled within the next 90 days.'
    };
  }

  return { isValid: true };
}

/**
 * Formats a Date object as YYYY-MM-DD for min/max attributes on HTML date input.
 */
export function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats YYYY-MM-DD into a readable presentation string, e.g. "Thursday, 24 October 2026".
 */
export function formatDisplayDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
