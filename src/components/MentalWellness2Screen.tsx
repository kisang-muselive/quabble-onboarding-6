import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface MentalWellness2ScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

export function MentalWellness2Screen({
  onNext,
  onSkip
}: MentalWellness2ScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_4_2:landing"}');
  }, []); 

  return (
    <>
    <div className="flex flex-col w-full min-h-screen bg-[#f8f8f8] text-gray-800 px-4 relative">
      {/* Main content */}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* Duck illustration */}
        <div className="relative flex justify-center mb-8 h-80 w-full">
          <img 
            src="/images/10-duck.png" 
            alt="Duck with mental wellness illustration" 
            className="w-full max-w-md h-auto max-h-80 object-contain" 
          />
        </div>
        
        {/* Main text */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-2xl font-normal text-gray-800 leading-tight">
            Mental wellness practices help you develop emotional resilience and maintain a positive mindset.
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
