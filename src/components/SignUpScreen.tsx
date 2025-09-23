import React, { useState } from 'react';

interface SignUpScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function SignUpScreen({
  onBack,
  onNext
}: SignUpScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/13-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen px-4">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <button className="p-2 text-gray-700" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1 justify-center">
          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-black mb-4">
              Quabble
            </h1>
            <p className="text-xl text-gray-600">
              Daily Mental Wellness<br />
              with One Joyful App!
            </p>
          </div>

          {/* Duck illustration */}
          <div className="relative flex justify-center mb-8 h-80 w-full">
            <img 
              src="/images/13-duck.png" 
              alt="Duck with wellness jar" 
              className="w-full max-w-sm h-auto max-h-80 object-contain" 
            />
          </div>
        </div>

        {/* Bottom section */}
        <div className="pb-12 px-4">
          {/* Terms checkbox */}
          <div className="flex items-center mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
            <button
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                agreedToTerms ? 'bg-gray-800 border-gray-800' : 'border-gray-400'
              }`}
              onClick={() => setAgreedToTerms(!agreedToTerms)}
            >
              {agreedToTerms && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p className="text-gray-600 text-sm">
              I agree to Quabble's Terms of Service<br />
              and Privacy Policy
            </p>
          </div>

          {/* Next button */}
          <div className="max-w-md mx-auto">
            <button 
              className={`w-full py-4 px-6 rounded-full text-white text-center transition-all ${
                agreedToTerms 
                  ? 'bg-black hover:bg-gray-800' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={onNext}
              disabled={!agreedToTerms}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 