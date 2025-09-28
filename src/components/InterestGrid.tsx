import { useEffect, useRef, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { useMetadata } from '../contexts/MetadataContext';
import { Question } from '../services/questionsService';

interface InterestGridProps {
  onBack: () => void;
  onNext: () => void;
  questionData?: Question;
}

export function InterestGrid({ onBack, onNext, questionData }: InterestGridProps) {
  const { t } = useLanguage();
  const { setPracticeIds, addSelection } = useSelections();
  const { metadata, fetchMetadata } = useMetadata();
  const lottieRef = useRef<any>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showCTA, setShowCTA] = useState(false);

  // Get practice metadata from context or use defaults
  const practices = metadata?.practice || [
    { id: 14, type: "practice", name: "breathing", displayName: "Breathing exercises" },
    { id: 17, type: "practice", name: "mood", displayName: "Mood tracking" },
    { id: 15, type: "practice", name: "journaling", displayName: "Journaling" },
    { id: 18, type: "practice", name: "selflove", displayName: "Self-love" },
    { id: 19, type: "practice", name: "gratitude", displayName: "Gratitude practices" },
    { id: 16, type: "practice", name: "meditation", displayName: "Meditation" },
    { id: 20, type: "practice", name: "physical", displayName: "Physical activities" },
    { id: 21, type: "practice", name: "sleep", displayName: "Better sleep" },
    { id: 27, type: "practice", name: "productivity", displayName: "Productivity" }
  ];

  // Map grid items with their corresponding practice IDs from metadata
  const gridItems = [
    { icon: '21-icon-1.png', text: practices[0].displayName, activeColor: '#E0EAED', practiceId: practices[0].id },
    { icon: '21-icon-2.png', text: practices[1].displayName, activeColor: '#E4DEE4', practiceId: practices[1].id },
    { icon: '21-icon-3.png', text: practices[2].displayName, activeColor: '#F7D9B9', practiceId: practices[2].id },
    { icon: '21-icon-4.png', text: practices[3].displayName, activeColor: '#FCD9D1', practiceId: practices[3].id },
    { icon: '21-icon-5.png', text: practices[4].displayName, activeColor: '#F2EBC0', practiceId: practices[4].id },
    { icon: '21-icon-6.png', text: practices[5].displayName, activeColor: '#D3EDE4', practiceId: practices[5].id },
    { icon: '21-icon-7.png', text: practices[6].displayName, activeColor: '#D2E5D4', practiceId: practices[6].id },
    { icon: '21-icon-8.png', text: practices[7].displayName, activeColor: '#525F72', practiceId: practices[7].id },
    { icon: '21-icon-9.png', text: practices[8].displayName, activeColor: '#D1DEEE', practiceId: practices[8].id }
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
        "onboarding_version": 6.0
      }
    }));
    
    // Fetch metadata if not already available
    if (!metadata) {
      fetchMetadata();
    }
  }, [metadata, fetchMetadata]);

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
                // Save selected practice IDs to context
                const selectedPracticeIds = selectedItems.map(index => gridItems[index].practiceId);
                
                // If we have question data, use the new selection approach
                if (questionData) {
                  // Add all selected options to the context
                  selectedItems.forEach(index => {
                    const optionId = questionData.options[index]?.id;
                    if (optionId) {
                      addSelection(optionId);
                    }
                  });
                } else {
                  // Use the practice IDs approach for backward compatibility
                  setPracticeIds(selectedPracticeIds);
                }
                console.log('Selected practice IDs:', selectedPracticeIds);
                const selectedInterests = selectedPracticeIds.join(', ');
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_survey_interested_activity",
                  "eventProperties": {
                    "onboarding_version": 6.0
                  },
                  "userProperties": {
                    "survey_interested_activity": selectedInterests || "",
                    "onboarding_version": 6.0
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
