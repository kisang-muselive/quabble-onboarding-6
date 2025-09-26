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
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen text-gray-800 relative overflow-y-auto screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#FAF9F2',
          paddingTop: '60px',
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
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container mt-9">
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            Have you been experiencing<br />any of these?
          </h1>
          
          <p className="subtitle-text" style={{ 
            color: '#7B7968',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '8px',
            fontWeight: 'normal'
          }}>
            Choose all that apply
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
            <span className="text-left leading-relaxed">I've noticed myself getting easily annoyed or irritable</span>
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
            <span className="text-left leading-relaxed">I've had a sense that something bad might happen, even without a clear reason</span>
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
            <span className="text-left leading-relaxed">I've felt unable to control my worrying</span>
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
            <span className="text-left leading-relaxed">I've avoided certain situations because they make me too nervous</span>
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
            <span className="text-left leading-relaxed">I haven't noticed these symptoms</span>
          </button>
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
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal touch-target cta-orange-button cta-button"
              style={{ 
                backgroundColor: '#F28C39',
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
                  onClick={() => {
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
