import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface SorryToHearScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function SorryToHearScreen({
  onBack,
  onNext,
  onSkip
}: SorryToHearScreenProps) {
  const { t } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    "Depression",
    "Anxiety", 
    "Panic attacks",
    "OCD",
    "Bipolar disorder",
    "Eating disorder",
    "PTSD",
    "Something else"
  ];

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_sorry_to_hear",
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
        {onBack && (
          <button className="p-2 text-gray-800" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Title */}
        <div className="text-center mb-8 px-4">
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
            What have you been<br />dealing with?
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontSize: 'min(4vw, 1rem)' }}>
            Choose the one that affects you most
          </p>
        </div>

        {/* Duck illustration */}
        <div className="flex justify-center mb-8">
          <img 
            src="/images/sorry-to-hear-duck.png" 
            alt="Sorry to hear duck" 
            className="object-contain" 
            style={{ maxWidth: '300px', width: '100%', height: 'auto' }}
          />
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col items-center px-4" style={{ paddingBottom: '9rem' }}>
          <div className="w-full max-w-md space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 rounded-lg border text-left font-normal transition-colors ${
                  selectedOptions.includes(option)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
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
