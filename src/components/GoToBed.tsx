import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface GoToBedProps {
  onBack: () => void;
  onNext: () => void;
}

export function GoToBed({ onBack, onNext }: GoToBedProps) {
  const { t } = useLanguage();
  const [selectedTime, setSelectedTime] = useState({ hour: '09', minute: '00', period: 'PM' });
  
  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_just_what_you_need",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);


  return (
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container"
      style={{
        backgroundImage: 'url(/images/18-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header with back button and indicator */}
      <div 
        className="flex items-center justify-between px-4 header-container relative"
        style={{ 
          paddingTop: '56px',
          paddingBottom: '1rem'
        }}
      >
        <button 
          onClick={onBack}
          className="p-2 flex items-center justify-center header-button-area"
          style={{ 
            width: '40px', 
            height: '40px'
          }}
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
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center indicator-container" style={{ gap: '4px' }}>
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#F28C39'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}
          />
        </div>
        
        {/* Empty div to balance the layout */}
        <div style={{ 
          width: '40px', 
          height: '40px'
        }} />
      </div>

      <div className="flex flex-col items-center px-9 main-content">
        <div className="flex items-center justify-center mt-9 image-container">
          <img
            src="/images/sleepingduck.png"
            alt="Go To Bed Duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(60vw, 240px)',
              maxHeight: 'min(35vh, 240px)'
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '4px' }}>
          <h1 className="leading-snug title-text" style={{ 
            color: '#FFFFFF',
            fontSize: 'min(6.5vw, 2rem)',
            fontWeight: '500'
          }}>
            When do you<br />usually go to bed?
          </h1>
        </div>

        {/* Native Time Picker Component */}
        <div className="flex flex-col items-center mt-8 time-picker-container">
          {/* Native Time Input with Custom Styling */}
          <div className="relative">
            <input
              type="time"
              value={(() => {
                // 12시간 형식을 24시간 형식으로 변환
                const hour12 = parseInt(selectedTime.hour);
                let hour24;
                if (selectedTime.period === 'AM') {
                  hour24 = hour12 === 12 ? 0 : hour12;
                } else {
                  hour24 = hour12 === 12 ? 12 : hour12 + 12;
                }
                return `${hour24.toString().padStart(2, '0')}:${selectedTime.minute}`;
              })()}
              onChange={(e) => {
                const [hour24, minute] = e.target.value.split(':');
                const hour12 = parseInt(hour24) === 0 ? 12 : parseInt(hour24) > 12 ? parseInt(hour24) - 12 : parseInt(hour24);
                const period = parseInt(hour24) >= 12 ? 'PM' : 'AM';
                
                setSelectedTime({
                  hour: hour12.toString().padStart(2, '0'),
                  minute: minute,
                  period: period
                });
              }}
              className="bg-white text-black font-medium cursor-pointer"
              style={{
                borderRadius: '24px',
                width: 'fit-content',
                height: 'fit-content',
                border: 'none',
                outline: 'none',
                textAlign: 'center',
                fontSize: 'min(5vw, 1.25rem)',
                paddingTop: 'min(4vw, 16px)',
                paddingBottom: 'min(4vw, 16px)',
                paddingLeft: 'min(6vw, 24px)',
                paddingRight: 'min(6vw, 24px)',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                position: 'relative',
                zIndex: 1
              }}
              onFocus={(e) => {
                // 모바일에서 바텀시트 형태로 나타나도록 스크롤 조정
                if (window.innerWidth <= 768) {
                  setTimeout(() => {
                    e.target.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'center',
                      inline: 'center' 
                    });
                  }, 100);
                }
              }}
            />
            {/* Custom Display Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white text-black font-medium"
              style={{
                borderRadius: '24px',
                fontSize: 'min(5vw, 1.25rem)'
              }}
            >
              {selectedTime.hour}:{selectedTime.minute} {selectedTime.period}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient frame above CTA */}
      <div className="fixed left-0 right-0 z-40 gradient-frame" style={{ 
        bottom: 'calc(7.5vh + 36px)', 
        height: '36px'
      }}>
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
