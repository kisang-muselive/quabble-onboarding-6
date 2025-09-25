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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const [tempTime, setTempTime] = useState({ hour: '09', minute: '00', period: 'PM' });
  
  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });
  }, []);

  const handleTimePickerClick = () => {
    setTempTime(selectedTime);
    setIsBottomSheetOpen(true);
    setIsClosing(false);
    // 다음 프레임에서 백드롭을 보이게 함
    requestAnimationFrame(() => {
      setIsBackdropVisible(true);
    });
  };

  const closeBottomSheet = () => {
    setIsClosing(true);
    setIsBackdropVisible(false);
    setTimeout(() => {
      setIsBottomSheetOpen(false);
      setIsClosing(false);
      setIsBackdropVisible(false); // 확실히 초기화
    }, 300); // 애니메이션 시간과 동일
  };

  const handleSaveTime = () => {
    setSelectedTime(tempTime);
    closeBottomSheet();
  };

  const handleCancel = () => {
    setTempTime(selectedTime);
    closeBottomSheet();
  };

  const togglePeriod = () => {
    setTempTime({ 
      ...tempTime, 
      period: tempTime.period === 'AM' ? 'PM' : 'AM' 
    });
  };

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
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
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
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center indicator-container"
          style={{ 
            gap: '4px'
          }}
        >
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
              maxWidth: 'min(70vw, 300px)',
              maxHeight: 'min(40vh, 300px)'
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container">
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#FFFFFF',
            fontSize: 'min(6.5vw, 2rem)'
          }}>
            When do you<br />usually go to bed?
          </h1>
        </div>

        {/* Time Picker Component */}
        <div className="flex flex-col items-center mt-8 time-picker-container">
          <button
            onClick={handleTimePickerClick}
            className="bg-white px-8 py-4 flex items-center justify-center space-x-2 cursor-pointer transition-opacity hover:opacity-80"
            style={{
              borderRadius: '24px',
              minWidth: '160px'
            }}
          >
            <span className="text-black text-2xl font-medium">
              {selectedTime.hour}:{selectedTime.minute} {selectedTime.period}
            </span>
          </button>
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

      {/* Bottom Sheet for Time Picker */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-[100] flex items-end">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black ${
              isClosing ? 'animate-fade-out' : 'animate-fade-in'
            }`}
            onClick={handleCancel}
            style={{
              opacity: isClosing ? 0 : 0.5
            }}
          />
          
          {/* Bottom Sheet */}
          <div 
            className={`relative w-full bg-white transform transition-transform duration-300 ease-out ${
              isClosing ? 'animate-slide-down' : 'animate-slide-up'
            }`} 
            style={{ 
              borderTopLeftRadius: '48px', 
              borderTopRightRadius: '48px'
            }}
          >
            {/* Time Selection Area */}
            <div className="px-9 pt-9 pb-4">
              <h3 className="text-2xl font-medium text-black text-center mb-5">Select Time</h3>
              
              {/* Time Display */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div 
                  className="px-5 py-2.5 rounded-2xl flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('hour-input')?.focus()}
                  style={{
                    backgroundColor: '#F3F1E5'
                  }}
                >
                  <span className="text-3xl font-medium" style={{ color: '#000000' }}>{tempTime.hour}</span>
                </div>
                
                <span className="text-3xl font-medium" style={{ color: '#000000' }}>:</span>
                
                <div 
                  className="px-5 py-2.5 rounded-2xl flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('minute-input')?.focus()}
                  style={{
                    backgroundColor: '#F3F1E5'
                  }}
                >
                  <span className="text-3xl font-medium" style={{ color: '#000000' }}>{tempTime.minute}</span>
                </div>
                
                <button 
                  onClick={togglePeriod}
                  className="px-5 py-2.5 rounded-2xl flex items-center justify-center cursor-pointer transition-colors"
                  style={{
                    backgroundColor: '#F3F1E5'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8E6DA'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F3F1E5'}
                >
                  <span className="text-3xl font-medium" style={{ color: '#000000' }}>{tempTime.period}</span>
                </button>
              </div>
              
              {/* Done Button */}
              <button
                onClick={handleSaveTime}
                className="w-full py-4 rounded-full text-white text-center font-medium text-lg mb-4"
                style={{ 
                  backgroundColor: '#F28C39'
                }}
              >
                Done
              </button>
            </div>
            
            {/* Hidden inputs for system keyboard */}
            <input
              id="hour-input"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="absolute -left-full opacity-0"
              value={tempTime.hour}
              onChange={(e) => {
                const value = e.target.value.padStart(2, '0');
                if (parseInt(value) >= 1 && parseInt(value) <= 12) {
                  setTempTime({ ...tempTime, hour: value });
                }
              }}
              style={{}}
            />
            <input
              id="minute-input"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="absolute -left-full opacity-0"
              value={tempTime.minute}
              onChange={(e) => {
                const value = e.target.value.padStart(2, '0');
                if (parseInt(value) >= 0 && parseInt(value) <= 59) {
                  setTempTime({ ...tempTime, minute: value });
                }
              }}
              style={{}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
