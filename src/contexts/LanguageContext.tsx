import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../utils/translations';

type Language = 'en' | 'ko' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check URL parameter first, then localStorage, then default to English
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const localizationParam = urlParams.get('localization');

      if (localizationParam && ['en', 'ko', 'ja'].includes(localizationParam)) {
        setLanguage(localizationParam as Language);
        localStorage.setItem('quabble-language', localizationParam);
        console.log('Language set from URL parameter:', localizationParam);
      } else {
        const savedLanguage = localStorage.getItem('quabble-language') as Language;
        if (savedLanguage && ['en', 'ko', 'ja'].includes(savedLanguage)) {
          setLanguage(savedLanguage);
          console.log('Language set from localStorage:', savedLanguage);
        } else {
          console.log('Using default language: en');
        }
      }
    } catch (error) {
      console.warn('Failed to access localStorage or URL params:', error);
      // Default to English if localStorage is not available
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('quabble-language', lang);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  };
  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof (typeof translations)[Language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}