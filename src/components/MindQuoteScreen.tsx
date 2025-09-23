import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface MindQuoteScreenProps {
  onNext: () => void;
}

export function MindQuoteScreen({
  onNext
}: MindQuoteScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_healthy_mind",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return (
    <>
    <div 
      className="flex flex-col w-full min-h-screen text-gray-800 px-4 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/mind-quote-background.png)'
      }}
    >
      {/* Title positioned at the top */}
      <div className="flex flex-col items-center justify-start mt-32 mb-8 text-center px-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-center leading-tight" style={{ color: '#4C4A3C' }}>
          "{t('mindQuote.quote').split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < t('mindQuote.quote').split('\n').length - 1 && <br />}
            </span>
          ))}"
        </h1>
      </div>

      {/* Main content spacer */}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* This space can be used for additional content if needed */}
      </div>

      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={() => {
                onNext();
              }}
            >
              {t('next')}
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
    </>
  );
}