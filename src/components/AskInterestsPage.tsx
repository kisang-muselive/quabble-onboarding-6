import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface AskInterestsPageProps {
  onBack: () => void;
  onNext: () => void;
}

export function AskInterestsPage({
  onBack,
  onNext
}: AskInterestsPageProps) {
  const { t } = useLanguage();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_interested_activity",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);
  
  const interestOptions = [
    [
      { nameKey: 'askInterests.breathing', icon: '21-icon-1.png', bgColor: '#E0EAED', darkColor: '#8FA5AB' },
      { nameKey: 'askInterests.moodTracking', icon: '21-icon-2.png', bgColor: '#E4DEE4', darkColor: '#A396A4' },
      { nameKey: 'askInterests.journaling', icon: '21-icon-3.png', bgColor: '#F3F1E5', darkColor: '#C4B888' }
    ],
    [
      { nameKey: 'askInterests.selfLove', icon: '21-icon-4.png', bgColor: '#FCD9D1', darkColor: '#E5A085' },
      { nameKey: 'askInterests.gratitude', icon: '21-icon-5.png', bgColor: '#F2EBC0', darkColor: '#D4C56E' },
      { nameKey: 'askInterests.meditation', icon: '21-icon-6.png', bgColor: '#D3EDE4', darkColor: '#8BB3A3' }
    ],
    [
      { nameKey: 'askInterests.physical', icon: '21-icon-7.png', bgColor: '#D2E5D4', darkColor: '#7DB087' },
      { nameKey: 'askInterests.sleep', icon: '21-icon-8.png', bgColor: '#525F72', darkColor: '#353E4A' },
      { nameKey: 'askInterests.productivity', icon: '21-icon-9.png', bgColor: '#B5D5FF', darkColor: '#6BA3E6' }
    ]
  ];

  const handleInterestClick = (interestKey: string) => {
    sendToFlutter(JSON.stringify(
      {"event": "heptic"}
    ));
    setSelectedInterests(prev => 
      prev.includes(interestKey)
        ? prev.filter(i => i !== interestKey)
        : [...prev, interestKey]
    );
  };

  const isSelected = (interestKey: string) => selectedInterests.includes(interestKey);

  return (
    <>
    <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] text-gray-800 px-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <button className="p-2" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1" style={{ paddingBottom: '9rem' }}>
                          {/* Title */}
        <div className="text-center px-4" style={{ marginBottom: '0.8vh', marginTop: '-2vh' }}>
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: '3vh' }}>
            {(() => {
              const title = t('askInterests.title');
              const words = title.split(' ');
              const breakPoint = words.indexOf('interested');
              if (breakPoint > 0) {
                return (
                  <>
                    {words.slice(0, breakPoint).join(' ')}<br />
                    {words.slice(breakPoint).join(' ')}
                  </>
                );
              }
              return title;
            })()}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center px-4" style={{ marginBottom: '2.3vh' }}>
            <p style={{ color: '#7B7968', fontSize: '2vh' }}>
              {t('askInterests.subtitle')}
            </p>
          </div>

        </div>

        {/* Interest options grid - positioned at 30% from top */}
        <div className="fixed left-0 right-0 z-40" style={{ top: '30vh' }}>
          <div className="w-full px-5">
            <div className="w-full px-1 space-y-1 mb-8">
              {interestOptions.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                {row.map((interest) => (
                  <button
                    key={interest.nameKey}
                    className="flex-1 aspect-square p-2 rounded-3xl text-xs font-medium transition-colors relative"
                    style={{ 
                      backgroundColor: interest.bgColor,
                      color: interest.bgColor === '#525F72' ? 'white' : '#605D4E',
                      minHeight: '0',
                      height: 'auto'
                    }}
                    onClick={() => handleInterestClick(interest.nameKey)}
                  >
                    <img 
                      src={`/images/${interest.icon}`} 
                      alt={t(interest.nameKey)}
                      className="w-7 h-7 object-contain absolute top-3 left-3"
                    />
                    {isSelected(interest.nameKey) && (
                      <div 
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: interest.darkColor }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <div className="flex items-end h-full pl-2 pb-2">
                      <span className="text-left leading-tight text-base font-medium whitespace-pre-line">
                        {t(interest.nameKey).replace(' ', '\n')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Next Button - same format as FocusScreen */}
        <div className="fixed bottom-0 left-0 right-0 z-50" 
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
                  sendToFlutter(JSON.stringify({
                    "event": "click_next_ob_survey_interested_activity",
                    "eventProperties": {
                      "onboarding_version": 4.0,
                      "survey_interested_activity": selectedInterests.join(', ') || ""
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