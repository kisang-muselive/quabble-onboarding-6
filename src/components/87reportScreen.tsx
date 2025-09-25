import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface ReportScreen87Props {
  onBack: () => void;
  onNext: () => void;
}

export function ReportScreen87({ onBack, onNext }: ReportScreen87Props) {
  const { t } = useLanguage();
  const [animationData, setAnimationData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_87_report",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));

    // Try to load the Lottie animation data
    const loadLottieData = async () => {
      try {
        const response = await fetch('/images/87-lottie.json');
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        } else {
          setLoadingError(true);
        }
      } catch (error) {
        console.log('Lottie file not found, falling back to PNG');
        setLoadingError(true);
      }
    };

    loadLottieData();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '5vh' }}>
        <div className="flex items-center justify-between w-full mb-8 sm:mb-12">
          <button className="p-2 text-gray-800" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Welcome Message */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center max-w-md px-4">
          <h1 className="font-medium leading-tight mb-4" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6vw, 2rem)'
          }}>
            You're joining 10m+ wellness routines already completed by Quabble users
          </h1>
          <p className="font-normal leading-relaxed" style={{ 
            color: '#7B7968',
            fontSize: 'min(4vw, 1.1rem)'
          }}>
            87% of regular users report they improved their mental health since they started using Quabble
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div
            className="w-full h-auto"
            style={{ 
              maxWidth: 'min(80vw, 500px)',
              maxHeight: 'min(60vh, 450px)'
            }}
          >
            {animationData && !loadingError ? (
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <img
                src="/images/87stat.png"
                alt="87% Statistics Report"
                className="w-full h-auto object-contain"
                style={{ 
                  width: '100%',
                  height: '100%'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Next Button */}
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
      
      <style>{`
        .touch-target {
          min-height: 48px;
          min-width: 48px;
        }
      `}</style>
    </div>
  );
}
