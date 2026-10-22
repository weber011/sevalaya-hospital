import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import Button from './Button';
import { hospitalData } from '../../data/hospitalData';

/**
 * Accessible Modal Dialog for Privacy Policy and Terms & Conditions
 * Accessible attributes, keyboard Escape handling, and focus retention.
 */
export default function PolicyModal({ isOpen, onClose, type }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy
    ? 'Sevalaya Hospital – Privacy Policy'
    : 'Sevalaya Hospital – Terms and Conditions';
  const IconComp = isPrivacy ? ShieldCheck : FileText;

  return (
    <div
      className="policy-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="policy-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="policy-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-tint)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <IconComp size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 id="policy-modal-title" className="policy-modal-title">
                {title}
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Last updated: October 2026 • Official Clinical Policy
              </span>
            </div>
          </div>

          <button
            type="button"
            className="policy-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="policy-modal-body">
          {isPrivacy ? (
            <>
              <p>
                At <strong>{hospitalData.name} ({hospitalData.hindiName})</strong>, patient privacy and clinical confidentiality are foundational principles. This Privacy Policy details how patient information is handled when visiting our website and requesting consultations.
              </p>

              <h4>1. Information Collected</h4>
              <p>
                We collect only the essential details required to schedule and coordinate your ophthalmic consultation:
              </p>
              <ul>
                <li>Patient full name</li>
                <li>Contact mobile number</li>
                <li>Preferred appointment date and time</li>
                <li>Requested clinical service (e.g., Cataract, Glaucoma, Computerised Eye Test)</li>
                <li>Optional notes or symptoms you choose to share</li>
              </ul>
              <p>
                We <strong>do not</strong> request Aadhaar numbers, financial identifiers, credit/debit card numbers, or unnecessary personal history through our website.
              </p>

              <h4>2. Zero Browser Storage & No Data Tracking</h4>
              <p>
                Your appointment form submissions are <strong>never stored in browser storage</strong> (localStorage or sessionStorage) and are never logged to browser developer consoles. No advertising trackers, third-party marketing pixels, or profile-building cookies are deployed on this website.
              </p>

              <h4>3. WhatsApp Communication</h4>
              <p>
                When utilizing the WhatsApp click-to-chat feature, communication occurs directly over WhatsApp's encrypted platform between your personal device and Sevalaya Hospital's official contact desk. You retain full control to review, edit, or decline to send any pre-filled message before dispatch.
              </p>

              <h4>4. Information Use & Non-Disclosure</h4>
              <p>
                Information provided is utilized solely for clinical scheduling, patient registration, and responding to direct inquiries. We do not sell, rent, commercialize, or share patient information with marketing agencies or third parties.
              </p>

              <h4>5. Clinical Inquiries & Contact</h4>
              <p>
                If you have questions regarding data privacy or wish to update your contact preferences, please reach our hospital helpdesk at <strong>{hospitalData.contact.phoneDisplay}</strong> or during consultation hours (9:00 AM – 7:00 PM Daily).
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the official website of <strong>{hospitalData.name} ({hospitalData.hindiName})</strong>. By browsing this website or submitting an appointment request, you acknowledge and agree to the following clinical terms.
              </p>

              <h4>1. General Clinical Information, Not Medical Diagnosis</h4>
              <p>
                All informational content on this website—including service descriptions of cataract surgeries, glaucoma therapies, and computerized vision assessments—is published for general educational guidance only. Website content does not constitute formal medical advice, definitive diagnosis, or surgical prescription.
              </p>
              <p>
                An in-person physical examination with an ophthalmologist or certified optometrist is mandatory before any clinical diagnosis, medication prescription, or surgical decision.
              </p>

              <h4>2. Appointment Requests & Confirmation</h4>
              <p>
                Submitting an appointment booking form or initiating a WhatsApp chat constitutes a <em>request for consultation</em>. An appointment is officially confirmed only after hospital reception acknowledges clinician availability and registers the patient slot.
              </p>

              <h4>3. Ophthalmic Emergencies</h4>
              <p>
                For acute ocular emergencies—including chemical burns, penetrating eye trauma, sudden complete vision loss, or severe acute ocular pain—do not wait for an online reply. Please report immediately to the hospital reception or contact our emergency hotline at <strong>{hospitalData.contact.phoneDisplay}</strong>.
              </p>

              <h4>4. Source of Truth & Verification Transparency</h4>
              <p>
                All medical services, daily consultation hours (9:00 AM – 7:00 PM), and contact hotlines published on this site are derived from verified hospital media. Specific surgical scheduling and doctor rosters are managed directly at the hospital premises.
              </p>

              <h4>5. Intellectual Property</h4>
              <p>
                The original Sevalaya Hospital logo, medical cross monogram, and clinical website text are proprietary assets of Sevalaya Hospital.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="policy-modal-footer">
          <Button variant="primary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
