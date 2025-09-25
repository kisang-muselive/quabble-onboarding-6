import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface DepressionSurvey1ScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DepressionSurvey1Screen({
  onBack,
  onNext
}: DepressionSurvey1ScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_depression_survey_1",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen px-4 relative" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        <button className="p-2 text-gray-800" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1 justify-center" style={{ paddingBottom: '12vh' }}>
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)', marginBottom: '20px' }}>
            Depression doesn't just affect your mood. It can also change your sleep, energy, and focus
          </h1>
          <h2 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
            They're your body's<br />reaction that you cannot<br />simply switch off
          </h2>
        </div>
        
        {/* Duck illustration */}
        <div className="flex justify-center" style={{ marginTop: '60px' }}>
          <img 
            src="/images/explainingduck.png" 
            alt="Explaining duck" 
            className="object-contain" 
            style={{ maxWidth: '275px', width: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Next Button */}
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
    </div>
  );
}
