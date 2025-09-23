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
      {/* Header */}
      <div className="flex items-center justify-end mt-16 mb-4">
        {onSkip && (
          <button className="p-2 text-gray-500 font-medium" onClick={onSkip}>
            Skip
        </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1">
        {/* Duck with circular arrow illustration */}
        <div className="relative flex justify-center mb-6 h-80 w-full">
          <img 
            src="/images/10-duck.png" 
            alt="Duck with circular arrow" 
            className="w-full max-w-md h-auto max-h-80 object-contain" 
          />
        </div>
        
        {/* Main text */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-2xl font-normal text-[#f2994a] leading-tight">
            98% of regular users find Quabble helpful for managing their mental health
          </h1>
        </div>

        {/* Checkmarks for 7 days */}
        <div className="flex justify-center gap-1 mb-16">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-[#f2994a] flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button - same format as FocusScreen */}
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