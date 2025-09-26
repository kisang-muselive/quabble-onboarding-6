import { useEffect, useRef, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface InterestGridProps {
  onBack: () => void;
  onNext: () => void;
}

export function InterestGrid({ onBack, onNext }: InterestGridProps) {
  const { t } = useLanguage();
  const lottieRef = useRef<any>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showCTA, setShowCTA] = useState(false);

  const gridItems = [
    { icon: '21-icon-1.png', text: 'Breathing exercises', activeColor: '#E0EAED' },
    { icon: '21-icon-2.png', text: 'Mood tracking', activeColor: '#E4DEE4' },
    { icon: '21-icon-3.png', text: 'Journaling', activeColor: '#F7D9B9' },
    { icon: '21-icon-4.png', text: 'Self-love', activeColor: '#FCD9D1' },
    { icon: '21-icon-5.png', text: 'Gratitude practice', activeColor: '#F2EBC0' },
    { icon: '21-icon-6.png', text: 'Meditation', activeColor: '#D3EDE4' },
    { icon: '21-icon-7.png', text: 'Physical activities', activeColor: '#D2E5D4' },
    { icon: '21-icon-8.png', text: 'Better sleep', activeColor: '#525F72' },
    { icon: '21-icon-9.png', text: 'Productivity', activeColor: '#D1DEEE' }
  ];

  const handleGridItemClick = (index: number) => {
    setSelectedItems(prev => {
      const newSelected = prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index];
      
      // CTA 표시 상태 업데이트
      if (newSelected.length > 0 && !showCTA) {
        setShowCTA(true);
      } else if (newSelected.length === 0 && showCTA) {
        setShowCTA(false);
      }
      
      return newSelected;
    });
  };

  const handleLottieClick = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  };
  
  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_interested_activity",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header with back button and indicator */}
      <div 
        className="flex items-center justify-between px-4 header-container relative"
        style={{ 
          paddingTop: '56px',
          paddingBottom: '1rem',
          backgroundColor: '#FAF9F2'
        }}
      >
        <button 
          onClick={onBack}
          className="p-2 flex items-center justify-center header-button-area"
          style={{ width: '40px', height: '40px' }}
        >
          <img 
            src="/images/arrow_left.svg" 
            alt="Back" 
            className="w-6 h-6 header-back-icon"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center indicator-container" style={{ gap: '4px' }}>
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#F28C39'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#F28C39'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#E1E0D3'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#E1E0D3'
            }}
          />
          <div 
            className="indicator-item"
            style={{
              width: '10px',
              height: '6px',
              borderRadius: '8px',
              backgroundColor: '#E1E0D3'
            }}
          />
        </div>
        
        {/* Empty div to balance the layout */}
        <div style={{ width: '40px', height: '40px' }} />
      </div>

      <div className="flex flex-col items-center px-9 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            Which of the following are you interested in practicing?
          </h1>
          <p className="subtitle-text mt-2" style={{
            color: '#7B7968',
            fontSize: 'min(4vw, 1rem)'
          }}>
            Choose all that apply
          </p>
        </div>
      </div>

      {/* 3x3 Interest Grid */}
      <div className="px-5 mt-9">
        <div className="grid grid-cols-3 w-full max-w-sm mx-auto" style={{ gap: '4px' }}>
          {gridItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleGridItemClick(index)}
              className="aspect-square relative transition-colors duration-75 cursor-pointer"
              style={{
                backgroundColor: selectedItems.includes(index) ? item.activeColor : '#F3F1E5',
                borderRadius: '16px',
                padding: '14px'
              }}
            >
              {/* Icon in top-left */}
              <img
                src={`/images/${item.icon}`}
                alt={item.text}
                className="absolute"
                style={{ 
                  width: 'min(7vw, 28px)', 
                  height: 'min(7vw, 28px)',
                  top: '14px',
                  left: '14px',
                  mixBlendMode: selectedItems.includes(index) ? 'normal' : 'luminosity',
                  opacity: selectedItems.includes(index) ? 1 : 0.5
                }}
              />
              
              {/* Text in bottom-left */}
              <div className="absolute text-left overflow-hidden" style={{
                bottom: '14px',
                left: '14px',
                right: '14px'
              }}>
                <span 
                  className="block overflow-hidden text-ellipsis"
                  style={{ 
                    color: selectedItems.includes(index) 
                      ? (item.activeColor === '#525F72' ? '#FFFFFF' : '#4C4A3C')
                      : '#7B7968',
                    fontSize: 'min(4vw, 0.9375rem)',
                    lineHeight: '1.2',
                    fontWeight: '500',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {item.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* CTA Container with integrated gradient */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
        style={{
          transform: showCTA ? 'translateY(0)' : 'translateY(100%)'
        }}
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
              {t('next')}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
