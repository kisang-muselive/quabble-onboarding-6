import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface DuckNamingScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
}

export function DuckNamingScreen({
  onBack,
  onNext,
  onSkip
}: DuckNamingScreenProps) {
  const [duckName, setDuckName] = useState('Waddles');
  const [showInputOverlay, setShowInputOverlay] = useState(false);
  const [tempDuckName, setTempDuckName] = useState('Waddles');

  useEffect(() => {
    // Send landing event when component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_3:landing"}');
  }, []);

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onNext();
    }
  };

  const handleOpenInputOverlay = () => {
    setTempDuckName(duckName);
    setShowInputOverlay(true);
  };

  const handleSaveName = () => {
    setDuckName(tempDuckName);
    setShowInputOverlay(false);
  };

  const handleCancelInput = () => {
    setTempDuckName(duckName);
    setShowInputOverlay(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] text-gray-800 px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1">
        {/* Title - same format as FocusScreen */}
        <div className="flex justify-center px-5 flex-shrink-0" style={{ marginTop: '5vh', marginBottom: '3vh' }}>
          <h1 className="font-medium text-center leading-tight" style={{ color: '#4C4A3C', fontSize: '3vh' }}>
            Meet your Quabble Duck!<br />
            Do you want to name<br />
            your duck?
          </h1>
        </div>

        {/* Duck illustration */}
        <div className="relative flex justify-center w-full" style={{ marginBottom: '3vh', height: '25vh' }}>
          <img 
            src="/images/14-duck.png" 
            alt="Quabble Duck" 
            className="w-full max-w-xs h-auto object-contain" 
            style={{ maxHeight: '25vh' }} 
          />
        </div>

        {/* Name button (looks like input) */}
        <div className="w-full max-w-48" style={{ marginBottom: '4vh' }}>
          <button
            onClick={handleOpenInputOverlay}
            className="w-full px-6 rounded-xl text-center font-medium border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            style={{ paddingTop: '2vh', paddingBottom: '2vh', fontSize: '3vh' }}
          >
            {duckName}
          </button>
        </div>
        </div>

      {/* Bottom section - same format as FocusScreen */}
      {!showInputOverlay && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6">
            <div className="max-w-md mx-auto">
              {/* Skip button */}
              <div className="text-center mb-6">
                <button 
                  className="text-gray-500 font-medium"
                  style={{ fontSize: '2.5vh' }}
                  onClick={handleSkip}
                >
                  Skip
                </button>
              </div>

              {/* Next Button - same format as FocusScreen */}
              <button
                className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh' // 1/40 of viewport height
                }}
                onClick={() => {
                  // Send event with duck name
                  // sendToFlutter(JSON.stringify({
                  //   "event": "v2_5_7_onboarding_A::onboarding:page_2_part_4:click_next",
                  //   "eventProperties": {
                  //     "duckname": duckName
                  //   }
                  // }));
                  onNext();
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Overlay - Full Screen */}
      {showInputOverlay && (
        <div className="fixed inset-0 bg-[#faf7f0] z-60 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pt-16 pb-8 px-6">
            <button 
              onClick={handleCancelInput}
              className="p-2 text-gray-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleSaveName}
              className="px-4 py-2 text-black font-medium"
            >
              Done
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <h3 className="text-2xl font-normal text-gray-800 text-center mb-16">
              Name your duck
            </h3>
            
            <div className="w-full max-w-xs">
              <input
                type="text"
                value={tempDuckName}
                onChange={(e) => setTempDuckName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveName();
                  } else if (e.key === 'Escape') {
                    handleCancelInput();
                  }
                }}
                className="w-full py-4 px-0 text-center text-xl font-medium bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter duck name"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 