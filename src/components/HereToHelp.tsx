import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface HereToHelpProps {
  onBack: () => void;
  onNext: () => void;
}

export function HereToHelp({ onBack, onNext }: HereToHelpProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_here_to_help",
      "eventProperties": {
        "onboarding_version": 6.1
      }
    }));
  }, []);

  return (
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/we-can-help-background.png)'
      }}
    >
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          paddingTop: '56px',
          paddingBottom: '1rem',
          backgroundColor: 'transparent'
        }}
      >
        <button 
          onClick={onBack}
          className="p-2 flex items-center justify-center header-button-area"
          style={{ width: '40px', height: '40px' }}
        >
          <img 
            src="/images/arrow_left.svg" 
            alt="Back" 
            className="w-6 h-6 header-back-icon"
            style={{ 
              width: '24px', 
              height: '24px',
              filter: 'brightness(0) saturate(100%) invert(100%)'
            }}
          />
        </button>
      </div>

      <div className="flex flex-col items-center px-9 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="leading-snug title-text" style={{ 
            color: '#FFFFFF',
            fontSize: 'min(5.5vw, 1.625rem)',
            fontWeight: '400'
          }}>
            {t('hereToHelp.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('hereToHelp.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

      </div>

      {/* Gradient frame above CTA */}
      <div className="fixed left-0 right-0 z-40 gradient-frame" style={{ bottom: 'calc(7.5vh + 36px)', height: '36px' }}>
        <div 
          className="w-full h-full"
          style={{
            background: 'transparent'
          }}
        />
      </div>

      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 z-50 cta-container" style={{ backgroundColor: 'transparent' }}>
        <div className="px-9 pb-9 pl-9 pr-9">
          <div className="max-w-md mx-auto cta-button-wrapper">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center touch-target cta-orange-button cta-button"
              style={{ 
                backgroundColor: '#F28C39',
                fontWeight: '500',
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                sendToFlutter(JSON.stringify({
                  "event": "click_next_quabble_here_to_help",
                  "eventProperties": {
                    "onboarding_version": 6.1
                  }
                }));
                onNext();
              }}
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
