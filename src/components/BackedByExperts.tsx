import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface BackedByExpertsProps {
  onBack: () => void;
  onNext: () => void;
}

export function BackedByExperts({ onBack, onNext }: BackedByExpertsProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ backgroundColor: '#FAF9F2' }}
        style={{ 
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
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
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container mt-9">
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            Quabble is recommended by therapists and backed by experts
          </h1>
          
          <p className="subtitle-text" style={{ 
            color: '#7B7968',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '16px',
            fontWeight: 'normal',
            lineHeight: '1.4',
            mixBlendMode: 'multiply'
          }}>
            Quabble brings real wellness practices to daily life—backed by experts like our advisor, Dr. Jung Kim, Assist. Professor of Psychiatry at Harvard Medical School
          </p>
        </div>

        <div className="flex items-center justify-center mb-8 mt-9 image-container">
          <img
            src="/images/therapist-duck.png"
            alt="Therapist Duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(70vw, 300px)',
              maxHeight: 'min(60vh, 300px)'
            }}
          />
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
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal touch-target cta-orange-button cta-button"
              style={{ 
                backgroundColor: '#F28C39',
                height: '7.5vh',
                fontSize: '2.5vh'
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
  );
}
