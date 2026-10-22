import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const AVAILABLE_LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'hi', label: 'हिन्दी', shortLabel: 'हि' },
  { code: 'nag', label: 'नागपुरी', shortLabel: 'नाग' }
];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('sevalaya_lang');
      if (saved === 'en' || saved === 'hi' || saved === 'nag') {
        return saved;
      }
    } catch {
      // Storage unavailable
    }
    return 'en';
  });

  const setLanguage = (langCode) => {
    if (langCode === 'en' || langCode === 'hi' || langCode === 'nag') {
      setLanguageState(langCode);
      try {
        localStorage.setItem('sevalaya_lang', langCode);
      } catch {
        // Storage unavailable
      }
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language === 'nag' ? 'hi-IN' : language);
  }, [language]);

  const t = (key, fallback = '') => {
    const currentDict = translations[language] || translations.en;
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key];
    }
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages: AVAILABLE_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
