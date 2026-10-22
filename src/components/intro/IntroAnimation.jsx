import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';

const SESSION_STORAGE_KEY = 'sevalaya_intro_seen';

/**
 * Opening Animation Component for Sevalaya Hospital
 *
 * Requirements Met:
 * 1. Clean white background canvas.
 * 2. Fade in original Sevalaya emblem with subtle scale transition.
 * 3. Reveal hospital wordmark beneath it.
 * 4. Introduce thin Sevalaya-red line using restrained horizontal expansion.
 * 5. Smooth fade into the homepage (~2.5s total).
 * 6. sessionStorage check (runs once per browser session).
 * 7. Accessible Skip Intro control.
 * 8. Immediate bypass for prefers-reduced-motion.
 * 9. Graceful error handling and no audio autoplay.
 */
export default function IntroAnimation({ onFinish, forceShow = false }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const skipButtonRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const finishTimerRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility Check: prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Session Check: Show intro only once per session unless forceShow is true
    const hasSeenIntro =
      typeof window !== 'undefined' &&
      sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';

    if ((hasSeenIntro || prefersReducedMotion) && !forceShow) {
      if (onFinish) onFinish();
      return;
    }

    // Prepare intro sequence
    setShouldRender(true);

    // Timeline Choreography:
    // 0.0s - 2.2s: In-animation (emblem, wordmark, red line, subtitle)
    // 2.2s - 2.65s: Smooth dissolution into the homepage
    fadeTimerRef.current = setTimeout(() => {
      setIsFading(true);
    }, 2200);

    finishTimerRef.current = setTimeout(() => {
      completeIntro();
    }, 2650);

    return () => {
      clearTimeout(fadeTimerRef.current);
      clearTimeout(finishTimerRef.current);
    };
  }, [forceShow]);

  const completeIntro = () => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // Handle private browsing or restricted quota silently
    }
    setShouldRender(false);
    if (onFinish) onFinish();
  };

  const handleSkip = () => {
    clearTimeout(fadeTimerRef.current);
    clearTimeout(finishTimerRef.current);
    setIsFading(true);
    setTimeout(() => {
      completeIntro();
    }, 120);
  };

  const handleImageError = () => {
    // If original image fails to load, gracefully transition to homepage without hanging
    handleSkip();
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`intro-overlay ${isFading ? 'intro-overlay--fading' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Sevalaya Hospital"
    >
      {/* Accessible Skip Intro Control */}
      <button
        ref={skipButtonRef}
        type="button"
        className="intro-skip-btn"
        onClick={handleSkip}
        aria-label="Skip introduction animation and enter website"
      >
        <span>Skip intro</span>
        <ArrowRight size={13} aria-hidden="true" />
      </button>

      {/* Main Animation Stage */}
      <div className="intro-stage">
        {/* Step 1: Original Sevalaya Emblem Fade & Subtle Scale */}
        <div className="intro-emblem-container">
          <img
            src={hospitalData.logoUrl}
            alt="Sevalaya Hospital Original Emblem"
            className="intro-emblem-img"
            onError={handleImageError}
          />
        </div>

        {/* Step 2: Hospital Wordmark Reveal */}
        <div className="intro-wordmark">
          <h1 className="intro-title">{hospitalData.name}</h1>
          <div className="intro-hindi-title">{hospitalData.hindiName}</div>

          {/* Step 3: Restrained Sevalaya-Red Horizontal Expansion Line */}
          <div className="intro-red-line" aria-hidden="true" />

          {/* Step 4: Medical Subtitle */}
          <div className="intro-subtitle">{hospitalData.tagline}</div>
        </div>
      </div>
    </div>
  );
}
