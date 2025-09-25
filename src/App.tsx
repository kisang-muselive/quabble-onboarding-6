import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { WhyQuabbleWhatYouNeed } from './components/WhyQuabbleWhatYouNeed';
import { TenMWorkoutCompleted } from './components/10mWorkoutCompleted';
import { FoundationOfMeaningfulLife } from './components/FoundationOfMeaningfulLife';
import { HowHaveYouBeen } from './components/HowHaveYouBeen';
import { SorryToHearThat } from './components/SorryToHearThat';
import { DealingWith } from './components/DealingWith';
import { GladToHearThat } from './components/GladToHearThat';
import { TransitionWrapper } from './components/TransitionWrapper';
import { sendToFlutter } from './lib/quabbleFlutterChannel';
import { prefetchAllCriticalImages } from './utils/imagePrefetch';

type ScreenType = 'whyquabblewhatyouneed' | '10mworkoutcompleted' | 'foundationofmeaningfullife' | 'howhaveyoubeen' | 'sorrytohear' | 'dealingwith' | 'gladtohearthat';

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

  const handleNext = (selectedOption?: number) => {
    sendToFlutter("heptic");
    
    if (currentScreen === 'whyquabblewhatyouneed') {
      performTransition('10mworkoutcompleted');
    } else if (currentScreen === '10mworkoutcompleted') {
      performTransition('foundationofmeaningfullife');
    } else if (currentScreen === 'foundationofmeaningfullife') {
      performTransition('howhaveyoubeen');
    } else if (currentScreen === 'howhaveyoubeen') {
      // Check selected option to determine next screen
      if (selectedOption === 0) { // "I've been going through something difficult recently"
        performTransition('sorrytohear');
      } else if (selectedOption === 1) { // "I've been living with ongoing mental health challenges"
        performTransition('dealingwith');
      } else if (selectedOption === 2) { // "I'm mostly doing okay"
        performTransition('gladtohearthat');
      } else {
        // End of flow - fire completion event
        sendToFlutter("onboarding-complete");
      }
    } else if (currentScreen === 'sorrytohear') {
      // End of flow - fire completion event
      sendToFlutter("onboarding-complete");
    } else if (currentScreen === 'dealingwith') {
      // End of flow - fire completion event
      sendToFlutter("onboarding-complete");
    } else if (currentScreen === 'gladtohearthat') {
      // End of flow - fire completion event
      sendToFlutter("onboarding-complete");
    }
  };

  const handleBack = () => {
    if (currentScreen === '10mworkoutcompleted') {
      performTransition('whyquabblewhatyouneed');
    } else if (currentScreen === 'foundationofmeaningfullife') {
      performTransition('10mworkoutcompleted');
    } else if (currentScreen === 'howhaveyoubeen') {
      performTransition('foundationofmeaningfullife');
    } else if (currentScreen === 'sorrytohear') {
      performTransition('howhaveyoubeen');
    } else if (currentScreen === 'dealingwith') {
      performTransition('howhaveyoubeen');
    } else if (currentScreen === 'gladtohearthat') {
      performTransition('howhaveyoubeen');
    }
    // First screen has no previous screen
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
    
    if (currentScreen === '10mworkoutcompleted') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <TenMWorkoutCompleted onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'foundationofmeaningfullife') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <FoundationOfMeaningfulLife onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'howhaveyoubeen') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <HowHaveYouBeen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'sorrytohear') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <SorryToHearThat onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'dealingwith') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <DealingWith onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'gladtohearthat') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <GladToHearThat onBack={handleBack} onNext={handleNext} />
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