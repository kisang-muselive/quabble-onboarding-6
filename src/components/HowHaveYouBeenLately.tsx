import { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { Question } from '../services/questionsService';

interface WhereDidYouHearAboutUsProps {
  onBack?: () => void;
  onNext: () => void;
  onSkip: () => void;
  questionData?: Question;
  questionsLoaded: boolean;
}

export function WhereDidYouHearAboutUs({ onBack, onNext, onSkip, questionData, questionsLoaded }: WhereDidYouHearAboutUsProps) {
  const { t } = useLanguage();
  const { addSelection } = useSelections();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCTA, setShowCTA] = useState(false);
  
  // Use dynamic question data if available, otherwise fallback to localized options
  const options = questionData ? 
    questionData.options.map(option => option.text) :
    [
      t('whereHear.appSearch'),
      t('whereHear.socialMedia'),
      t('whereHear.friendFamily'),
      t('whereHear.other')
    ];
  
  // Mapping from option index to system names
  const toggleSystemNames: { [key: number]: string } = questionData ?
    questionData.options.reduce((acc, option, index) => {
      acc[index] = option.text.toLowerCase().replace(/\s+/g, '');
      return acc;
    }, {} as { [key: number]: string }) :
    {
      0: 'appsearch',
      1: 'socialmediaad',
      2: 'friendfamily',
      3: 'other'
    };

  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_first_hear_us",
      "eventProperties": {
        "onboarding_version": 4.0
      },
      "userProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  const handleOptionClick = (option: string) => {
    sendToFlutter(JSON.stringify({
      "event": "heptic",
    }));
    if (selectedOption === option) {
      // If clicking the same option, deselect it
      setSelectedOption(null);
      setShowCTA(false);
    } else {
      // Select new option
      setSelectedOption(option);
      setShowCTA(true);
    }
  };

  return (
    <>
      <style>{`
        .scrollable-options::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex flex-col w-full h-screen bg-[#faf7f0] text-gray-800 relative overflow-hidden" style={{ border: '2px solid red' }}>
        {/* Fixed Header - Moderately sized */}
        <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
             style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))', border: '2px solid green' }}>
          {onBack && (
            <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {!onBack && <div className="w-12 h-12"></div>}
          <div className="flex-1"></div>
          <button className="p-3 text-lg sm:text-xl font-normal touch-target" onClick={() => {
            sendToFlutter(JSON.stringify({
              "event": "click_skip_ob_survey_first_hear_us",
              "eventProperties": {
                "onboarding_version": 4.0
              }
            }));
            onSkip();
          }} style={{ color: '#7B7968' }}>
            {t('skip')}
          </button>
        </div>
        
        {/* Title - with padding */}
        <div className="flex justify-center mb-4 sm:mb-5 px-5 flex-shrink-0 mt-4" style={{ border: '2px solid yellow' }}>
          <h1 className="font-medium leading-tight text-center" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)',
            border: '2px solid cyan'
          }}>
            {(questionData ? questionData.text : t('whereHear.title')).split(/[\n\s]+/).reduce((acc, word, index, words) => {
              const midpoint = Math.ceil(words.length / 2);
              if (index === midpoint) acc.push(<br key={`br-${index}`} />);
              acc.push(word);
              if (index < words.length - 1 && index !== midpoint - 1) acc.push(' ');
              return acc;
            }, [] as (string | JSX.Element)[])}
          </h1>
        </div>
        
        {/* Image with viewport-based padding */}
        <div 
          className="flex justify-center px-5 flex-shrink-0"
          style={{ 
            paddingTop: '0.25vh', /* 1/400 of viewport height */
            paddingBottom: '2vh',  /* 1/50 of viewport height */
            border: '2px solid magenta'
          }}
        >
          <div
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
            style={{ height: '20vh', border: '2px solid lime' }}          /* Bigger image */
          >
            <img
              src="/images/1-duck.png"
              alt="Where did you hear about us illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Option Buttons with bigger text */}
        <div 
          className="flex-1 overflow-y-auto scrollable-options" 
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingBottom: '9rem', // Space for fixed button
            paddingLeft: '8vw', // 1/12.5 of viewport width
            paddingRight: '8vw', // 1/12.5 of viewport width
            border: '2px solid purple'
          }}
        >
          <div className="w-full max-w-md mx-auto space-y-3 sm:space-y-4" style={{ border: '2px solid orange' }}>
            {options.map(option => (
              <button
                key={option}
                className={`w-full px-6 sm:px-7 rounded-full text-center font-normal transition-colors touch-target ${
                  selectedOption === option
                    ? 'bg-white border-2'
                    : 'bg-white border-2'
                }`}
                style={{
                  color: selectedOption === option ? '#F28C39' : '#4C4A3C',
                  borderColor: selectedOption === option ? '#F28C39' : '#E1E0D3',
                  height: '7.5vh', // Slightly bigger button height
                  fontSize: '2.5vh', // 1/40 of viewport height
                  border: selectedOption === option ? '2px solid orange' : '2px solid #E1E0D3'
                }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {/* Next Button - conditional with animation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
             style={{ 
               paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
               backgroundColor: '#faf7f0',
               background: 'linear-gradient(to bottom, rgba(250, 247, 240, 0) 0%, rgba(250, 247, 240, 1) 100%)',
               transform: showCTA ? 'translateY(0)' : 'translateY(100%)',
               opacity: showCTA ? 1 : 0
             }}>
          <div style={{ margin: '36px 36px 20px 36px', border: '2px solid blue' }}>
            <div className="max-w-md mx-auto" style={{ border: '2px solid green' }}>
              <button
                className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal transition-colors touch-target"
                style={{ 
                  height: '7.5vh',
                  fontSize: '2.5vh',
                  backgroundColor: '#F28C39',
                  border: '2px solid yellow'
                }}
                disabled={!selectedOption}
                onClick={() => {
                  // Get system name for selected option using index
                  const optionIndex = selectedOption ? options.indexOf(selectedOption) : -1;
                  const systemName = optionIndex >= 0 ? toggleSystemNames[optionIndex] : null;
                  
                  // Add selection to context if we have question data with option IDs
                  if (questionData && optionIndex >= 0) {
                    const selectedOptionId = questionData.options[optionIndex].id;
                    addSelection(selectedOptionId);
                  }
                  sendToFlutter(JSON.stringify({
                    "event": "click_next_ob_survey_first_hear_us",
                    "eventProperties": {
                      "onboarding_version": 4.0
                    },
                    "userProperties": {
                      "survey_first_hear_us": systemName || selectedOption || "",
                      "onboarding_version": 4.0
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
      
      <style>{`
        .touch-target {
          min-height: 48px;
          min-width: 48px;
        }
        
        @media (max-width: 375px) {
          .text-2xl { font-size: 1.5rem; }
          .text-3xl { font-size: 1.875rem; }
          .text-xl { font-size: 1.25rem; }
          .text-lg { font-size: 1.125rem; }
        }
        
        @media (max-height: 667px) {
          .space-y-3 > * + * { margin-top: 0.5rem; }
          .space-y-4 > * + * { margin-top: 0.75rem; }
          .mb-4 { margin-bottom: 0.75rem; }
          .mb-5 { margin-bottom: 1rem; }
        }
        
        @media (min-width: 768px) {
          .text-2xl { font-size: 2rem; }
          .text-3xl { font-size: 2.25rem; }
          .text-xl { font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}