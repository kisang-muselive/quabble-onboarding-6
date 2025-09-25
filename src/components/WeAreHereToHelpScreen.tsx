import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WeAreHereToHelpScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function WeAreHereToHelpScreen({
  onBack,
  onNext
}: WeAreHereToHelpScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_we_are_here_to_help",
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
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* Title */}
        <div className="text-center px-4 mb-8">
          <h1 className="font-normal text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
            We are here to help. Let's work together to improve your mental health.
          </h1>
        </div>
        
        {/* Duck illustration */}
        <div className="flex justify-center mb-8">
          <img 
            src="/images/we-can-help-duck.png" 
            alt="We can help duck" 
            className="object-contain" 
            style={{ maxWidth: '300px', width: '100%', height: 'auto' }}
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
