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
  questionsLoaded?: boolean;
}

export function WhereDidYouHearAboutUs({
  onBack,
  onNext,
  onSkip,
  questionData,
  questionsLoaded
}: WhereDidYouHearAboutUsProps) {
  const { t } = useLanguage();
  const { addSelection } = useSelections();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = questionData ? 
    questionData.options.map(option => ({
      key: option.text,
      systemName: option.text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '')
    })) :
    [
      { key: 'Social Media', systemName: 'social_media' },
      { key: 'Search Engine', systemName: 'search_engine' },
      { key: 'Friend/Family', systemName: 'friend_family' },
      { key: 'Advertisement', systemName: 'advertisement' },
      { key: 'App Store', systemName: 'app_store' },
      { key: 'Other', systemName: 'other' }
    ];

  useEffect(() => {
    if (questionsLoaded && questionData) {
      sendToFlutter(JSON.stringify({
        "event": "view_where_heard_about_us",
        "eventProperties": {
          "onboarding_version": 4.0
        }
      }));
    }
  }, [questionsLoaded, questionData]);

  const handleOptionClick = (option: { key: string; systemName: string }) => {
    sendToFlutter(JSON.stringify({
      "event": "heptic",
    }));
    
    setSelectedOption(option.key);
  };

  const handleNext = () => {
    if (selectedOption) {
      const selectedOptionData = options.find(opt => opt.key === selectedOption);
      if (selectedOptionData) {
        addSelection('where_heard_about_us', selectedOptionData.systemName);
        
        sendToFlutter(JSON.stringify({
          "event": "click_next_where_heard_about_us",
          "eventProperties": {
            "onboarding_version": 4.0
          },
          "userProperties": {
            "where_heard_about_us": selectedOptionData.systemName,
            "onboarding_version": 4.0
          }
        }));
      }
    }
    onNext();
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] text-gray-800 px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        {onBack && (
          <button className="p-2 text-gray-800" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="flex-1"></div>
        <button className="p-2 text-gray-500 font-medium" onClick={onSkip}>
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1">
        {/* Title */}
        <div className="text-center mb-8 px-4">
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
            Where did you hear about us?
          </h1>
        </div>

        {/* Options */}
        <div className="w-full max-w-md space-y-3 mb-8">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 rounded-lg border text-left font-normal transition-colors ${
                selectedOption === option.key
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.key}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {selectedOption && (
        <div className="fixed bottom-0 left-0 right-0 z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6">
            <div className="max-w-md mx-auto">
              <button
                className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                style={{ 
                  height: '7.5vh',
                  fontSize: '2.5vh'
                }}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}