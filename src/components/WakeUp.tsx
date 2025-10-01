import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WakeUpProps {
  onBack: () => void;
  onNext: () => void;
}

export function WakeUp({ onBack, onNext }: WakeUpProps) {
  const { t } = useLanguage();
  const [wakeUpTime, setWakeUpTime] = useState('07:30 AM');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState('07');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_wake_up",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));
  }, []);

  const handleOpenTimeModal = () => {
    // Parse current time to set modal defaults
    const [time, period] = wakeUpTime.split(' ');
    const [hours, minutes] = time.split(':');
    setSelectedHour(hours);
    setSelectedMinute(minutes);
    setSelectedPeriod(period);
    setShowTimeModal(true);
  };

  const handleTimeConfirm = () => {
    const newTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    setWakeUpTime(newTime);
    setShowTimeModal(false);
  };


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

        {/* Time button */}
        <div className="w-full max-w-36 time-picker-container" style={{ marginTop: '32px' }}>
          <button
            onClick={handleOpenTimeModal}
            className="w-full bg-white rounded-3xl py-4 px-6 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl font-medium text-gray-800">
              {wakeUpTime}
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
              className="w-full mx-auto block px-7 rounded-full text-white text-center touch-target cta-orange-button cta-button"
              style={{ 
                backgroundColor: '#F28C39',
                fontWeight: '500',
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_survey_wake_up",
                  "eventProperties": {
                    "onboarding_version": 6.0
                  },
                  "userProperties": {
                    "survey_wake_up": wakeUpTime,
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

      {/* Time Selector Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white max-w-sm w-full mx-4 rounded-3xl p-6">
            <div className="flex justify-center items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800">Select Time</h3>
            </div>

            <div className="flex justify-center items-center gap-2 mb-8">
              {/* Hour Selector */}
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                className="text-3xl font-medium bg-gray-100 rounded-2xl p-4 text-center min-w-[80px] border-0 outline-none appearance-none"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                {Array.from({length: 12}, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>

              <span className="text-3xl font-medium text-gray-800 px-2">:</span>

              {/* Minute Selector */}
              <select
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(e.target.value)}
                className="text-3xl font-medium bg-gray-100 rounded-2xl p-4 text-center min-w-[80px] border-0 outline-none appearance-none"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                {Array.from({length: 60}, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>

              {/* AM/PM Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-3xl font-medium bg-gray-100 rounded-2xl p-4 text-center min-w-[80px] border-0 outline-none appearance-none"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* Done Button */}
            <div className="flex justify-center">
              <button
                onClick={handleTimeConfirm}
                className="w-full bg-black text-white rounded-3xl py-4 px-8 text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {t('done')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
