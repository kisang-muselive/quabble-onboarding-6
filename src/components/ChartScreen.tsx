import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface ChartScreenProps {
  onNext: () => void;
}

export function ChartScreen({
  onNext
}: ChartScreenProps) {

  useEffect(() => {
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_4_2_1:landing"}');
  }, []); 

  return (
    <>
    <div className="flex flex-col w-full min-h-screen bg-[#f8f8f8] text-gray-800 px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-center mt-16 mb-4">
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1">
        {/* Dashboard illustration */}
        <div className="relative flex justify-center w-full" style={{ marginTop: '0.1vh', marginBottom: '2vh', height: '60vh' }}>
          <img 
            src="/images/11-graph.png" 
            alt="Dashboard with charts and analytics" 
            className="w-full max-w-2xl h-auto object-contain" 
            style={{ maxHeight: '60vh' }}
          />
        </div>
        
        {/* Main text */}
        <div className="text-center px-4" style={{ marginBottom: '6vh' }}>
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: '3vh' }}>
            Stay motivated with personal insights to guide your wellness journey!
          </h1>
        </div>
      </div>

      {/* Next Button - same format as MentalWellness1Screen */}
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