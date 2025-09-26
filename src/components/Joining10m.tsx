import { useEffect, useRef, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

// lottie-player 웹 컴포넌트 타입 선언
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}


interface Joining10mProps {
  onBack: () => void;
  onNext: () => void;
  dealingWithSelection?: string | null;
}

export function Joining10m({ onBack, onNext, dealingWithSelection }: Joining10mProps) {
  const { t } = useLanguage();
  const confettiRef = useRef<any>(null);
  const [hasPlayedConfetti, setHasPlayedConfetti] = useState(false);
  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showThirdText, setShowThirdText] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const playConfetti = () => {
    // 이미 재생했다면 즉시 종료
    if (hasPlayedConfetti) return;
    
    if (confettiRef.current) {
      try {
        confettiRef.current.play();
        setHasPlayedConfetti(true);
        console.log('Confetti played once');
      } catch (error) {
        console.error('Error playing confetti:', error);
      }
    }
  };


  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_joing_10m_completed_user",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));

    // 순차적 텍스트 애니메이션
    const timer1 = setTimeout(() => setShowFirstText(true), 300);
    const timer2 = setTimeout(() => setShowSecondText(true), 600);
    const timer3 = setTimeout(() => setShowThirdText(true), 900);
    const timer4 = setTimeout(() => {
      setShowCTA(true);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // CTA가 나타날 때 로티 재생 (한 번만)
  useEffect(() => {
    if (showCTA && !hasPlayedConfetti) {
      console.log('CTA appeared, setting confetti timer');
      const confettiTimer = setTimeout(() => {
        console.log('Confetti timer fired');
        playConfetti();
      }, 300); // CTA 애니메이션 시작 후 300ms 뒤

      return () => {
        console.log('Cleaning up confetti timer');
        clearTimeout(confettiTimer);
      };
    }
  }, [showCTA]); // hasPlayedConfetti 의존성 제거하여 중복 실행 방지

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Confetti Animation - Top of screen */}
      <div className="absolute top-0 left-0 right-0 z-0 flex justify-center" style={{ marginLeft: '36px', marginRight: '36px' }}>
        <lottie-player
          ref={confettiRef}
          src="/images/confetti.json"
          background="transparent"
          speed="1"
          style={{
            width: '100%',
            maxWidth: '375px',
            height: 'auto',
            aspectRatio: '1 / 1'
          }}
          loop={false}
          autoplay={false}
          onReady={() => {
            console.log('Lottie ready, but waiting for CTA trigger');
          }}
        />
      </div>

      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#FAF9F2',
          paddingTop: '56px',
          paddingBottom: '1rem'
        }}
      >
        <div 
          className="p-2 flex items-center justify-center header-button-area"
          style={{ width: '40px', height: '40px' }}
          onClick={onBack}
        >
          <img 
            src="/images/arrow_left.svg" 
            alt="Back" 
            className="w-6 h-6 header-back-icon"
            style={{ 
              width: '24px', 
              height: '24px',
              filter: 'none'
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center main-content relative z-10">
        {/* Content Area - Fixed Height */}
        <div className="w-full relative" style={{ height: '350px', paddingTop: '20px', paddingBottom: '20px' }}>
          {/* Title Text with Sequential Animation */}
          <div className="absolute inset-0 z-10">
            <div className="flex flex-col items-center justify-center text-center max-w-sm title-container px-9 mx-auto" style={{ marginTop: '24px' }}>
              <div className="font-medium leading-snug title-text" style={{ 
                color: '#4C4A3C',
                fontSize: 'min(5.5vw, 1.625rem)'
              }}>
                <div className={`transition-all duration-700 ease-out ${showFirstText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  You're joining
                </div>
                <div className={`transition-all duration-700 ease-out ${showSecondText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ 
                  color: '#F28C39',
                  fontSize: 'min(12.6vw, 3.5rem)',
                  fontWeight: '600',
                  marginTop: '4px',
                  marginBottom: '4px'
                }}>
                  10M+
                </div>
                <div className={`transition-all duration-700 ease-out ${showThirdText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  Wellness routine already completed by Quabble users
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
        {/* Celebrating Image - directly attached to CTA Container */}
        <div className="w-full flex justify-center relative">
          <img 
            src="/images/qubblefriendscelebrating.png" 
            alt="Friends Celebrating" 
            style={{ 
              width: 'min(100vw, 450px)', 
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          {/* Gradient frame overlaying the bottom of the image */}
          <div 
            className="absolute bottom-0 left-0 right-0 gradient-frame"
            style={{ 
              height: '36px',
              background: 'linear-gradient(to top, #FAF9F2 0%, rgba(250, 249, 242, 0) 100%)'
            }}
          />
        </div>
        
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
              className="w-full mx-auto block px-7 rounded-full text-white text-center touch-target cta-orange-button cta-button"
              style={{ 
                backgroundColor: '#F28C39',
                fontWeight: '500',
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                onNext();
              }}
            >
              Next
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
