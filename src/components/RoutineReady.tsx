import { useEffect, useRef, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

// lottie-player 웹 컴포넌트 타입 선언
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}


interface RoutineReadyProps {
  onBack: () => void;
  onNext: () => void;
  dealingWithSelection?: string | null;
}

export function RoutineReady({ onBack, onNext, dealingWithSelection }: RoutineReadyProps) {
  const { t } = useLanguage();
  const confettiRef = useRef<any>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showMorningCard, setShowMorningCard] = useState(false);
  const [showEveningCard, setShowEveningCard] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const handleLottieReady = () => {
    // 이미 재생했다면 실행하지 않음
    if (hasPlayed) return;
    
    if (confettiRef.current) {
      try {
        confettiRef.current.play();
        setHasPlayed(true);
      } catch (error) {
        console.error('Error playing confetti:', error);
      }
    }
  };

  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });

    // 순차적 애니메이션
    const timer1 = setTimeout(() => setShowMorningCard(true), 300);
    const timer2 = setTimeout(() => setShowEveningCard(true), 600);
    const timer3 = setTimeout(() => setShowCTA(true), 900);

    // Fallback: 로티가 1초 후에도 재생되지 않았다면 강제 재생 (한 번만)
    const lottieTimer = setTimeout(() => {
      if (!hasPlayed && confettiRef.current) {
        try {
          confettiRef.current.play();
          setHasPlayed(true);
        } catch (error) {
          console.error('Fallback confetti play error:', error);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(lottieTimer);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Confetti Animation - Top of screen */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{ marginLeft: '36px', marginRight: '36px' }}>
        <lottie-player
          ref={confettiRef}
          src="/images/confetti.json"
          background="transparent"
          speed="1"
          style={{
            width: '100%',
            height: '300px'
          }}
          loop={false}
          autoplay={false}
          onReady={handleLottieReady}
        />
      </div>

      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#FAF9F2',
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: '1rem'
        }}
      >
        <div 
          className="p-2 flex items-center justify-center header-button-area"
          style={{ width: '40px', height: '40px' }}
        >
          <img 
            src="/images/arrow_left.svg" 
            alt="Back" 
            className="w-6 h-6 header-back-icon"
            style={{ 
              width: '24px', 
              height: '24px',
              opacity: 0,
              filter: 'none'
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center main-content">
        {/* Content Area - Fixed Height */}
        <div className="w-full relative" style={{ height: '350px', paddingTop: '20px', paddingBottom: '20px' }}>
          {/* Title and Image */}
          <div className="absolute inset-0">
            <div className="flex flex-col items-center justify-center text-center max-w-sm title-container mt-9 px-9 mx-auto">
              <h1 className="font-medium leading-snug title-text" style={{ 
                color: '#4C4A3C',
                fontSize: 'min(5.5vw, 1.625rem)'
              }}>
                Your routine is ready!
              </h1>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col w-full max-w-sm mx-auto" style={{ marginTop: '36px', paddingLeft: '48px', paddingRight: '48px', gap: '16px', maxWidth: '375px' }}>
              {/* Routine Card */}
              <div 
                className={`w-full bg-white rounded-2xl transition-all duration-700 ease-out ${showMorningCard ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderRadius: '36px',
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  paddingTop: '20px',
                  paddingBottom: '28px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                }}
              >
                <h2 className="text-lg font-medium text-center mb-4" style={{ 
                  color: '#4C4A3C',
                  fontSize: 'min(4.5vw, 1.125rem)'
                }}>
                  Morning Routine
                </h2>
                
                {/* Images Container */}
                <div className="flex justify-center" style={{ gap: '16px' }}>
                  {/* Sun Image with Text */}
                  <div className="flex flex-col items-center" style={{ maxWidth: '64px' }}>
                    <img 
                      src="/images/24-sun.png" 
                      alt="Sun" 
                      style={{ 
                        width: '64px', 
                        height: '64px',
                        objectFit: 'contain'
                      }}
                    />
                    <p className="text-center text-sm" style={{ 
                      color: '#4C4A3C',
                      fontSize: 'min(3vw, 0.75rem)',
                      marginTop: '4px',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      width: '100%'
                    }}>
                      Morning Check-in
                    </p>
                  </div>
                  
                  {/* Horizontal Divider Line */}
                  <div className="flex items-center flex-1">
                    <div 
                      style={{ 
                        width: '100%', 
                        height: '2px', 
                        backgroundColor: '#E1E0D3' 
                      }}
                    />
                  </div>
                  
                  {/* Smoothie Image with Text */}
                  <div className="flex flex-col items-center" style={{ maxWidth: '64px' }}>
                    <img 
                      src="/images/24-smoothie.png" 
                      alt="Smoothie" 
                      style={{ 
                        width: '64px', 
                        height: '64px',
                        objectFit: 'contain'
                      }}
                    />
                    <p className="text-center text-sm" style={{ 
                      color: '#4C4A3C',
                      fontSize: 'min(3vw, 0.75rem)',
                      marginTop: '4px',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      width: '100%'
                    }}>
                      Mood Diary
                    </p>
                  </div>
                </div>
              </div>

              {/* Evening Card */}
              <div 
                className={`w-full bg-white rounded-2xl transition-all duration-700 ease-out ${showEveningCard ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ 
                  backgroundColor: '#605D4E',
                  borderRadius: '36px',
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  paddingTop: '20px',
                  paddingBottom: '28px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                }}
              >
                <h2 className="text-lg font-medium text-center mb-4" style={{ 
                  color: '#FFFFFF',
                  fontSize: 'min(4.5vw, 1.125rem)'
                }}>
                  Evening Routine
                </h2>
                
                {/* Images Container */}
                <div className="flex justify-center" style={{ gap: '16px' }}>
                  {/* Moon Image with Text */}
                  <div className="flex flex-col items-center" style={{ maxWidth: '64px' }}>
                    <img 
                      src="/images/24-moon.png" 
                      alt="Moon" 
                      style={{ 
                        width: '64px', 
                        height: '64px',
                        objectFit: 'contain'
                      }}
                    />
                    <p className="text-center text-sm" style={{ 
                      color: '#FFFFFF',
                      fontSize: 'min(3vw, 0.75rem)',
                      marginTop: '4px',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      width: '100%'
                    }}>
                      Evening Check-in
                    </p>
                  </div>
                  
                  {/* Horizontal Divider Line */}
                  <div className="flex items-center flex-1">
                    <div 
                      style={{ 
                        width: '100%', 
                        height: '2px', 
                        backgroundColor: '#7B7968' 
                      }}
                    />
                  </div>
                  
                  {/* Jar Image with Text */}
                  <div className="flex flex-col items-center" style={{ maxWidth: '64px' }}>
                    <img 
                      src="/images/24-jar.png" 
                      alt="Jar" 
                      style={{ 
                        width: '64px', 
                        height: '64px',
                        objectFit: 'contain'
                      }}
                    />
                    <p className="text-center text-sm" style={{ 
                      color: '#FFFFFF',
                      fontSize: 'min(3vw, 0.75rem)',
                      marginTop: '4px',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      width: '100%'
                    }}>
                      Gratitude Jar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Container with integrated gradient */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${showCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      >
        {/* Gradient frame above CTA */}
        <div 
          className="w-full gradient-frame"
          style={{ 
            height: '36px',
            background: 'linear-gradient(to top, #FAF9F2 0%, rgba(250, 249, 242, 0) 100%)'
          }}
        />
        
        {/* CTA Container */}
        <div 
          className="cta-container"
          style={{
            backgroundColor: '#FAF9F2'
          }}
        >
        <div className="px-9 pb-9 pl-9 pr-9">
          <div className="max-w-md mx-auto cta-button-wrapper">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal touch-target cta-orange-button cta-button"
              style={{ 
                backgroundColor: '#F28C39',
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                onNext();
              }}
            >
              Get Started
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
