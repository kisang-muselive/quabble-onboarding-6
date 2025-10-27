import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { Question } from '../services/questionsService';

interface HowHaveYouBeenProps {
  onBack: () => void;
  onNext: (selectedOption?: number) => void;
  questionData?: Question;
}

export function HowHaveYouBeen({ onBack, onNext, questionData }: HowHaveYouBeenProps) {
  const { t } = useLanguage();
  const { addSelection } = useSelections();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
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
      "event": "view_ob_survey_how_have_you_been",
      "eventProperties": {
        "onboarding_version": 6.1
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
            {(questionData ? questionData.text : t('howHaveYouBeen.title')).split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < (questionData ? questionData.text : t('howHaveYouBeen.title')).split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center image-container" style={{ marginTop: '16px' }}>
          <img
            src="/images/1-duck.png"
            alt="Duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(45vw, 320px)',
              maxHeight: 'min(35vh, 300px)'
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
            {questionData && questionData.options[0] ? capitalizeFirstLetter(questionData.options[0].text) : t('howHaveYouBeen.option1')}
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
            {questionData && questionData.options[1] ? capitalizeFirstLetter(questionData.options[1].text) : t('howHaveYouBeen.option2')}
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
            {questionData && questionData.options[2] ? capitalizeFirstLetter(questionData.options[2].text) : t('howHaveYouBeen.option3')}
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
                const optionText = questionData && questionData.options[selectedOption!]
                  ? questionData.options[selectedOption!].text
                  : [t('howHaveYouBeen.option1'), t('howHaveYouBeen.option2'), t('howHaveYouBeen.option3')][selectedOption!];
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_survey_how_have_you_been",
                  "eventProperties": {
                    "onboarding_version": 6.1
                  },
                  "userProperties": {
                    "survey_how_have_you_been": optionText || "",
                    "onboarding_version": 6.1
                  }
                }));
                onNext(selectedOption!);
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
