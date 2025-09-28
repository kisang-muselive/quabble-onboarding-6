import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { useMetadata } from '../contexts/MetadataContext';
import { Question } from '../services/questionsService';

interface SupportSystemProps {
  onBack: () => void;
  onNext: () => void;
  questionData?: Question;
}

export function SupportSystem({ onBack, onNext, questionData }: SupportSystemProps) {
  const { t } = useLanguage();
  const { setSupportSystemId, addSelection } = useSelections();
  const { metadata, fetchMetadata } = useMetadata();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Get support system metadata from context or use defaults
  // IDs: 23=Excellent, 24=Good, 25=Limited, 26=Poor
  const supportSystems = metadata?.supportSystem || [
    { id: 23, type: "supportsystem", name: "excellent", displayName: "Excellent" },
    { id: 24, type: "supportsystem", name: "good", displayName: "Good" },
    { id: 25, type: "supportsystem", name: "limited", displayName: "Limited" },
    { id: 26, type: "supportsystem", name: "poor", displayName: "Poor" }
  ];
  
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
      "event": "view_ob_survey_support_system",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));
    
    // Fetch metadata if not already available
    if (!metadata) {
      fetchMetadata();
    }
  }, [metadata, fetchMetadata]);

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
              backgroundColor: '#E1E0D3'
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
            How strong is your<br />support system?
          </h1>
          
          <p className="subtitle-text" style={{ 
            color: '#605D4E',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '6px',
            fontWeight: 'normal'
          }}>
            Family, friends, teachers, peers, etc.
          </p>
        </div>

        <div className="flex items-center justify-center image-container">
          <img
            src="/images/supportingduck.png"
            alt="Supporting duck"
            className="w-full h-auto object-contain main-image"
            style={{ 
              maxWidth: 'min(55vw, 380px)',
              maxHeight: 'min(40vh, 360px)'
            }}
          />
        </div>

        {/* Option buttons */}
        <div className="flex flex-col w-full option-buttons-container" style={{ gap: '10px' }}>
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
            Excellent
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
            Good
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
            Limited
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
            Poor
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
                // Save selected support system ID to context
                if (selectedOption !== null) {
                  // If we have question data, use the new selection approach
                  if (questionData) {
                    const optionId = questionData.options[selectedOption]?.id;
                    if (optionId) {
                      addSelection(optionId);
                    }
                  } else {
                    // Use the support system ID approach for backward compatibility
                    // Map option index to support system ID
                    // 0=Excellent(23), 1=Good(24), 2=Limited(25), 3=Poor(26)
                    const supportSystemId = supportSystems[selectedOption].id;
                    setSupportSystemId(supportSystemId);
                    console.log('Selected support system ID:', supportSystemId);
                  }
                }
                const selectedSupportText = selectedOption !== null ? supportSystems[selectedOption].name : "";
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_survey_support_system",
                  "eventProperties": {
                    "onboarding_version": 6.0
                  },
                  "userProperties": {
                    "survey_support_system": selectedSupportText,
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
