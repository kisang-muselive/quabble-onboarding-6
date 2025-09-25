import { useEffect, useRef, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface CustomizingProps {
  onBack: () => void;
  onNext: () => void;
}

export function Customizing({ onBack, onNext }: CustomizingProps) {
  const { t } = useLanguage();
  const lottieRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    sendToFlutter("view_ob_info_quabble_just_what_you_need", {
      "eventProperties": {
        "onboarding_version": 4.0
      }
    });

    // 6초 동안 로딩 진행
    const duration = 6000; // 6초
    const interval = 50; // 50ms마다 업데이트
    const steps = duration / interval;
    const progressStep = 100 / steps;

    // 2초 후 카드 표시
    const cardTimer = setTimeout(() => {
      setShowCard(true);
    }, 2000);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressStep;
        if (newProgress >= 100) {
          clearInterval(timer);
          // 로딩 완료 후 다음 화면으로 이동
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
      clearTimeout(cardTimer);
    };
  }, [onNext]);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2', outline: '2px solid red' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ backgroundColor: '#FAF9F2' }}
        style={{ 
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: '1rem',
          outline: '2px solid blue'
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

      <div className="flex flex-col items-center main-content" style={{ outline: '2px solid green' }}>
        {/* Content Area - Fixed Height */}
        <div className="w-full" style={{ height: '500px', outline: '2px solid magenta' }}>
          {!showCard ? (
            <>
              <div className="flex flex-col items-center justify-center text-center max-w-sm title-container mt-9 px-9 mx-auto" style={{ outline: '2px solid purple' }}>
                <h1 className="font-medium leading-snug title-text" style={{ 
                  color: '#4C4A3C',
                  fontSize: 'min(5.5vw, 1.625rem)',
                  outline: '2px solid orange'
                }}>
                  Customizing your<br />mental wellness routine
                </h1>
              </div>

              <div className="flex items-center justify-center image-container w-full" style={{ marginTop: '20px', paddingLeft: '48px', paddingRight: '48px', outline: '2px solid cyan' }}>
                <div 
                  className="h-auto object-contain main-image"
                  style={{ 
                    width: '375px',
                    height: '375px',
                    maxWidth: '375px',
                    maxHeight: '375px',
                    outline: '2px solid yellow'
                  }}
                >
                  <lottie-player
                    ref={lottieRef}
                    src="/images/labduck.json"
                    background="transparent"
                    speed="1"
                    style={{
                      width: '100%',
                      height: '100%',
                      outline: '2px solid pink'
                    }}
                    autoplay
                    loop
                  />
                </div>
              </div>
            </>
          ) : (
            <div 
              className="flex flex-col items-center justify-center w-full h-full transition-opacity duration-1000 ease-in-out"
              style={{ 
                opacity: showCard ? 1 : 0,
                paddingLeft: '36px',
                paddingRight: '36px',
                outline: '2px solid purple'
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
                  paddingRight: '28px',
                  outline: '2px solid orange'
                }}
              >
                {/* Quote icon */}
                <div style={{ marginBottom: '10px', outline: '2px solid cyan' }}>
                  <img 
                    src="/images/quotationmarks.svg" 
                    alt="Quote" 
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      outline: '2px solid yellow'
                    }}
                  />
                </div>
                
                {/* Main text */}
                <p 
                  className="text-center font-normal leading-snug mb-4"
                  style={{ 
                    color: '#4C4A3C',
                    fontSize: 'min(4.5vw, 1.125rem)',
                    outline: '2px solid pink'
                  }}
                >
                  A recent study shows small daily routines can ease stress and anxiety, and build resilience
                </p>
                
                {/* Source text */}
                <p 
                  className="text-center text-sm"
                  style={{ 
                    color: '#7B7968',
                    fontSize: 'min(3.5vw, 0.875rem)',
                    outline: '2px solid brown'
                  }}
                >
                  Frontiers in Psychology, 2024
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Loading Bar - Fixed Position */}
        <div className="w-full max-w-sm px-9" style={{ paddingLeft: '72px', paddingRight: '72px', outline: '2px solid brown' }}>
          <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: '#E1E0D3', outline: '2px solid lime' }}>
            <div 
              className="bg-orange-400 h-2 rounded-full transition-all duration-75 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#F28C39',
                outline: '2px solid navy'
              }}
            />
          </div>
          
          {/* Percentage Counter */}
          <div className="text-center mt-4" style={{ outline: '2px solid teal' }}>
            <span className="text-2xl font-medium" style={{ color: '#4C4A3C', outline: '2px solid maroon' }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* No CTA button - automatic progression after loading */}
    </div>
  );
}
