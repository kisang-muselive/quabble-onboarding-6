import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface SupportSystemScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function SupportSystemScreen({
  onBack,
  onNext
}: SupportSystemScreenProps) {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_support_system",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);
  
  const options = [
    { key: 'support.excellent', systemName: 'excellent' },
    { key: 'support.good', systemName: 'good' },
    { key: 'support.limited', systemName: 'limited' },
    { key: 'support.poor', systemName: 'poor' }
  ];

  const handleOptionClick = (optionKey: string) => {
    sendToFlutter(JSON.stringify(
      {"event": "heptic"}
    ));
    setSelectedOption(optionKey);
  };

  return (
    <>
      <style>{`
        .scrollable-options::-webkit-scrollbar {
          display: none;
        }
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
      <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/22-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen px-4">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <button className="p-2 text-gray-800" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1">
          {/* Question text */}
          <div className="text-center px-4" style={{ marginBottom: '0.8vh', marginTop: '-2vh' }}>
            <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: '3vh' }}>
              {t('support.title')}
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="text-center px-4" style={{ marginBottom: '2.3vh' }}>
            <p style={{ color: '#7B7968', fontSize: '2vh' }}>
              {t('support.subtitle')}
            </p>
          </div>
          
        </div>

        {/* Options positioned at 58% from top */}
        <div className="fixed left-0 right-0 z-40" style={{ top: '58vh' }}>
          <div className="max-w-md mx-auto px-4">
            <div className="w-3/4 mx-auto">
              {options.map((option, index) => (
                <button
                  key={option.key}
                  className={`w-full px-6 md:px-5 rounded-full text-center text-lg font-medium transition-colors ${
                    selectedOption === option.key
                        ? 'bg-[#f2994a] text-white' 
                        : 'bg-white text-black'
                  }`}
                  style={{ 
                    marginBottom: index < options.length - 1 ? '1vh' : '0',
                    height: '6vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => handleOptionClick(option.key)}
                >
                  {t(option.key)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Done Button - only show when option is selected */}
        {selectedOption && (
          <div className="fixed bottom-0 left-0 right-0 z-50 slide-up-animation" 
               style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <div className="p-5 sm:p-6">
              <div className="max-w-md mx-auto">
                <button
                  className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                  style={{ 
                    height: '7.5vh', // Slightly bigger button height (same as option buttons)
                    fontSize: '2.5vh' // 1/40 of viewport height
                  }}
                  onClick={() => {
                    // Get system name for selected option
                    const selectedOptionData = selectedOption ? options.find(opt => opt.key === selectedOption) : null;
                    const systemName = selectedOptionData ? selectedOptionData.systemName : null;
                    sendToFlutter(JSON.stringify({
                      "event": "click_next_ob_survey_support_system",
                      "eventProperties": {
                        "onboarding_version": 4.0
                      },
                      "userProperties": {
                        "survey_support_system": systemName || selectedOption || "",
                        "onboarding_version": 4.0
                      }
                    }));
                    onNext();
                  }}
                >
                  {t('done')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
} 