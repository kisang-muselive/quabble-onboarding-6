import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface TherapistScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function TherapistScreen({
  onBack,
  onNext
}: TherapistScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_therapist_recommended",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <div className="flex flex-col w-full h-screen bg-[#F2EBC0] text-gray-800 relative overflow-hidden">
      {/* Fixed Header - Back button */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col items-center px-5 sm:px-6 mt-6">
        
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center justify-center mb-20 sm:mb-24 text-center max-w-sm">
          <h1 className="font-medium leading-tight mb-4 sm:mb-6" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            {t('therapist.title')}
          </h1>
          <p className="text-base sm:text-lg font-normal leading-relaxed" style={{ color: '#7B7968' }}>
            {t('therapist.subtitle')}
          </p>
        </div>
        
        {/* Duck Image */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/therapist-duck.png"
            alt="Therapist Duck"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(95vw, 600px)',
              maxHeight: 'min(65vh, 550px)'
            }}
          />
        </div>
      </div>
      
      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F2EBC0] z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                onNext();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    
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
        .mb-8 { margin-bottom: 1.5rem; }
        .mb-12 { margin-bottom: 2rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-6 { margin-bottom: 1rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
  </>;
}