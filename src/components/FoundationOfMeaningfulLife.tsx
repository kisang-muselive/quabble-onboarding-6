import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface FoundationOfMeaningfulLifeProps {
  onNext: () => void;
}

export function FoundationOfMeaningfulLife({ onNext }: FoundationOfMeaningfulLifeProps) {
  const { t } = useLanguage();
  const { setAuthData } = useAuth();
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_healthy_mind",
      "eventProperties": {
        "onboarding_version": 6.1
      }
    }));

    // Event listener for 'sign-in-complete' event from Flutter
    const handleSignInComplete = (event: any) => {
      console.log('Sign-in complete event received from Flutter');
      console.log('Event payload:', event.detail); // Log the payload
      
      // Access the payload data
      const payload = event.detail;
      const userId = payload.userId;  // Flutter sends 'userId', not 'userid'
      const token = payload.accessToken;

      // Store auth data in context for other components to use
      if (userId && token) {
        setAuthData(userId, token);
      }
    };

    // Listen for the 'sign-in-complete' event
    window.addEventListener('sign-in-complete', handleSignInComplete);
    
    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('sign-in-complete', handleSignInComplete);
    };
  }, [setAuthData]);

  return (
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/mind-quote-background.png)'
      }}
    >
      {/* Header without back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          paddingTop: '56px',
          paddingBottom: '1rem'
        }}
      >
      </div>

      <div className="flex flex-col items-center px-9 main-content">
        <div className="flex flex-col items-center justify-center text-center max-w-sm title-container" style={{ marginTop: '24px' }}>
          <h1 className="font-medium leading-snug title-text" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(5.5vw, 1.625rem)'
          }}>
            {t('foundationOfMeaningfulLife.title').split('\n').map((line, index) => (
              <span key={index} className="text-span">
                {line}
                {index < t('foundationOfMeaningfulLife.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

      </div>

      {/* Gradient frame above CTA */}
      <div className="fixed left-0 right-0 z-40 gradient-frame" style={{ bottom: 'calc(7.5vh + 36px)', height: '36px' }}>
        <div 
          className="w-full h-full"
          style={{
            background: 'transparent'
          }}
        />
      </div>

      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 z-50 cta-container" style={{ backgroundColor: 'transparent' }}>
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
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_info_healthy_mind",
                  "eventProperties": {
                    "onboarding_version": 6.1
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
  );
}
