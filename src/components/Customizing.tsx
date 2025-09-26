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

interface CustomizingProps {
  onBack: () => void;
  onNext: () => void;
  dealingWithSelection?: string | null;
}

export function Customizing({ onBack, onNext, dealingWithSelection }: CustomizingProps) {
  const { t } = useLanguage();
  const lottieRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showDuck, setShowDuck] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 6.0
      }
    });

    // 6초 동안 로딩 진행 (처음 2초는 오리 애니메이션, 4초부터 카드 표시)
    const duration = 6000; // 6초
    const interval = 50; // 50ms마다 업데이트
    const steps = duration / interval;
    const progressStep = 100 / steps;

    // 1.5초 후 오리 애니메이션 숨기기
    const duckTimer = setTimeout(() => {
      setShowDuck(false);
    }, 1500);

    // 1.6초 후 카드 표시 (오리 애니메이션 fade-out 완료 직후)
    const cardTimer = setTimeout(() => {
      setShowCard(true);
    }, 1600);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressStep;
        if (newProgress >= 100 && !hasCompleted) {
          clearInterval(timer);
          setHasCompleted(true);
          // 로딩 완료 후 RoutineReady 화면으로 이동
          setTimeout(() => {
            onNext();
          }, 500);
          return 100;
        }
        return newProgress;
      });
      
      setPercentage(prev => {
        const newPercentage = prev + progressStep;
        return newPercentage >= 100 ? 100 : newPercentage;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(duckTimer);
      clearTimeout(cardTimer);
    };
  }, [onNext]);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
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
          {/* Initial Content - Title and Image */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${!showCard && showDuck ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-sm title-container px-9 mx-auto">
              <h1 className="font-medium leading-snug title-text" style={{ 
                color: '#4C4A3C',
                fontSize: 'min(5.5vw, 1.625rem)'
              }}>
                Customizing your<br />mental wellness routine
              </h1>
            </div>

            <div className="flex items-center justify-center image-container w-full" style={{ marginTop: '20px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div 
                className="h-auto object-contain main-image"
                style={{ 
                  width: '242px',
                  height: '242px',
                  maxWidth: '242px',
                  maxHeight: '242px'
                }}
              >
                <lottie-player
                  ref={lottieRef}
                  src="/images/labduck.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  autoplay
                  loop
                />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center w-full h-full transition-opacity duration-1000 ease-in-out ${showCard ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              paddingLeft: '36px',
              paddingRight: '36px'
            }}
          >
            <div 
              className="flex flex-col items-center w-full max-w-md"
              style={{ 
                backgroundColor: '#FFF0E5',
                borderRadius: '20px',
                paddingTop: '24px',
                paddingBottom: '36px',
                paddingLeft: '28px',
                paddingRight: '28px'
              }}
            >
              {/* Quote icon */}
              <div style={{ marginBottom: '10px' }}>
                <img 
                  src="/images/quotationmarks.svg" 
                  alt="Quote" 
                  style={{ 
                    width: '32px', 
                    height: '32px'
                  }}
                />
              </div>
              
              {/* Main text */}
              <p 
                className="text-center font-normal leading-snug mb-4"
                style={{ 
                  color: '#4C4A3C',
                  fontSize: 'min(4.5vw, 1.125rem)'
                }}
              >
                {dealingWithSelection === 'Anxiety' 
                  ? 'A recent study shows small daily routines can ease stress and anxiety, and build resilience'
                  : 'Research shows even small daily actions like walking, gratitude, or connecting can boost mood and well-being.'
                }
              </p>
              
              {/* Source text */}
              <p 
                className="text-center text-sm"
                style={{ 
                  color: '#7B7968',
                  fontSize: 'min(3.5vw, 0.875rem)'
                }}
              >
                {dealingWithSelection === 'Anxiety' 
                  ? 'Frontiers in Psychology, 2024'
                  : 'MQ Mental Health, 2023'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Loading Bar - Fixed Position */}
        <div className="w-full max-w-sm px-9" style={{ paddingLeft: '72px', paddingRight: '72px', marginTop: '40px' }}>
          <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: '#E1E0D3' }}>
            <div 
              className="bg-orange-400 h-2 rounded-full transition-all duration-75 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#F28C39'
              }}
            />
          </div>
          
          {/* Percentage Counter */}
          <div className="text-center mt-4">
            <span className="text-2xl font-medium" style={{ color: '#4C4A3C' }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* No CTA button - automatic progression after loading */}
    </div>
  );
}