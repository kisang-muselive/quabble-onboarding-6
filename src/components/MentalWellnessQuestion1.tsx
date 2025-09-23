import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface MentalWellnessQuestion1Props {
  onBack: () => void;
  onNext: () => void;
}

export function MentalWellnessQuestion1({
  onBack,
  onNext
}: MentalWellnessQuestion1Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Send landing event when component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_8:landing"}');
  }, []);
  
  const options = ['Great', 'Good', 'Not very good', 'Poor'];

  const handleOptionClick = (option: string) => {
    sendToFlutter(JSON.stringify(
      {"event": "heptic"}
    ));
    setSelectedOption(option);
  };

  return (
    <>
      <style>{`
        .scrollable-options::-webkit-scrollbar {
          display: none;
        }
        .touch-target {
          min-height: 48px;
          min-width: 48px;
        }
      `}</style>
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/19-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen px-4">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <button className="p-2 text-white" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1">
          {/* Question text */}
          <div className="text-center mb-16 px-4">
            <h1 className="font-medium text-white leading-tight" style={{ fontSize: '3vh' }}>
              How are you doing<br />
              mentally these days?
            </h1>
          </div>
          </div>

        {/* Options positioned at 58% from top */}
        <div className="fixed left-0 right-0 z-40" style={{ top: '58vh' }}>
          <div className="max-w-md mx-auto px-4">
            <div className="w-3/4 mx-auto">
              {options.map((option, index) => (
                <button
                  key={option}
                  className={`w-full px-6 md:px-5 rounded-full text-center text-lg font-medium transition-colors ${
                    selectedOption === option
                        ? 'bg-[#f2994a] text-white' 
                        : 'bg-white text-black'
                  }`}
                  style={{ 
                    marginBottom: index < options.length - 1 ? '1vh' : '0',
                    height: '6vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button - always visible */}
        <div className="fixed bottom-0 left-0 right-0 z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6">
            <div className="max-w-md mx-auto">
              <button
                className={`w-4/5 mx-auto block px-7 rounded-full text-center font-normal transition-colors shadow-lg touch-target ${
                  selectedOption ? 'bg-black hover:bg-gray-800 text-white' : 'text-white'
                }`}
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh', // 1/40 of viewport height
                  backgroundColor: selectedOption ? undefined : '#BBB8A5'
                }}
                disabled={!selectedOption}
                onClick={onNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 