import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface ConfirmationScreenProps {
  onBack: () => void;
  onNext: () => void;
}
export function ConfirmationScreen({
  onBack,
  onNext
}: ConfirmationScreenProps) {
  const { t } = useLanguage();
  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_welcome",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
      
      @media (max-width: 375px) {
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
      }
      
      @media (max-height: 667px) {
        .space-y-3 > * + * { margin-top: 0.5rem; }
        .space-y-4 > * + * { margin-top: 0.75rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-5 { margin-bottom: 1rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
    <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] text-gray-800 relative">
      {/* Header - same position as WhereDidYouHearAboutUs */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col items-center flex-1 px-8" style={{ paddingBottom: '16rem', paddingTop: '12vh' }}>
        {/* Large circular orange section - responsive size */}
        <div className="relative mb-12" style={{ width: 'min(90vw, 30rem)', height: 'min(90vw, 30rem)' }}>
          {/* Outer light orange circle */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-40"></div>
          
          {/* Inner orange circle with text */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center p-8" style={{ width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}>
            <div className="text-center">
              <p className="text-white text-3xl sm:text-3xl font-medium leading-relaxed">
                {t('confirmation.welcomeMessage').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t('confirmation.welcomeMessage').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={onNext}
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
}