import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { Question } from '../services/questionsService';

interface AgeGroupProps {
  onBack: () => void;
  onNext: () => void;
  questionData?: Question;
}

export function AgeGroup({ onBack, onNext, questionData }: AgeGroupProps) {
  const { t } = useLanguage();
  const { addSelection } = useSelections();
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
      "event": "view_ob_survey_age_group",
      "eventProperties": {
        "onboarding_version": 6.1
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen text-gray-800 relative overflow-y-auto screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header with back button and indicator */}
      <div 
        className="flex items-center justify-between px-4 header-container"
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
        
        {/* 5-segment indicator */}
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
              backgroundColor: '#F28C39'
            }}
          />
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
              backgroundColor: '#F28C39'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#E1E0D3'
            }}
          />
        </div>
        
        {/* Empty div to balance the layout */}
        <div style={{ width: '40px', height: '40px' }} />
      </div>

      <div className="flex flex-col items-center px-9 pb-32 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="font-medium leading-snug title-text" style={{
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            {questionData ? questionData.text : t('ageGroup.title')}
          </h1>
        </div>

        <div className="flex items-center justify-center image-container" style={{ marginTop: '20px' }}>
          <img
            src="/images/2-duck.png"
            alt="Age group duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(35vw, 260px)',
              maxHeight: 'min(30vh, 240px)'
            }}
          />
        </div>

        {/* Option buttons */}
        <div className="flex flex-col w-full option-buttons-container" style={{ gap: '10px', marginTop: '20px' }}>
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
            {questionData && questionData.options[0] ? questionData.options[0].text : t('ageGroup.option1')}
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
            {questionData && questionData.options[1] ? questionData.options[1].text : t('ageGroup.option2')}
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
            {questionData && questionData.options[2] ? questionData.options[2].text : t('ageGroup.option3')}
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
            {questionData && questionData.options[3] ? questionData.options[3].text : t('ageGroup.option4')}
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
            {questionData && questionData.options[4] ? questionData.options[4].text : t('ageGroup.option5')}
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
                // Add selection to context if we have question data
                if (questionData && selectedOption !== null) {
                  const selectedOptionId = questionData.options[selectedOption]?.id;
                  if (selectedOptionId) {
                    addSelection(selectedOptionId);
                  }
                }
                const ageText = questionData && selectedOption !== null && questionData.options[selectedOption]
                  ? questionData.options[selectedOption].text
                  : [t('ageGroup.option1'), t('ageGroup.option2'), t('ageGroup.option3'), t('ageGroup.option4'), t('ageGroup.option5')][selectedOption!];
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_survey_age_group",
                  "eventProperties": {
                    "onboarding_version": 6.1
                  },
                  "userProperties": {
                    "survey_age_group": ageText || "",
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
    </div>
  );
}
