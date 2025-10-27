import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface TenMWorkoutCompletedProps {
  onBack: () => void;
  onNext: () => void;
}

export function TenMWorkoutCompleted({ onBack, onNext }: TenMWorkoutCompletedProps) {
  const { t } = useLanguage();
  
  // Check for debug query parameter
  const isDebugMode = new URLSearchParams(window.location.search).get('debug') === 'true';
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_how_many_workout_done",
      "eventProperties": {
        "onboarding_version": 6.1
      }
    }));
  }, []);

  return (
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/10mpark.png)'
      }}
    >
      {/* Header with back button */}
      <div 
        className="flex items-center justify-between px-4 header-container"
        style={{ 
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
        
        {/* Debug button */}
        {isDebugMode && (
          <button
            onClick={onNext}
            className="flex items-center justify-center"
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              color: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            D
          </button>
        )}
      </div>

      <div className="flex flex-col items-center px-9 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(7vw, 2.125rem)'
          }}>
            {t('10mWorkoutCompleted.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('10mWorkoutCompleted.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center mb-8 image-container" style={{ marginTop: '24px' }}>
          <img
            src="/images/7-reviews.png?v=1758862321"
            alt="Reviews"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(45vw, 320px)',
              maxHeight: 'min(35vh, 300px)'
            }}
          />
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
                  "event": "click_next_ob_info_how_many_workout_done",
                  "eventProperties": {
                    "onboarding_version": 6.1
                  }
                }));
                sendToFlutter('{"event":"request-signin"}');
                // Call onNext after 1 second
                setTimeout(() => {
                  onNext();
                }, 1000);
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
