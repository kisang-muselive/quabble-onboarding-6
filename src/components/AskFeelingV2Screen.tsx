import { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface AskFeelingV2ScreenProps {
  onBack: () => void;
  onNext: (feelingChoice: 'difficult_recently' | 'ongoing_challenges' | 'doing_okay') => void;
  onSkip: () => void;
}

export function AskFeelingV2Screen({
  onBack,
  onNext,
  onSkip
}: AskFeelingV2ScreenProps) {
  const { t } = useLanguage();
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  
  const feelingOptions = [
    t('askFeelingV2.difficultDetailed'),
    t('askFeelingV2.ongoingDetailed'),
    t('askFeelingV2.okayDetailed')
  ];
  
  // Mapping from display options to system names
  const toggleSystemNames: { [key: string]: string } = {
    [t('askFeelingV2.difficultDetailed')]: 'difficult_recently',
    [t('askFeelingV2.ongoingDetailed')]: 'ongoing_challenges',
    [t('askFeelingV2.okayDetailed')]: 'doing_okay'
  };

  const handleFeelingClick = (feeling: string) => {
    sendToFlutter(JSON.stringify(
      {"event": "heptic"}
    ));
    setSelectedFeeling(feeling);
  };

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_how_have_you_been",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-[#faf7f0] text-gray-800 relative overflow-hidden">
        {/* Fixed Header - Moderately sized */}
        <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
             style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
          <button className="p-3" onClick={onBack} style={{ color: '#7B7968', minHeight: '48px', minWidth: '48px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
          {/* <button className="p-3 text-lg sm:text-xl font-normal" onClick={onSkip} style={{ color: '#7B7968', minHeight: '48px', minWidth: '48px' }}>
            Skip
          </button> */}
        </div>
        
        {/* Title - with padding */}
        <div className="flex justify-center mb-4 sm:mb-5 px-5 flex-shrink-0 mt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center leading-tight" style={{ color: '#4C4A3C' }}>
            {t('askFeelingV2.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('askFeelingV2.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
        
        {/* Image with viewport-based padding */}
        <div 
          className="flex justify-center px-5 flex-shrink-0"
          style={{ 
            paddingTop: '0.25vh',
            paddingBottom: '2vh'
          }}
        >
          <div
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
            style={{ height: '20vh' }}
          >
            <img
              src="/images/1-duck.png"
              alt="How have you been feeling illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Option Buttons with bigger text */}
        <div 
          className="flex-1 overflow-y-auto" 
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingBottom: '9rem',
            paddingLeft: '8vw',
            paddingRight: '8vw'
          }}
        >
          <div className="w-full max-w-md mx-auto space-y-3 sm:space-y-4">
            {feelingOptions.map(feeling => (
              <button 
                key={feeling} 
                className={`w-full px-6 sm:px-7 rounded-3xl text-center font-normal transition-colors ${
                  selectedFeeling === feeling 
                    ? 'bg-[#f2994a] text-white' 
                    : 'bg-white border-2'
                }`}
                style={{ 
                  color: selectedFeeling === feeling ? 'white' : '#4C4A3C',
                  borderColor: selectedFeeling === feeling ? 'transparent' : '#E1E0D3',
                  height: '10.5vh',
                  fontSize: '2.5vh',
                  minHeight: '48px',
                  minWidth: '48px'
                }}
                onClick={() => handleFeelingClick(feeling)}
              >
                {feeling}
              </button>
            ))}
          </div>
        </div>
        
        {/* Next Button - only show when feeling is selected */}
        {selectedFeeling && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50 slide-up-animation" 
               style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
              <div className="max-w-md mx-auto">
                <button
                  className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                                   style={{ 
                     height: '7.5vh', // Slightly bigger button height (same as option buttons)
                     fontSize: '2.5vh' // 1/40 of viewport height
                   }}
                  onClick={() => {
                    const systemName = selectedFeeling ? toggleSystemNames[selectedFeeling] : null;

                    sendToFlutter(JSON.stringify({
                      "event": "click_next_ob_survey_how_have_you_been",
                      "eventProperties": {
                        "onboarding_version": 4.0
                      },
                      "userProperties": {
                        "survey_how_have_you_been": systemName || selectedFeeling || "",
                        "onboarding_version": 4.0
                      }
                    }));
                    
                    if (systemName && (systemName === 'difficult_recently' || systemName === 'ongoing_challenges' || systemName === 'doing_okay')) {
                      onNext(systemName);
                    }
                  }}
                >
                  {t('next')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

<style>{`
  .slide-up-animation {
    animation: slideUpFromBottom 0.2s ease-out forwards;
  }
  
  @keyframes slideUpFromBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
`}</style>