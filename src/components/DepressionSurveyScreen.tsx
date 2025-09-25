import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface DepressionSurveyScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DepressionSurveyScreen({
  onBack,
  onNext
}: DepressionSurveyScreenProps) {
  const { t } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    "I've felt tired or low on energy, even after resting",
    "I've lost interest in hobbies or activities I used to enjoy",
    "I've felt down, sad, or hopeless most days",
    "I've found it hard to concentrate or remember things",
    "I haven't noticed these symptoms"
  ];

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_depression_survey",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  const handleOptionClick = (option: string) => {
    sendToFlutter(JSON.stringify({
      "event": "heptic",
    }));
    
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen relative" style={{ backgroundColor: '#faf7f0' }}>
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8 px-4">
        <button className="p-2 text-gray-800" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Title */}
        <div className="text-center mb-9" style={{ paddingLeft: '36px', paddingRight: '36px' }}>
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
            Have you been experiencing<br />any of these?
          </h1>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col items-center" style={{ paddingBottom: '9rem' }}>
          <div className="w-full max-w-md space-y-4">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left font-normal transition-colors flex items-start"
                style={{
                  fontSize: '15px',
                  lineHeight: '1.3',
                  height: 'fit-content',
                  gap: '10px',
                  padding: '0'
                }}
                onClick={() => handleOptionClick(option)}
              >
                <div style={{ marginTop: '4px' }}>
                  <img 
                    src={selectedOptions.includes(option) ? "/images/Check_circle_fill.svg" : "/images/Circle.svg"}
                    alt="Option"
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
                <span 
                  className="flex-1"
                  style={{ 
                    fontSize: '15px',
                    lineHeight: '1.3',
                    color: '#4C4A3C',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                  }}
                >
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Duck image */}
        <div className="absolute bottom-0 left-0" style={{ zIndex: 10, paddingBottom: '20px' }}>
          <img 
            src="/images/pointingduck.png" 
            alt="Pointing duck" 
            style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Next Button */}
      {selectedOptions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6">
            <div className="max-w-md mx-auto">
              <button
                className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                style={{ 
                  height: '7.5vh',
                  fontSize: '2.5vh'
                }}
                onClick={onNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
