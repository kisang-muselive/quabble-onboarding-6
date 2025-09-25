import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WhyQuabbleWhatYouNeedProps {
  onBack: () => void;
  onNext: () => void;
}

export function WhyQuabbleWhatYouNeed({ onBack, onNext }: WhyQuabbleWhatYouNeedProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden screen-container">
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 bg-[#F5F0E8] header-container"
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
            {t('whyQuabble.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('whyQuabble.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center mb-8 mt-9 image-container">
          <img
            src="/images/why-quabble-duck.png"
            alt="Why Quabble Duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(120vw, 900px)',
              maxHeight: 'min(95vh, 850px)'
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
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F0E8] z-50 cta-container">
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