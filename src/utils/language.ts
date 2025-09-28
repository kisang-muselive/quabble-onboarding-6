export type SupportedLanguage = 'en' | 'kr' | 'ko' | 'ja';

export const getLanguageFromUrl = (): SupportedLanguage => {
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get('language');
  const localization = urlParams.get('localization');

  if (language === 'korean') {
    return 'kr';
  } else if (language === 'japanese') {
    return 'ja';
  }
  
  if (localization) {
    const cleanLocalization = localization.replace(/\/$/, ''); // Remove trailing slash
    if (cleanLocalization === 'ko') {
      return 'kr';
    } else if (cleanLocalization === 'ja') {
      return 'ja';
    }
    return 'en';
  }
  return 'en';
};

export const getLanguageFromUrlForQuestionsRequest = (): SupportedLanguage => {
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get('language');
  const localization = urlParams.get('localization') as SupportedLanguage;

  if (language === 'korean') {
    return 'ko';
  } else if (language === 'japanese') {
    return 'ja';
  }

  if (localization) {
    const cleanLocalization = localization.replace(/\/$/, ''); // Remove trailing slash
    if (cleanLocalization === 'ko') {
      return 'ko';
    } else if (cleanLocalization === 'ja') {
      return 'ja';
    }
    return 'en';
  }
  
  return 'en';
};

export const updateUrlLanguage = (language: SupportedLanguage) => {
  const url = new URL(window.location.href);
  url.searchParams.set('language', language);
  window.history.replaceState({}, '', url.toString());
};

export const getLanguageName = (language: SupportedLanguage): string => {
  switch (language) {
    case 'en': return 'English';
    case 'kr': return '한국어';
    case 'ja': return '日本語';
    default: return 'English';
  }
};