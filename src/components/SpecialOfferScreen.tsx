import { sendToFlutter } from '@/lib/quabbleFlutterChannel';
import React, { useEffect } from 'react';

interface SpecialOfferScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function SpecialOfferScreen({
  onBack,
  onNext
}: SpecialOfferScreenProps) {

  useEffect(() => {
    sendToFlutter(JSON.stringify(
      {
        "event":"view_ob_info_coach_intro",
        "eventProperties": {
          "onboarding_version": 4.0,
        }
      }
    ));
  }, []); 

  const onNextClicked = () => {
    sendToFlutter('{"event":"onboarding-complete"}');
    // onNext();
  };
  return (
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FAF9F2' }}>

      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {/* Header */}
        <div className="flex items-center justify-between mt-6 px-4 z-10">
          <button className="p-2 text-white opacity-0 pointer-events-none" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Limited-time Offer Badge */}
          <div className="text-white" style={{ 
            padding: 'clamp(4px, 1.1vw, 8px) clamp(12px, 3.2vw, 24px)', 
            borderRadius: 'clamp(10px, 2.6vw, 20px)', 
            backgroundColor: '#F28C39',
            marginBottom: '10px'
          }}>
            <span style={{ 
              fontSize: window.innerHeight <= 667 ? 'clamp(12px, 3.1vw, 24px)' : 'clamp(14px, 3.7vw, 28px)', 
              fontWeight: 500, 
              lineHeight: window.innerHeight <= 667 ? 'clamp(17px, 4.5vw, 34px)' : 'clamp(20px, 5.3vw, 40px)' 
            }}>Limited-time Offer</span>
          </div>
          
          {/* Special Event Date */}
          <div style={{ 
            color: '#F28C39', 
            fontSize: window.innerHeight <= 667 ? 'clamp(12px, 3.1vw, 24px)' : 'clamp(14px, 3.7vw, 28px)', 
            fontWeight: 500, 
            lineHeight: window.innerHeight <= 667 ? 'clamp(17px, 4.5vw, 34px)' : 'clamp(20px, 5.3vw, 40px)',
            marginBottom: '10px'
          }}>
            SEPTEMBER SPECIAL EVENT
          </div>

          {/* Main Headline */}
          <div className="text-center" style={{ marginBottom: '10px' }}>
            <h1 className="font-medium text-black leading-tight" style={{
              fontSize: 'clamp(24px, 6.4vw, 48px)'
            }}>
              Unlock 4 Free Letters to Connect with Wellness Coach!
            </h1>
          </div>

          {/* Description */}
          <div className="text-center" style={{ marginBottom: '10px' }}>
            <p style={{
              fontSize: '20px',
              color: '#7B7968'
            }}>
              Subscribe to Quabble now and<br />receive gentle, personal support
            </p>
          </div>

          {/* Team Quabble Care Card */}
          <div className="bg-white mb-6 w-full max-w-md" style={{
            padding: 'clamp(20px, 5.3vw, 40px) clamp(24px, 6.4vw, 48px)',
            borderRadius: '24px',
            margin: 'clamp(24px, 6.4vw, 48px) clamp(20px, 5.3vw, 40px)',
            boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.10)'
          }}>
            <div className="text-center mb-4" style={{ height: 'fit-content' }}>
              <h2 className="font-medium text-black" style={{
                fontSize: 'clamp(20px, 5.3vw, 40px)'
              }}>
                Team Quabble Care
              </h2>
              <div style={{ 
                color: '#F28C39',
                fontSize: 'clamp(16px, 4.3vw, 32px)'
              }}>
                Christina, Drew, Jung
              </div>
            </div>
            
            {/* Team Members Image */}
            <div className="flex justify-center">
              <img 
                src="/images/3people.png" 
                alt="Team Quabble Care members" 
                className="w-full max-w-xs object-contain" 
                style={{
                  height: 'clamp(78px, 20.8vw, 84px)'
                }}
              />
            </div>
          </div>

          {/* Spacer */}
          <div style={{ height: '120px' }}></div>

        </div>

        {/* Bottom section - matching LetsFindOutScreen layout */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#FAF9F2] z-50" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
            {/* Additional Info */}
            <div className="text-center" style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: 'clamp(13px, 3.3vw, 25px)',
                color: '#BBB8A5',
                lineHeight: 'clamp(18px, 4.8vw, 34px)'
              }}>
                This special event is part of our effort to support our users in more human and meaningful ways.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <button 
                className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh' // 1/40 of viewport height
                }}
                onClick={onNextClicked}
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
    </div>
  );
}
