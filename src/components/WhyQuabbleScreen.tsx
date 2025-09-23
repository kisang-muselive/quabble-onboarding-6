import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WhyQuabbleScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function WhyQuabbleScreen({ onBack, onNext }: WhyQuabbleScreenProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_just_what_you_need",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '5vh' }}>
        <div className="flex items-center justify-between w-full mb-12 sm:mb-16">
          <div className="p-2 w-10 h-10"></div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col items-center justify-center mb-20 sm:mb-24 text-center max-w-sm">
          <h1 className="font-medium leading-tight" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            {t('whyQuabble.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('whyQuabble.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/why-quabble-duck.png"
            alt="Why Quabble Duck"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(120vw, 900px)',
              maxHeight: 'min(95vh, 850px)'
            }}
          />
        </div>
      </div>

      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F0E8] z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
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
  );
}