import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Theme & Language Switcher Component
 * Supports:
 * 1. Dark & Light mode toggle with Sun/Moon icons.
 * 2. 3-Language switcher: English (EN), Hindi (हि), and Nagpuri (नाग).
 */
export default function ThemeLanguageControls({ isCompact = false }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, setLanguage, availableLanguages, t } = useLanguage();

  return (
    <div
      className={`theme-lang-controls ${isCompact ? 'theme-lang-controls--compact' : ''}`}
      role="region"
      aria-label="Language and theme preferences"
    >
      {/* 1. Language Switcher Pills */}
      <div
        className="lang-switcher"
        role="group"
        aria-label={t('langSelectorLabel', 'Select language')}
      >
        <Globe size={13} className="lang-switcher__icon" aria-hidden="true" />
        {availableLanguages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              className={`lang-btn ${isSelected ? 'lang-btn--active' : ''}`}
              onClick={() => setLanguage(lang.code)}
              aria-pressed={isSelected}
              title={`Switch to ${lang.label}`}
              aria-label={`Switch language to ${lang.label}`}
            >
              <span className="lang-btn__short">{lang.shortLabel}</span>
              {!isCompact && <span className="lang-btn__full"> ({lang.label})</span>}
            </button>
          );
        })}
      </div>

      {/* 2. Dark/Light Mode Toggle Button */}
      <button
        type="button"
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={isDark ? t('themeToggleLight', 'Switch to light mode') : t('themeToggleDark', 'Switch to dark mode')}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <>
            <Sun size={15} aria-hidden="true" />
            <span className="theme-toggle-btn__text">Light</span>
          </>
        ) : (
          <>
            <Moon size={15} aria-hidden="true" />
            <span className="theme-toggle-btn__text">Dark</span>
          </>
        )}
      </button>
    </div>
  );
}
