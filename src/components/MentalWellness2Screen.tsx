import React, { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface MentalWellness2ScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

export function MentalWellness2Screen({
  onNext,
  onSkip
}: MentalWellness2ScreenProps) {

  const [visibleCheckmarks, setVisibleCheckmarks] = useState(0);
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    // Function to be called when the component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_4_1:landing"}');
  }, []); 

  useEffect(() => {
    // Animate checkmarks appearing one by one
    const timer = setTimeout(() => {
      if (visibleCheckmarks < 7) {
        setVisibleCheckmarks(prev => prev + 1);
      }
    }, 200); // 200ms delay between each checkmark

    return () => clearTimeout(timer);
  }, [visibleCheckmarks]);

  return (
    <>
    <div className="flex flex-col w-full min-h-screen bg-[#f8f8f8] text-gray-800 px-4 relative">
      {/* Main content */}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* Duck with book illustration */}
        <div className="relative flex justify-center mb-6 h-80 w-full">
          <img 
            src="/images/10-duck.png" 
            alt="Duck with book" 
            className="object-contain max-w-xs h-full"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 leading-tight mb-4">
            Building small daily habits can make a big difference in your mental health
          </h1>
        </div>

        {/* Days of the week with checkmarks */}
        <div className="flex justify-center items-center space-x-6 mb-12">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 relative">
                {visibleCheckmarks > index && (
                  <svg 
                    className="w-6 h-6 text-green-500 animate-pulse" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pb-8">
        <button
          className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
    </>
  );
}