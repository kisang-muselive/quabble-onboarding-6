import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WakeUpProps {
  onBack: () => void;
  onNext: () => void;
}

export function WakeUp({ onBack, onNext }: WakeUpProps) {
  const { t } = useLanguage();
  const [selectedTime, setSelectedTime] = useState({ hour: '09', minute: '00', period: 'AM' });
  
  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });
  }, []);


  return (
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container"
      style={{
        backgroundImage: 'url(/images/17-background.png)',
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
            src="/images/16-duck.png"
            alt="Wake Up Duck"
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
            When do you<br />usually wake up?
          </h1>
        </div>

        {/* Native Time Picker Component */}
        <div className="flex flex-col items-center mt-8 time-picker-container">
          {/* Time Display Button */}
          <div 
            className="bg-white text-black text-xl font-medium cursor-pointer"
            style={{
              borderRadius: '24px',
              width: 'fit-content',
              height: 'fit-content',
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              paddingTop: '16px',
              paddingBottom: '16px',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
            onClick={() => {
              // 숨겨진 input을 클릭하여 네이티브 시간 선택기 열기
              const timeInput = document.getElementById('time-input') as HTMLInputElement;
              if (timeInput) {
                timeInput.focus();
                timeInput.click();
              }
            }}
          >
            {selectedTime.hour}:{selectedTime.minute} {selectedTime.period}
          </div>
          
          {/* Hidden Native Time Input */}
          <input
            id="time-input"
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
            style={{ opacity: 0, position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}
          />
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
