import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface AreYouReadyScreenProps {
  onYes: () => void;
  onMaybeLater: () => void;
}

export function AreYouReadyScreen({
  onYes,
  onMaybeLater
}: AreYouReadyScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_ask_routine_set_up",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      {/* Content Container - starts at 5% from top */}
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '5vh' }}>
        
        {/* Duck Image */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 mt-8 sm:mt-12">
          <img
            src="/images/are-you-ready-duck.png"
            alt="Are You Ready Duck"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(90vw, 500px)',
              maxHeight: 'min(60vh, 500px)'
            }}
          />
        </div>
        
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-16 sm:mb-20 text-center max-w-md px-4 sm:px-5">
          <h1 className="font-medium leading-tight" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            {t('areYouReady.title')}
          </h1>
        </div>
      </div>
      
      {/* Buttons Container - Yes button matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
            {/* Yes Button */}
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-orange-400 hover:bg-orange-500 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh',
                fontSize: '2.5vh',
                backgroundColor: '#E67E22'
              }}
              onClick={() => {
                sendToFlutter(JSON.stringify({
                  "event": "heptic",
                }));
                onYes();
              }}
            >
              {t('areYouReady.yesButton')}
            </button>

            {/* Maybe Later Button */}
            <button
              className="text-center font-normal touch-target"
              style={{ 
                color: '#7B7968',
                fontSize: '2.2vh',
                minHeight: '6vh'
              }}
              onClick={() => {
                onMaybeLater();
              }}
            >
              {t('areYouReady.maybeLaterButton')}
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
        .mb-16 { margin-bottom: 3rem; }
        .mb-20 { margin-bottom: 4rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
  </>;
}