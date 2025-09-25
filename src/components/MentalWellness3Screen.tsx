import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface MentalWellness3ScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
}

export function MentalWellness3Screen({
  onBack,
  onNext,
  onSkip
}: MentalWellness3ScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_4_3:landing"}');
  }, []); 

  return (
    <>
    <div className="flex flex-col w-full min-h-screen bg-[#f8f8f8] text-gray-800 px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-4">
        <button className="p-2 text-gray-500" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {onSkip && (
          <button className="p-2 text-gray-500 font-medium" onClick={onSkip}>
            Skip
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* Duck illustration */}
        <div className="relative flex justify-center mb-8 h-80 w-full">
          <img 
            src="/images/11-graph.png" 
            alt="Mental wellness graph illustration" 
            className="w-full max-w-md h-auto max-h-80 object-contain" 
          />
        </div>
        
        {/* Main text */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-2xl font-normal text-gray-800 leading-tight">
            Studies show that people who practice mental wellness regularly experience improved mood and reduced stress.
          </h1>
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
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
    `}</style>
    </>
  );
}