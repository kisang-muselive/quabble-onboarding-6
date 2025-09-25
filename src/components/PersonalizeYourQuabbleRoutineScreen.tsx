import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface PersonalizeYourQuabbleRoutineScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function PersonalizeYourQuabbleRoutineScreen({
  onBack,
  onNext
}: PersonalizeYourQuabbleRoutineScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_personalize_routine",
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
          <p className="font-normal leading-tight" style={{ fontSize: 'min(5vw, 1.5rem)', color: '#F28C39', marginBottom: '10px' }}>
            You're doing great. Final step!
          </p>
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
            Let's personalize your Quabble routine to improve your mental health with us. The setup will be quick.
          </h1>
        </div>
        
        {/* Duck illustration */}
        <div className="flex justify-center" style={{ marginTop: '60px' }}>
          <img 
            src="/images/reportduck.png" 
            alt="Report duck" 
            className="object-contain" 
            style={{ maxWidth: '275px', width: '100%', height: 'auto', paddingLeft: '36px', paddingRight: '36px' }}
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
