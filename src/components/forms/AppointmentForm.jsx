import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  Shield,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import FormField from './FormField';
import Button from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { hospitalData } from '../../data/hospitalData';
import {
  WHATSAPP_CONFIG,
  APPOINTMENT_SERVICES,
  CONSULTATION_TIME_SLOTS,
  mapServiceIdToAppointmentOption,
  generateWhatsAppLink
} from '../../config/whatsappConfig';
import {
  validateIndianMobile,
  validatePatientName,
  validateAppointmentDate,
  getTodayDateString,
  formatDisplayDate
} from '../../utils/formValidation';

/**
 * Professional Appointment Booking Form for Sevalaya Hospital
 */
export default function AppointmentForm({
  initialServiceId = '',
  onSuccess,
  className = ''
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    serviceId: mapServiceIdToAppointmentOption(initialServiceId) || '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const firstErrorRef = useRef(null);

  // Sync external service selections (e.g. clicking "Book Consult" from Services or Facilities)
  useEffect(() => {
    if (initialServiceId) {
      const mapped = mapServiceIdToAppointmentOption(initialServiceId);
      setFormData((prev) => ({ ...prev, serviceId: mapped }));
    }
  }, [initialServiceId]);

  // Options for service dropdown
  const serviceOptions = [
    { value: '', label: 'Select Service Required *' },
    ...APPOINTMENT_SERVICES.map((s) => ({
      value: s.value,
      label: s.label
    }))
  ];

  // Options for consultation time dropdown (Daily 9:00 AM – 7:00 PM)
  const timeOptions = [
    { value: '', label: 'Select Preferred Time Slot (9:00 AM – 7:00 PM) *' },
    ...CONSULTATION_TIME_SLOTS.map((t) => ({
      value: t.value,
      label: t.label
    }))
  ];

  // Helper to find selected service display label
  const getSelectedServiceLabel = () => {
    const found = APPOINTMENT_SERVICES.find((s) => s.value === formData.serviceId);
    return found ? found.label : 'General Eye Consultation';
  };

  const validate = () => {
    const newErrors = {};

    // 1. Patient Name Validation
    const nameCheck = validatePatientName(formData.fullName);
    if (!nameCheck.isValid) {
      newErrors.fullName = nameCheck.error;
    }

    // 2. Mobile Number Validation
    const mobileCheck = validateIndianMobile(formData.mobile);
    if (!mobileCheck.isValid) {
      newErrors.mobile = mobileCheck.error;
    }

    // 3. Service Required Validation
    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select the service required.';
    }

    // 4. Preferred Date Validation
    const dateCheck = validateAppointmentDate(formData.preferredDate);
    if (!dateCheck.isValid) {
      newErrors.preferredDate = dateCheck.error;
    }

    // 5. Preferred Time Validation
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred consultation time.';
    }

    setErrors(newErrors);

    // Focus the first invalid field for accessibility
    const firstInvalidField = Object.keys(newErrors)[0];
    if (firstInvalidField) {
      setTimeout(() => {
        const el = document.getElementById(firstInvalidField);
        if (el) {
          el.focus();
        }
      }, 50);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update state without logging sensitive patient data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Determine normalized clean mobile number
    const mobileCheck = validateIndianMobile(formData.mobile);
    const cleanedMobile = mobileCheck.cleanedNumber || formData.mobile.trim();
    const serviceLabel = getSelectedServiceLabel();

    // Construct WhatsApp click-to-chat URL
    const url = generateWhatsAppLink(
      {
        fullName: formData.fullName.trim(),
        mobile: cleanedMobile,
        preferredDate: formatDisplayDate(formData.preferredDate),
        preferredTime: formData.preferredTime,
        message: formData.message.trim()
      },
      serviceLabel
    );

    setWhatsappUrl(url);

    // Attempt to open WhatsApp in new tab / application
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // If popup blocker intervened, the user will use the primary button on the review screen
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleEditDetails = () => {
    // Preserve all entered form data, simply return to editing view
    setIsSubmitted(false);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobile: '',
      serviceId: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // =========================================================================
  // Screen 2: Post-Submission Review & WhatsApp Action Screen
  // =========================================================================
  if (isSubmitted) {
    const serviceLabel = getSelectedServiceLabel();
    const displayDate = formatDisplayDate(formData.preferredDate);

    return (
      <div className={`appointment-confirmation ${className}`} role="status" aria-live="polite">
        <div className="confirmation-badge-wrapper" aria-hidden="true">
          <MessageSquare size={30} />
        </div>

        <h3 className="confirmation-title">
          Appointment Request Prepared
        </h3>

        {/* Requirements 10 & 11: Explicit instruction that patient must review and send in WhatsApp */}
        <div className="confirmation-notice-box" role="alert">
          <strong>Next Step: Please Review & Send in WhatsApp</strong>
          Your appointment details have been compiled and opened in WhatsApp.
          Please <strong>press "Send" inside WhatsApp</strong> to deliver your request to our hospital reception.
          <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', opacity: 0.9 }}>
            <em>Note: The appointment is confirmed only after hospital reception acknowledges clinician availability.</em>
          </div>
        </div>

        {/* Detailed Summary of Patient's Entered Details */}
        <div className="confirmation-summary-card">
          <div className="confirmation-summary-title">Summary of Request Details</div>
          <div className="confirmation-summary-grid">
            <div>
              <span className="summary-item-label">Patient Name:</span>
              <span className="summary-item-value">{formData.fullName}</span>
            </div>
            <div>
              <span className="summary-item-label">Mobile Number:</span>
              <span className="summary-item-value">+91 {formData.mobile.replace(/\D/g, '').slice(-10)}</span>
            </div>
            <div>
              <span className="summary-item-label">Service Required:</span>
              <span className="summary-item-value">{serviceLabel}</span>
            </div>
            <div>
              <span className="summary-item-label">Preferred Date:</span>
              <span className="summary-item-value">{displayDate}</span>
            </div>
            <div>
              <span className="summary-item-label">Preferred Time:</span>
              <span className="summary-item-value">{formData.preferredTime}</span>
            </div>
            {formData.message && (
              <div>
                <span className="summary-item-label">Additional Message:</span>
                <span className="summary-item-value">{formData.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Primary and Alternative Actions */}
        <div className="confirmation-actions">
          {/* Primary Action: Re-open WhatsApp in case browser popup was blocked */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-open"
            aria-label="Open WhatsApp to send appointment request"
          >
            <Send size={18} aria-hidden="true" />
            <span>Open WhatsApp to Send Request</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>

          {/* Secondary Actions: Edit details or call hospital directly */}
          <div className="confirmation-secondary-actions">
            <Button
              type="button"
              variant="outline"
              size="md"
              iconLeft={RotateCcw}
              onClick={handleEditDetails}
            >
              Modify Details
            </Button>

            <Button
              type="button"
              variant="outline-primary"
              size="md"
              iconLeft={Phone}
              href={hospitalData.contact.phoneTel}
            >
              Direct Call: {hospitalData.contact.phoneDisplay}
            </Button>
          </div>
        </div>

        <p className="confirmation-footer-note">
          WhatsApp Click-to-Chat connects directly with Sevalaya Eye Hospital's desk at {WHATSAPP_CONFIG.displayNumber}.
          No automated background bot or server-side messaging is used.
        </p>
      </div>
    );
  }

  // =========================================================================
  // Screen 1: Primary Appointment Booking Form
  // =========================================================================
  return (
    <form
      ref={formRef}
      className={`appointment-form-card ${className}`}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Eye Care Consultation Appointment Form"
    >
      <div className="appointment-form-header">
        <h3 className="appointment-form-title">
          {t('appFormTitle', 'Request an Eye Care Consultation')}
        </h3>
        <p className="appointment-form-subtitle">
          {t('appFormSubtitle', 'Complete the details below to prepare your appointment request for WhatsApp. Specialists and optometrists are available daily (9:00 AM – 7:00 PM).')}
        </p>
      </div>

      {/* Row 1: Patient Name & Mobile Number */}
      <div className="form-row">
        <FormField
          id="fullName"
          name="fullName"
          label={t('fullNameLabel', 'Patient Name')}
          required
          placeholder={t('fullNamePlaceholder', 'e.g. Ramesh Kumar')}
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
        />

        <FormField
          id="mobile"
          name="mobile"
          label={t('mobileLabel', 'Mobile Number')}
          type="tel"
          required
          placeholder={t('mobilePlaceholder', 'e.g. 9876543210 or 7004214800')}
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          helper="10-digit Indian mobile number for appointment coordination."
          autoComplete="tel"
        />
      </div>

      {/* Row 2: Service Required & Preferred Date */}
      <div className="form-row">
        <FormField
          id="serviceId"
          name="serviceId"
          label={t('serviceLabel', 'Service Required')}
          as="select"
          required
          options={serviceOptions}
          value={formData.serviceId}
          onChange={handleChange}
          error={errors.serviceId}
        />

        <FormField
          id="preferredDate"
          name="preferredDate"
          label={t('dateLabel', 'Preferred Appointment Date')}
          type="date"
          required
          min={getTodayDateString()}
          value={formData.preferredDate}
          onChange={handleChange}
          error={errors.preferredDate}
          helper="Select today or an upcoming consultation date."
        />
      </div>

      {/* Row 3: Preferred Appointment Time */}
      <FormField
        id="preferredTime"
        name="preferredTime"
        label={t('timeLabel', 'Preferred Appointment Time')}
        as="select"
        required
        options={timeOptions}
        value={formData.preferredTime}
        onChange={handleChange}
        error={errors.preferredTime}
        helper="Hospital OPD operates daily 9:00 AM – 7:00 PM."
      />

      {/* Row 4: Additional Message (Optional) */}
      <FormField
        id="message"
        name="message"
        label={t('messageLabel', 'Additional Message (Optional)')}
        as="textarea"
        placeholder={t('messagePlaceholder', 'Describe eye symptoms, duration, blurriness, or any past optical prescriptions...')}
        value={formData.message}
        onChange={handleChange}
        maxLength={500}
        helper="Optional: Any specific symptoms or questions for the doctor."
      />

      {/* Concise Privacy Notice (Strictly no browser storage, no unnecessary data) */}
      <div className="form-privacy-notice" role="note">
        <Shield size={16} className="form-privacy-icon" aria-hidden="true" />
        <div>
          {t('privacyNoticeText', 'Privacy Notice: We collect only the contact details and appointment preferences necessary to coordinate your visit. Your data is not stored in browser storage, logged to consoles, or shared with third parties.')}
        </div>
      </div>

      {/* Submit Button & Direct Phone Notice */}
      <div className="form-submit-wrapper">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="form-btn-submit"
          disabled={isSubmitting}
          iconLeft={Send}
        >
          {isSubmitting ? t('submittingBtn', 'Preparing WhatsApp Request...') : t('submitAppBtn', 'Proceed to WhatsApp Booking')}
        </Button>

        {/* Alternative Telephone Contact */}
        <div className="form-direct-call-notice">
          <Phone size={13} aria-hidden="true" />
          <span>
            {t('directPhoneNotice', 'Prefer direct telephone booking? Call our reception directly at ')}
            <a href={hospitalData.contact.phoneTel}>
              {hospitalData.contact.phoneDisplay}
            </a>{' '}
            (Daily 9:00 AM – 7:00 PM).
          </span>
        </div>
      </div>
    </form>
  );
}
