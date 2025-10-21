import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface SorryToHearThatProps {
  onBack: () => void;
  onNext: () => void;
}

export function SorryToHearThat({ onBack, onNext }: SorryToHearThatProps) {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const handleOptionClick = (optionIndex: number) => {
    // Toggle functionality - if same option is clicked, deselect it
    if (selectedOption === optionIndex) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionIndex);
    }
  };
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_what_is_going_on",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen text-gray-800 relative overflow-y-auto screen-container" style={{ backgroundColor: '#FAF9F2' }}>
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

      <div className="flex flex-col items-center px-9 pb-32 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
                 <h1 className="font-medium leading-snug title-text" style={{ 
                   color: '#4C4A3C',
                   fontSize: 'min(5.5vw, 1.625rem)'
                 }}>
            {t('sorryToHearThat.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('sorryToHearThat.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          
          <p className="subtitle-text" style={{ 
            color: '#605D4E',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '6px',
            fontWeight: 'normal'
          }}>
            {t('sorryToHearThat.subtitle')}
          </p>
        </div>

        <div className="flex items-center justify-center image-container" style={{ marginTop: '16px' }}>
          <img
            src="/images/sorry-to-hear-duck.png"
            alt="Sorry to hear duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(60vw, 420px)',
              maxHeight: 'min(45vh, 400px)'
            }}
          />
        </div>

        {/* Option buttons */}
        <div className="flex flex-col w-full option-buttons-container" style={{ gap: '10px', marginTop: '16px' }}>
          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{ 
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 0 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 0 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(0)}
          >
            {t('sorryToHearThat.option1')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 1 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 1 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(1)}
          >
            {t('sorryToHearThat.option2')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 2 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 2 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(2)}
          >
            {t('sorryToHearThat.option3')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 3 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 3 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(3)}
          >
            {t('sorryToHearThat.option4')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 4 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 4 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(4)}
          >
            {t('sorryToHearThat.option5')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 5 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 5 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(5)}
          >
            {t('sorryToHearThat.option6')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 6 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 6 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(6)}
          >
            {t('sorryToHearThat.option7')}
          </button>

          <button
            className="w-full px-6 py-4 bg-white text-center font-medium transition-colors option-button"
            style={{
              fontSize: 'min(4.5vw, 1.125rem)',
              borderRadius: '28px',
              border: `2px solid ${selectedOption === 7 ? '#F28C39' : '#E1E0D3'}`,
              color: selectedOption === 7 ? '#F28C39' : '#4C4A3C'
            }}
            onClick={() => handleOptionClick(7)}
          >
            {t('sorryToHearThat.option8')}
          </button>
        </div>
      </div>

      {/* CTA Container with integrated gradient */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
        style={{
          transform: selectedOption !== null ? 'translateY(0)' : 'translateY(100%)'
        }}
      >
        {/* Gradient frame above CTA */}
        <div 
          className="w-full gradient-frame"
          style={{ 
            height: '36px',
            background: 'linear-gradient(to top, #FAF9F2 0%, rgba(250, 249, 242, 0) 100%)'
          }}
        />
        
        {/* CTA Container */}
        <div 
          className="cta-container"
          style={{
            backgroundColor: '#FAF9F2'
          }}
        >
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
                const options = [
                  'Breakup of relationship stress',
                  'Career or academic pressure', 
                  'Health issues',
                  'Burnout',
                  'Loneliness',
                  'Loss',
                  'Something else',
                  'Nothing specific'
                ];
                const selectedText = selectedOption !== null ? options[selectedOption] : "";
                sendToFlutter(JSON.stringify({
                  "event": "click_next_survey_what_is_going_on",
                  "eventProperties": {
                    "onboarding_version": 6.0
                  },
                  "userProperties": {
                    "survey_what_is_going_on": selectedText,
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
    </div>
  );
}
