import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface DealingWithProps {
  onBack: () => void;
  onNext: () => void;
  onOptionSelect?: (option: string) => void;
}

export function DealingWith({ onBack, onNext, onOptionSelect }: DealingWithProps) {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const options = [
    'Depression',
    'Anxiety', 
    'Panic attacks',
    'OCD',
    'Bipolar disorder',
    'Eating disorder',
    'PTSD',
    'Something else'
  ];

  const handleOptionClick = (optionIndex: number) => {
    // Toggle functionality - if same option is clicked, deselect it
    if (selectedOption === optionIndex) {
      setSelectedOption(null);
      onOptionSelect?.(null);
    } else {
      setSelectedOption(optionIndex);
      onOptionSelect?.(options[optionIndex]);
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
        style={{ backgroundColor: '#FAF9F2' }}
        style={{ 
          paddingTop: '48px',
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
            {t('dealingWith.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('dealingWith.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          
          <p className="subtitle-text" style={{ 
            color: '#605D4E',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '6px',
            fontWeight: 'normal'
          }}>
            {t('dealingWith.subtitle')}
          </p>
        </div>

        <div className="flex items-center justify-center image-container" style={{ marginTop: '20px' }}>
          <img
            src="/images/dealing-with-duck.png"
            alt="Dealing with duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(35vw, 250px)',
              maxHeight: 'min(28vh, 240px)'
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
            Depression
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
            Anxiety
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
            Panic attacks
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
            OCD
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
            Bipolar disorder
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
            Eating disorder
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
            PTSD
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
            Something else
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
