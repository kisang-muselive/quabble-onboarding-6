import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface AskFeelingScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function AskFeelingScreen({
  onBack,
  onNext
}: AskFeelingScreenProps) {
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  
  useEffect(() => {
    // Function to be called when the component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_9:landing"}');
  }, []);
  
  const feelingOptions = [
    ['Excited', 'Happy', 'Relaxed'],
    ['Content', 'Lonely', 'Stressed'],
    ['Anxious', 'Depressed', 'Panicky']
  ];

  const handleFeelingClick = (feeling: string) => {
    sendToFlutter(JSON.stringify(
      {"event": "heptic"}
    ));
    setSelectedFeelings(prev => 
      prev.includes(feeling)
        ? prev.filter(f => f !== feeling)
        : [...prev, feeling]
    );
  };

  const isSelected = (feeling: string) => selectedFeelings.includes(feeling);

  return (
    <>
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/20-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen text-gray-800 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        <button className="p-2" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1" style={{ paddingBottom: '9rem' }}>
        {/* Title */}
        <div className="text-center px-4" style={{ marginBottom: '0.8vh', marginTop: '-2vh' }}>
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: '3vh' }}>
            How have you been<br />
            feeling lately?
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center px-4" style={{ marginBottom: '2.3vh' }}>
          <p style={{ color: '#7B7968', fontSize: '2vh' }}>
            Choose all that apply
          </p>
        </div>

        {/* Feeling options grid */}
        <div className="w-full max-w-sm mb-8">
          {feelingOptions.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2" style={{ marginBottom: rowIndex < feelingOptions.length - 1 ? '1vh' : '0' }}>
              {row.map((feeling) => (
                <button
                  key={feeling}
                  className={`flex-1 font-medium transition-colors ${
                    isSelected(feeling)
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-800 border-2 hover:bg-gray-50'
                  }`}
                  style={{ 
                    borderColor: isSelected(feeling) ? 'transparent' : '#E1E0D3',
                    height: '7vh',
                    fontSize: '2vh',
                    borderRadius: '3.5vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => handleFeelingClick(feeling)}
                >
                  {feeling}
                </button>
              ))}
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
    </div>
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
      
      @media (max-width: 375px) {
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
      }
      
      @media (max-height: 667px) {
        .space-y-3 > * + * { margin-top: 0.5rem; }
        .space-y-4 > * + * { margin-top: 0.75rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-5 { margin-bottom: 1rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
    </>
  );
} 