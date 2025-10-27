import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface FiveStarsProps {
  onBack: () => void;
  onNext: () => void;
}

export function FiveStars({ onBack, onNext }: FiveStarsProps) {
  const { t } = useLanguage();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showCTA, setShowCTA] = useState(false);
  
  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_review",
      "eventProperties": {
        "onboarding_version": 6.1
      }
    }));

    // 순차적으로 각 카드를 표시
    const animationTimers: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < 5; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * 100); // 100ms 간격으로 순차 등장
      
      animationTimers.push(timer);
    }

    // 모든 아이템이 나타난 후 CTA 표시
    const ctaTimer = setTimeout(() => {
      setShowCTA(true);
    }, 5 * 100 + 300); // 모든 아이템 + 300ms 후

    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(ctaTimer);
    };
  }, []);

  const testimonials = [
    {
      title: t('fiveStars.testimonial1'),
      subtitle: t('fiveStars.testimonial1Author')
    },
    {
      title: t('fiveStars.testimonial2'),
      subtitle: t('fiveStars.testimonial2Author')
    },
    {
      title: t('fiveStars.testimonial3'),
      subtitle: t('fiveStars.testimonial3Author')
    },
    {
      title: t('fiveStars.testimonial4'),
      subtitle: t('fiveStars.testimonial4Author')
    },
    {
      title: t('fiveStars.testimonial5'),
      subtitle: t('fiveStars.testimonial5Author')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen text-gray-800 relative screen-container" style={{ backgroundColor: '#617AB0' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#617AB0',
          paddingTop: '56px',
          paddingBottom: '1rem'
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
            style={{ 
              width: '24px', 
              height: '24px',
              filter: 'brightness(0) saturate(100%) invert(100%)'
            }}
          />
        </button>
      </div>

      {/* Review Stars */}
      <div className="flex justify-center w-full review-stars-container">
        <img
          src="/images/reviewstars.svg"
          alt="Review Stars"
          className="h-auto object-contain review-stars-image"
          style={{ 
            height: '56px'
          }}
        />
      </div>

      {/* Testimonial Background Image */}
      <div className="flex justify-center w-full testimonial-bg-container">
        <img
          src="/images/testimonial-background.png"
          alt="Testimonial Background"
          className="w-full h-auto object-contain testimonial-bg-image"
          style={{ 
            maxWidth: '600px',
            width: '100%'
          }}
        />
      </div>

      {/* Background color change section - E9D37C from here */}
      <div className="flex flex-col w-full flex-1" style={{ backgroundColor: '#E9D37C' }}>
        <div className="flex flex-col items-center main-content" style={{ paddingBottom: '120px' }}>
          {/* Testimonial Cards */}
          <div className="testimonial-cards-container" style={{ 
            width: '100%',
            maxWidth: '400px',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`testimonial-card transition-all duration-500 ease-out ${
                    visibleItems.includes(index) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                  }}
                >
                  {/* Yellow 5 Stars */}
                  <div className="flex justify-start mb-2">
                    <img
                      src="/images/yellow5stars.svg"
                      alt="5 Stars"
                      className="h-auto object-contain yellow-stars"
                      style={{ 
                        height: '20px'
                      }}
                    />
                  </div>
                  
                  <p className="testimonial-title" style={{ 
                    color: '#4C4A3C',
                    fontSize: 'min(4.6vw, 1.125rem)',
                    fontWeight: '500',
                    lineHeight: '1.4',
                    marginBottom: '8px'
                  }}>
                    {testimonial.title}
                  </p>
                  <p className="testimonial-subtitle" style={{ 
                    color: '#7B7968',
                    fontSize: 'min(4vw, 1rem)',
                    fontWeight: '400',
                    lineHeight: '1.3'
                  }}>
                    {testimonial.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Container with integrated gradient */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          showCTA ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Gradient frame above CTA */}
        <div 
          className="w-full gradient-frame"
          style={{ 
            height: '36px',
            background: 'linear-gradient(to top, #E9D37C 0%, rgba(233, 211, 124, 0) 100%)'
          }}
        />
        
        {/* CTA Container */}
        <div 
          className="cta-container"
          style={{
            backgroundColor: '#E9D37C'
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
                sendToFlutter(JSON.stringify({
                  "event": "onboarding-complete",
                  "eventProperties": {
                    "onboarding_version": 6.1
                  }
                }));
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