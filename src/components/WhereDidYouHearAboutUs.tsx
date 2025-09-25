import { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { Question } from '../services/questionsService';

interface WhereDidYouHearAboutUsProps {
  onNext: () => void;
  onSkip: () => void;
  questionData?: Question;
  questionsLoaded: boolean;
}

export function WhereDidYouHearAboutUs({
  onNext,
  onSkip,
  questionData,
  questionsLoaded
}: WhereDidYouHearAboutUsProps) {
  const { t } = useLanguage();
  const { addSelection } = useSelections();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const defaultOptions = [
    { key: 'referral.socialMedia', systemName: 'social_media' },
    { key: 'referral.friendFamily', systemName: 'friend_family' },
    { key: 'referral.searchEngine', systemName: 'search_engine' },
    { key: 'referral.advertisement', systemName: 'advertisement' },
    { key: 'referral.appStore', systemName: 'app_store' },
    { key: 'referral.other', systemName: 'other' }
  ];

  const options = questionData && questionsLoaded ? 
    questionData.options.map(option => ({
      key: option.text,
      systemName: option.text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '')
    })) : defaultOptions;

  useEffect(() => {
    // Function to be called when the component mounts
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_1:landing"}');
  }, []);

  const handleOptionSelect = (optionSystemName: string) => {
    setSelectedOption(optionSystemName);
    
    // Add selection to context
    addSelection({
      questionId: questionData?.id || 1,
      questionText: questionData?.question || 'Where did you hear about us?',
      selectedOption: optionSystemName,
      timestamp: new Date().toISOString()
    });

    sendToFlutter(JSON.stringify({
      "event": "heptic",
    }));
  };

  const handleNext = () => {
    if (selectedOption) {
      sendToFlutter(JSON.stringify({
        "event": "referral_selected",
        "option": selectedOption
      }));
      onNext();
    }
  };

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] text-gray-800 px-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <div className="w-8"></div>
          <button 
            className="p-2 text-gray-500 font-medium" 
            onClick={onSkip}
          >
            Skip
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1">
          {/* Title */}
          <div className="text-center mb-12 px-4">
            <h1 
              className="font-normal text-gray-800 leading-tight"
              style={{ fontSize: 'min(6vw, 2rem)' }}
            >
              {questionData?.question || 'Where did you hear about us?'}
            </h1>
          </div>

          {/* Options */}
          <div className="w-full max-w-md space-y-4 mb-8">
            {options.map((option) => (
              <button
                key={option.systemName}
                className={`w-full p-4 rounded-2xl border-2 text-left font-normal transition-all duration-200 ${
                  selectedOption === option.systemName
                    ? 'border-[#f2994a] bg-[#f2994a] text-white'
                    : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400'
                }`}
                style={{ fontSize: 'min(4vw, 1.1rem)' }}
                onClick={() => handleOptionSelect(option.systemName)}
              >
                {questionData && questionsLoaded ? option.key : t(option.key)}
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
      
      <style>{`
        .touch-target {
          min-height: 48px;
          min-width: 48px;
        }
      `}</style>
    </>
  );
}
