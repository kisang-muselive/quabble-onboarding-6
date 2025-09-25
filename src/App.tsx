import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { WhyQuabbleWhatYouNeed } from './components/WhyQuabbleWhatYouNeed';
import { DuckWithJarScreen } from './components/DuckWithJarScreen';
import { TransitionWrapper } from './components/TransitionWrapper';
import { sendToFlutter } from './lib/quabbleFlutterChannel';
import { prefetchAllCriticalImages } from './utils/imagePrefetch';

type ScreenType = 'whyquabblewhatyouneed' | 'duckwithjar';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('whyquabblewhatyouneed');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Prefetch critical images on app load
  useEffect(() => {
    prefetchAllCriticalImages();
  }, []);

  const performTransition = (targetScreen: ScreenType) => {
    setIsTransitioning(true);
    // Wait for fade out before changing screen
    setTimeout(() => {
      setCurrentScreen(targetScreen);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    sendToFlutter(JSON.stringify({
      "event": "heptic",
    }));
    
    if (currentScreen === 'whyquabblewhatyouneed') {
      performTransition('duckwithjar');
    } else if (currentScreen === 'duckwithjar') {
      // End of flow - fire completion event
      sendToFlutter(JSON.stringify({
        "event": "onboarding-complete",
      }));
    }
  };

  const handleBack = () => {
    if (currentScreen === 'duckwithjar') {
      performTransition('whyquabblewhatyouneed');
    }
  };

  // Render current screen with transition wrapper
  const renderCurrentScreen = () => {
    if (currentScreen === 'whyquabblewhatyouneed') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <WhyQuabbleWhatYouNeed onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'duckwithjar') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <DuckWithJarScreen onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    return null;
  };

  return (
    <div className="relative overflow-hidden">
      {renderCurrentScreen()}
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}