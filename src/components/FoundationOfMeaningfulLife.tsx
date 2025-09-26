import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface FoundationOfMeaningfulLifeProps {
  onNext: () => void;
}

export function FoundationOfMeaningfulLife({ onNext }: FoundationOfMeaningfulLifeProps) {
  const { t } = useLanguage();
  const { setAuthData } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPayload, setAuthPayload] = useState<any>(null);
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_healthy_mind",
      "eventProperties": {
        "onboarding_version": 6.0
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

      // Show modal with payload info
      setAuthPayload(payload);
      setShowAuthModal(true);
    };

    // Listen for the 'sign-in-complete' event
    window.addEventListener('sign-in-complete', handleSignInComplete);
    
    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('sign-in-complete', handleSignInComplete);
    };
  }, [setAuthData]);

  return (
    <>
    {/* Auth Event Modal */}
    {showAuthModal && authPayload && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowAuthModal(false)}
        />
        <div className="relative bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Authentication Event Received</h3>
          
          <div className="space-y-2 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-medium text-gray-600">User ID:</span>
              <span className="ml-2 text-gray-800">{authPayload.userId || 'Not provided'}</span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-medium text-gray-600">Access Token:</span>
              <span className="ml-2 text-gray-800 break-all">
                {authPayload.accessToken ? 
                  `${authPayload.accessToken.substring(0, 20)}...` : 
                  'Not provided'
                }
              </span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-medium text-gray-600">Full Payload:</span>
              <pre className="mt-2 text-xs text-gray-700 overflow-auto max-h-32">
                {JSON.stringify(authPayload, null, 2)}
              </pre>
            </div>
          </div>
          
        </div>
      </div>
    )}
    
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
                onNext();
              }}
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
