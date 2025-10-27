import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface AnxietySurvey1Props {
  onBack: () => void;
  onNext: (selectedOption?: number) => void;
}

export function AnxietySurvey1({ onBack, onNext }: AnxietySurvey1Props) {
  const { t } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const handleOptionClick = (optionIndex: number) => {
    // Toggle functionality for multiple selections
    if (selectedOptions.includes(optionIndex)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionIndex));
    } else {
      setSelectedOptions([...selectedOptions, optionIndex]);
    }
  };
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_anxiety_experience",
      "eventProperties": {
        "onboarding_version": 6.1
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
            {t('anxietySurvey1.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('anxietySurvey1.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          
          <p className="subtitle-text" style={{ 
            color: '#7B7968',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '8px',
            fontWeight: 'normal'
          }}>
            {t('anxietySurvey1.subtitle')}
          </p>
        </div>


        {/* Option buttons */}
        <div className="flex flex-col items-center w-full option-buttons-container" style={{ gap: '16px', marginTop: '36px' }}>
          <button
            className="w-full bg-transparent text-left font-normal transition-colors option-button flex items-start"
            style={{ 
              fontSize: 'min(4.5vw, 1.125rem)',
              color: selectedOptions.includes(0) ? '#F28C39' : '#4C4A3C',
              border: 'none',
              maxWidth: '480px'
            }}
            onClick={() => handleOptionClick(0)}
          >
            <img
              src={selectedOptions.includes(0) ? "/images/Check_circle_fill.svg" : "/images/Circle.svg"}
              alt="Option"
              className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
              style={{ width: '24px', height: '24px' }}
            />
            <span className="text-left leading-relaxed">{t('anxietySurvey1.option1')}</span>
          </button>
          
          <button
            className="w-full bg-transparent text-left font-normal transition-colors option-button flex items-start"
            style={{ 
              fontSize: 'min(4.5vw, 1.125rem)',
              color: selectedOptions.includes(1) ? '#F28C39' : '#4C4A3C',
              border: 'none',
              maxWidth: '480px'
            }}
            onClick={() => handleOptionClick(1)}
          >
            <img
              src={selectedOptions.includes(1) ? "/images/Check_circle_fill.svg" : "/images/Circle.svg"}
              alt="Option"
              className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
              style={{ width: '24px', height: '24px' }}
            />
            <span className="text-left leading-relaxed">{t('anxietySurvey1.option2')}</span>
          </button>
          
          <button
            className="w-full bg-transparent text-left font-normal transition-colors option-button flex items-start"
            style={{ 
              fontSize: 'min(4.5vw, 1.125rem)',
              color: selectedOptions.includes(2) ? '#F28C39' : '#4C4A3C',
              border: 'none',
              maxWidth: '480px'
            }}
            onClick={() => handleOptionClick(2)}
          >
            <img
              src={selectedOptions.includes(2) ? "/images/Check_circle_fill.svg" : "/images/Circle.svg"}
              alt="Option"
              className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
              style={{ width: '24px', height: '24px' }}
            />
            <span className="text-left leading-relaxed">{t('anxietySurvey1.option3')}</span>
          </button>
          
          <button
            className="w-full bg-transparent text-left font-normal transition-colors option-button flex items-start"
            style={{ 
              fontSize: 'min(4.5vw, 1.125rem)',
              color: selectedOptions.includes(3) ? '#F28C39' : '#4C4A3C',
              border: 'none',
              maxWidth: '480px'
            }}
            onClick={() => handleOptionClick(3)}
          >
            <img
              src={selectedOptions.includes(3) ? "/images/Check_circle_fill.svg" : "/images/Circle.svg"}
              alt="Option"
              className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
              style={{ width: '24px', height: '24px' }}
            />
            <span className="text-left leading-relaxed">{t('anxietySurvey1.option4')}</span>
          </button>
          
          <button
            className="w-full bg-transparent text-left font-normal transition-colors option-button flex items-start"
            style={{ 
              fontSize: 'min(4.5vw, 1.125rem)',
              color: selectedOptions.includes(4) ? '#F28C39' : '#4C4A3C',
              border: 'none',
              maxWidth: '480px'
            }}
            onClick={() => handleOptionClick(4)}
          >
            <img
              src={selectedOptions.includes(4) ? "/images/Check_circle_fill.svg" : "/images/Circle.svg"}
              alt="Option"
              className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
              style={{ width: '24px', height: '24px' }}
            />
            <span className="text-left leading-relaxed">{t('anxietySurvey1.option5')}</span>
          </button>
        </div>
        
        {/* Pointing Duck Image */}
        <div style={{ 
          marginTop: '30px',
          marginLeft: '-36px',  // 상위 컨테이너 px-9 (36px) 패딩 무시
          width: 'calc(100% + 36px)'  // 왼쪽 마진만큼 너비 증가
        }}>
          <img
            src="/images/pointingduck.png"
            alt="Pointing Duck"
            className="h-auto object-contain"
            style={{ 
              maxHeight: '200px',
              display: 'block'
            }}
          />
        </div>
      </div>


      {/* CTA Container with integrated gradient */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
        style={{
          transform: selectedOptions.length > 0 ? 'translateY(0)' : 'translateY(100%)'
        }}
      >
        {/* Gradient frame above CTA */}
        <div 
          className="w-full gradient-frame"
          style={{ 
            height: '36px',
            background: 'transparent'
          }}
        />
        
        {/* CTA Container */}
        <div 
          className="cta-container"
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
                      "I've noticed myself getting easily annoyed or irritable",
                      "I've had a sense that something bad might happen, even without a clear reason",
                      "I've felt unable to control my worrying",
                      "I've avoided certain situations because they make me too nervous",
                      "I haven't noticed these symptoms"
                    ];
                    const selectedTexts = selectedOptions.map(i => options[i]).join(', ');
                    sendToFlutter(JSON.stringify({
                      "event": "click_next_ob_survey_anxiety_experience",
                      "eventProperties": {
                        "onboarding_version": 6.1
                      },
                      "userProperties": {
                        "survey_anxiety_experience": selectedTexts || "",
                        "onboarding_version": 6.1
                      }
                    }));
                    onNext(selectedOptions[0]);
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
