import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WorkoutListProps {
  onBack: () => void;
  onNext: () => void;
}

export function WorkoutList({ onBack, onNext }: WorkoutListProps) {
  const { t } = useLanguage();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showCTA, setShowCTA] = useState(false);
  
  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_workout_list",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));

    // 순차적으로 각 그리드 아이템을 표시
    const animationTimers: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < 18; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * 100); // 100ms 간격으로 순차 등장
      
      animationTimers.push(timer);
    }

    // 모든 아이템이 나타난 후 CTA 표시
    const ctaTimer = setTimeout(() => {
      setShowCTA(true);
    }, 18 * 100 + 300); // 모든 아이템 + 300ms 후

    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(ctaTimer);
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen text-gray-800 relative screen-container" style={{ backgroundColor: '#FFEFCB' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#FFEFCB',
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
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>

      <div className="flex flex-col items-center px-9 main-content" style={{ paddingBottom: '120px' }}>
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            Try everything and find<br />what works best for you
          </h1>
          
          <p className="text-center subtitle-text" style={{ 
            color: '#7B7968',
            fontSize: 'min(4vw, 1rem)',
            marginTop: '12px',
            lineHeight: '1.4'
          }}>
            18 different workouts across 6 categories available now and more to come!
          </p>
        </div>

        {/* Workout Grid */}
        <div className="workout-grid-container" style={{ 
          marginTop: '36px', 
          marginLeft: '-36px',  // 상위 패딩 36px를 완전히 상쇄
          marginRight: '-36px', // 상위 패딩 36px를 완전히 상쇄
          paddingLeft: '16px',  // 실제 원하는 좌측 마진 16px
          paddingRight: '16px', // 실제 원하는 우측 마진 16px
          width: 'calc(100% + 72px)' // 음수 마진 72px만큼 너비 증가
        }}>
          <div className="grid grid-cols-4 mx-auto" style={{ 
            gap: '8px 8px',
            rowGap: '12px',
            maxWidth: '400px'
          }}>
            {[
                { image: 'quabble-tool-1.png', title: 'Mood Diary' },
                { image: 'quabble-tool-2.png', title: 'Meditation' },
                { image: 'quabble-tool-3.png', title: 'Bamboo Forest' },
                { image: 'quabble-tool-4.png', title: '1min Breathing' },
                { image: 'quabble-tool-5.png', title: 'Watermelon Tai Chi' },
                { image: 'quabble-tool-6.png', title: 'Proud Dandelion' },
                { image: 'quabble-tool-7.png', title: 'Gratitude Jar' },
                { image: 'quabble-tool-8.png', title: 'Worry Box' },
                { image: 'quabble-tool-9.png', title: 'Treasure Box' },
                { image: 'quabble-tool-10.png', title: 'Safe Place' },
                { image: 'quabble-tool-11.png', title: 'Moonlight' },
                { image: 'quabble-tool-12.png', title: 'Outdoor Walk' },
                { image: 'quabble-tool-13.png', title: '54321' },
                { image: 'quabble-tool-14.png', title: 'Pleasant Activity' },
                { image: 'quabble-tool-15.png', title: 'Thank You' },
                { image: 'quabble-tool-16.png', title: 'Dear Self' },
                { image: 'quabble-tool-17.png', title: 'SMART Goals' },
                { image: 'quabble-tool-18.png', title: 'Mindful Eating' }
              ].map((workout, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center workout-item transition-all duration-500 ease-out ${
                  visibleItems.includes(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <img
                  src={workout.image.startsWith('http') || workout.image.startsWith('/') && !workout.image.startsWith('/images/') ? 
                    workout.image : `/images/${workout.image}`}
                  alt={workout.title}
                  className="w-full h-auto object-contain"
                  style={{ 
                    aspectRatio: '1',
                    borderRadius: '8px'
                  }}
                />
                <p className="text-center workout-title" style={{ 
                  color: '#7B7968',
                  fontSize: 'min(3.2vw, 0.75rem)', // 반응형 크기 증가
                  fontWeight: '500',
                  marginTop: '4px',
                  lineHeight: '1.3',
                  wordWrap: 'break-word',
                  height: 'calc(1.3em * 2)', // 두 줄 높이로 고정
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {workout.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Container with integrated gradient - matching AgeGroup.tsx */}
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
            background: 'linear-gradient(to top, #FFEFCB 0%, rgba(255, 239, 203, 0) 100%)'
          }}
        />
        
        {/* CTA Container */}
        <div 
          className="cta-container"
          style={{
            backgroundColor: '#FFEFCB'
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
