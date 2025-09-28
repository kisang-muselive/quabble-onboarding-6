import { useEffect, useRef } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface NinetyEightReportProps {
  onBack: () => void;
  onNext: () => void;
}

export function NinetyEightReport({ onBack, onNext }: NinetyEightReportProps) {
  const { t } = useLanguage();
  const lottieRef = useRef<any>(null);

  const handleLottieClick = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  };
  
  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_help_manage",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#FAF9F2',
          paddingTop: '56px',
          paddingBottom: '1rem'
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
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>

      <div className="flex flex-col items-center px-9 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            {t('ninetyEightReport.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('ninetyEightReport.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center mb-8 image-container" style={{ marginTop: '60px' }}>
          <div 
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: '280px',
              maxHeight: 'min(95vh, 850px)',
              minHeight: '300px',
              cursor: 'pointer'
            }}
            onClick={handleLottieClick}
          >
            <lottie-player
              ref={lottieRef}
              src="/images/98-lottie.json"
              background="transparent"
              speed="1"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '300px',
                maxWidth: '280px',
                pointerEvents: 'none'
              }}
              autoplay
            />
          </div>
        </div>
      </div>

      {/* Gradient frame above CTA */}
      <div className="fixed left-0 right-0 z-40 gradient-frame" style={{ bottom: 'calc(7.5vh + 36px)', height: '36px' }}>
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to top, #FAF9F2 0%, rgba(250, 249, 242, 0) 100%)'
          }}
        />
      </div>

      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 z-50 cta-container" style={{ backgroundColor: '#FAF9F2' }}>
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
                  "event": "click_next_ob_info_quabble_help_manage",
                  "eventProperties": {
                    "onboarding_version": 6.0
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
