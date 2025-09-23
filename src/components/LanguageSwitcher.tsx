import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguage, getLanguageName } from '../utils/language';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const languages: SupportedLanguage[] = ['en', 'kr', 'ja'];
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === lang
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getLanguageName(lang)}
          </button>
        ))}
      </div>
    </div>
  );
}