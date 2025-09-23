import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface DuckWithJarScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

export function DuckWithJarScreen({
  onNext,
  onSkip
}: DuckWithJarScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_how_many_workout_done",
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
        backgroundImage: 'url(/images/8-background.jpg)'
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center mt-32 mb-3 text-center">
        <h1 className="text-5xl font-medium text-black">
          {t('duckWithJar.title')}
        </h1>
        <h2 className="text-xl font-medium text-black mt-2">
          {t('duckWithJar.subtitle')}
        </h2>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* <div className="relative flex justify-center mb-8 h-64 w-full">
          <img 
            src="/images/8-duck.png" 
            alt="Quabble duck mascot" 
            className="w-full max-w-sm h-auto max-h-64 object-contain drop-shadow-lg" 
          />
        </div> */}
        

      </div>

      {/* Next Button - same format as FocusScreen */}
      <div className="fixed bottom-0 left-0 right-0 z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
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
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
    `}</style>
    </>
  );
} 