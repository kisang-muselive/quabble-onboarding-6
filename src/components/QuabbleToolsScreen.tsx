import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface QuabbleToolsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function QuabbleToolsScreen({
  onBack,
  onNext
}: QuabbleToolsScreenProps) {
  const { t } = useLanguage();

  const tools = [
    { image: '/images/quabble-tool-1.png', nameKey: 'quabbleTools.moodDiary' },
    { image: '/images/quabble-tool-2.png', nameKey: 'quabbleTools.meditation' },
    { image: '/images/quabble-tool-3.png', nameKey: 'quabbleTools.bambooForest' },
    { image: '/images/quabble-tool-4.png', nameKey: 'quabbleTools.oneMinBreathing' },
    { image: '/images/quabble-tool-5.png', nameKey: 'quabbleTools.watermelonTaiChi' },
    { image: '/images/quabble-tool-6.png', nameKey: 'quabbleTools.proudDandelion' },
    { image: '/images/quabble-tool-7.png', nameKey: 'quabbleTools.gratitudeJar' },
    { image: '/images/quabble-tool-8.png', nameKey: 'quabbleTools.worryBox' },
    { image: '/images/quabble-tool-9.png', nameKey: 'quabbleTools.treasureBox' },
    { image: '/images/quabble-tool-10.png', nameKey: 'quabbleTools.safePlace' },
    { image: '/images/quabble-tool-11.png', nameKey: 'quabbleTools.moonlight' },
    { image: '/images/quabble-tool-12.png', nameKey: 'quabbleTools.outdoorWalk' },
    { image: '/images/quabble-tool-13.png', nameKey: 'quabbleTools.fiveFourThreeTwoOne' },
    { image: '/images/quabble-tool-14.png', nameKey: 'quabbleTools.pleasantActivities' },
    { image: '/images/quabble-tool-15.png', nameKey: 'quabbleTools.thankYou' },
    { image: '/images/quabble-tool-16.png', nameKey: 'quabbleTools.dearSelf' },
    { image: '/images/quabble-tool-17.png', nameKey: 'quabbleTools.smartGoals' },
    { image: '/images/quabble-tool-18.png', nameKey: 'quabbleTools.mindfulEating' }
  ];

  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_workout_list",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <div className="flex flex-col w-full h-screen bg-[#D2E5D4] text-gray-800 relative overflow-hidden">
      {/* Fixed Header - Back button */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col items-center px-3 sm:px-4 mt-6">
        
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center justify-center mb-10 sm:mb-14 flex-shrink-0">
        <h1 className="font-medium text-center leading-tight mb-3 sm:mb-4" style={{ 
          color: '#4C4A3C',
          fontSize: 'min(6.5vw, 2.25rem)'
        }}>
          {(() => {
            const title = t('quabbleTools.title');
            const words = title.split(' ');
            const breakPoint = words.indexOf('for');
            if (breakPoint > 0) {
              return (
                <>
                  {words.slice(0, breakPoint).join(' ')}
                  <br />
                  {words.slice(breakPoint).join(' ')}
                </>
              );
            }
            return title;
          })()}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-normal text-center" style={{ color: '#7B7968' }}>
          {(() => {
            const subtitle = t('quabbleTools.subtitle');
            const words = subtitle.split(' ');
            const breakPoint = words.indexOf('available');
            if (breakPoint > 0) {
              return (
                <>
                  {words.slice(0, breakPoint).join(' ')}
                  <br />
                  {words.slice(breakPoint).join(' ')}
                </>
              );
            }
            return subtitle;
          })()}
        </p>
      </div>
      
      {/* Tools Grid */}
      <div className="flex-1 px-3 sm:px-4 flex justify-center">
        <div className="max-w-md w-full">
          <div 
            className="grid grid-cols-4 gap-1 sm:gap-2 overflow-y-auto"
            style={{ 
              height: 'calc(100vh - 20rem)', // Fixed height for scrollable area
              paddingBottom: '5rem', // More space at bottom of scroll area
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none' // IE and Edge
            }}
          >
            {tools.map((tool, index) => (
              <div key={index} className="flex flex-col items-center h-36">
                <img
                  src={tool.image}
                  alt={t(tool.nameKey)}
                  className="w-24 h-24 object-contain"
                  style={{ marginBottom: '0.25vh' }}
                />
                <span 
                  className="text-xs text-center leading-tight break-words"
                  style={{ 
                    color: '#7B7968', 
                    lineHeight: '1.2', 
                    whiteSpace: 'pre-line',
                    paddingBottom: '1vh'
                  }}
                >
                  {t(tool.nameKey).replace(' ', '\n')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#D2E5D4] z-50" 
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
      
      .overflow-y-auto::-webkit-scrollbar {
        display: none;
      }
      
      @media (max-width: 375px) {
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
      }
      
      @media (max-height: 667px) {
        .mb-6 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 1.5rem; }
        .mb-3 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 0.75rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
  </>;
}