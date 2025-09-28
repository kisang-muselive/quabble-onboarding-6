import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { MetadataProvider } from './contexts/MetadataContext';
import { RecommendationsProvider } from './contexts/RecommendationsContext';
import { SelectionsProvider } from './contexts/SelectionsContext';
import { fetchQuestions, defaultQuestions, Question } from './services/questionsService';
import { 
  prefetchAllCriticalImages, 
  prefetchAllImagesInBackground, 
  prefetchImagesForScreen,
  type ScreenType as PrefetchScreenType
} from './utils/imagePrefetch';
import { WhyQuabbleWhatYouNeed } from './components/WhyQuabbleWhatYouNeed';
import { TenMWorkoutCompleted } from './components/10mWorkoutCompleted';
import { FoundationOfMeaningfulLife } from './components/FoundationOfMeaningfulLife';
import { HowHaveYouBeen } from './components/HowHaveYouBeen';
import { SorryToHearThat } from './components/SorryToHearThat';
import { DealingWith } from './components/DealingWith';
import { GladToHearThat } from './components/GladToHearThat';
import { HereToHelp } from './components/HereToHelp';
import { NinetyEightReport } from './components/98Report';
import { EightySevenReport } from './components/87Report';
import { DepressionSurvey1 } from './components/DepressionSurvey1';
import { DepressionSurvey2 } from './components/DepressionSurvey2';
import { DepressionSurvey3 } from './components/DepressionSurvey3';
import { AnxietySurvey1 } from './components/AnxietySurvey1';
import { AnxietySurvey2 } from './components/AnxietySurvey2';
import { AnxietySurvey3 } from './components/AnxietySurvey3';
import { BackedByExperts } from './components/BackedByExperts';
import { FinalStep } from './components/FinalStep';
import { WakeUp } from './components/WakeUp';
import { GoToBed } from './components/GoToBed';
import { InterestGrid } from './components/InterestGrid';
import { SupportSystem } from './components/SupportSystem';
import { AgeGroup } from './components/AgeGroup';
import { Customizing } from './components/Customizing';
import { RoutineReady } from './components/RoutineReady';
import { Joining10m } from './components/Joining10m';
import { WorkoutList } from './components/WorkoutList';
import { FiveStars } from './components/FiveStars';
import { ProfessionalCareIsImportant } from './components/ProfessionalCareIsImportant';
import { TransitionWrapper } from './components/TransitionWrapper';
import { sendToFlutter } from './lib/quabbleFlutterChannel';

type ScreenType = 'whyquabblewhatyouneed' | '10mworkoutcompleted' | 'foundationofmeaningfullife' | 'howhaveyoubeen' | 'sorrytohear' | 'dealingwith' | 'gladtohearthat' | 'heretohelp' | '98report' | '87report' | 'backedbyexperts' | 'finalstep' | 'wakeup' | 'gotobed' | 'interestgrid' | 'supportsystem' | 'agegroup' | 'customizing' | 'routineready' | 'joining10m' | 'workoutlist' | 'fivestars' | 'depressionsurvey1' | 'depressionsurvey2' | 'depressionsurvey3' | 'anxietysurvey1' | 'anxietysurvey2' | 'anxietysurvey3' | 'professionalcareisimportant';

function AppContent() {
  // Check for query parameter to determine initial screen
  const getInitialScreen = (): ScreenType => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');
    console.log('URL search params:', window.location.search);
    console.log('Step parameter:', stepParam);
    
    if (stepParam === 'post-signin') {
      console.log('Setting initial screen to foundationofmeaningfullife');
      return 'foundationofmeaningfullife';
    }
    console.log('Setting initial screen to whyquabblewhatyouneed');
    return 'whyquabblewhatyouneed';
  };

  const [currentScreen, setCurrentScreen] = useState<ScreenType>(getInitialScreen());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<ScreenType | null>(null);
  const [dealingWithSelection, setDealingWithSelection] = useState<string | null>(null);
  
  // Store dynamic questions fetched from API
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);

  // Fetch questions from API on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);
        console.log('Questions loaded from API:', fetchedQuestions);
      } catch (error) {
        console.error('Failed to load questions from API, using defaults:', error);
        setQuestions(defaultQuestions);
      }
    };
    loadQuestions();
  }, []);

  // 앱 로드시 이미지 프리로딩 시스템 초기화
  useEffect(() => {
    // 1. 중요한 이미지들을 먼저 로딩
    prefetchAllCriticalImages();
    
    // 2. 백그라운드에서 모든 이미지를 천천히 프리로딩
    prefetchAllImagesInBackground();
  }, []);

  // 화면 변경시 다음 화면들의 이미지를 미리 로딩
  useEffect(() => {
    // 화면 이름을 프리로딩 시스템의 타입으로 변환
    const screenMapping: Record<ScreenType, PrefetchScreenType> = {
      'whyquabblewhatyouneed': 'whyquabblewhatyouneed',
      '10mworkoutcompleted': '10mworkoutcompleted',
      'foundationofmeaningfullife': 'foundationofmeaningfullife',
      'howhaveyoubeen': 'howhaveyoubeen',
      'gladtohearthat': 'gladtohearthat',
      'sorrytohear': 'sorrytohearthat',
      'dealingwith': 'dealingwith',
      'heretohelp': 'heretohelp',
      'professionalcareisimportant': 'professionalcareisimportant',
      '98report': '98report',
      '87report': '87report',
      'backedbyexperts': 'backedbyexperts',
      'finalstep': 'finalstep',
      'wakeup': 'wakeup',
      'gotobed': 'gotobed',
      'interestgrid': 'interestgrid',
      'supportsystem': 'supportsystem',
      'agegroup': 'agegroup',
      'customizing': 'customizing',
      'routineready': 'routineready',
      'joining10m': 'joining10m',
      'workoutlist': 'workoutlist',
      'fivestars': 'fivestars',
      'depressionsurvey1': 'depressionsurvey1',
      'depressionsurvey2': 'depressionsurvey2',
      'depressionsurvey3': 'depressionsurvey3',
      'anxietysurvey1': 'anxietysurvey1',
      'anxietysurvey2': 'anxietysurvey2',
      'anxietysurvey3': 'anxietysurvey3'
    };

    const prefetchScreen = screenMapping[currentScreen];
    if (prefetchScreen) {
      prefetchImagesForScreen(prefetchScreen);
    }
  }, [currentScreen]);

  const performTransition = (targetScreen: ScreenType) => {
    setIsTransitioning(true);
    // Wait for fade out before changing screen
    setTimeout(() => {
      setPreviousScreen(currentScreen);
      setCurrentScreen(targetScreen);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = (selectedOption?: number) => {
    sendToFlutter(JSON.stringify({
      "event": "heptic",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));
    
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
        sendToFlutter(JSON.stringify({
          "event": "onboarding-complete",
          "eventProperties": {
            "onboarding_version": 6.0
          }
        }));
      }
    } else if (currentScreen === 'sorrytohear') {
      performTransition('heretohelp');
    } else if (currentScreen === 'dealingwith') {
      // Check selected option to determine next screen
      if (selectedOption === 0) { // "Depression"
        performTransition('depressionsurvey1');
      } else if (selectedOption === 1) { // "Anxiety"
        performTransition('anxietysurvey1');
      } else if (selectedOption === 2 || selectedOption === 3 || selectedOption === 4 || selectedOption === 5 || selectedOption === 6 || selectedOption === 7) {
        // "Panic attacks", "OCD", "Bipolar disorder", "Eating disorder", "PTSD", "Something else"
        performTransition('professionalcareisimportant');
      } else {
        // Any other options - End of flow
        sendToFlutter(JSON.stringify({
          "event": "onboarding-complete",
          "eventProperties": {
            "onboarding_version": 6.0
          }
        }));
      }
    } else if (currentScreen === 'gladtohearthat') {
      performTransition('98report');
    } else if (currentScreen === 'heretohelp') {
      performTransition('98report');
    } else if (currentScreen === '98report') {
      performTransition('87report');
    } else if (currentScreen === '87report') {
      performTransition('backedbyexperts');
    } else if (currentScreen === 'backedbyexperts') {
      performTransition('finalstep');
    } else if (currentScreen === 'finalstep') {
      performTransition('wakeup');
    } else if (currentScreen === 'wakeup') {
      performTransition('gotobed');
    } else if (currentScreen === 'gotobed') {
      performTransition('interestgrid');
    } else if (currentScreen === 'interestgrid') {
      performTransition('supportsystem');
    } else if (currentScreen === 'supportsystem') {
      performTransition('agegroup');
    } else if (currentScreen === 'agegroup') {
      performTransition('customizing');
    } else if (currentScreen === 'customizing') {
      performTransition('routineready');
    } else if (currentScreen === 'routineready') {
      performTransition('joining10m');
    } else if (currentScreen === 'joining10m') {
      performTransition('workoutlist');
    } else if (currentScreen === 'workoutlist') {
      performTransition('fivestars');
    } else if (currentScreen === 'fivestars') {
      // End of flow - fire completion event
      sendToFlutter("onboarding-complete");
    } else if (currentScreen === 'depressionsurvey1') {
      performTransition('depressionsurvey2');
    } else if (currentScreen === 'depressionsurvey2') {
      performTransition('depressionsurvey3');
    } else if (currentScreen === 'depressionsurvey3') {
      performTransition('98report');
    } else if (currentScreen === 'anxietysurvey1') {
      performTransition('anxietysurvey2');
    } else if (currentScreen === 'anxietysurvey2') {
      performTransition('anxietysurvey3');
    } else if (currentScreen === 'anxietysurvey3') {
      performTransition('98report');
    } else if (currentScreen === 'professionalcareisimportant') {
      performTransition('98report');
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
    } else if (currentScreen === 'heretohelp') {
      performTransition('sorrytohear');
    } else if (currentScreen === '98report') {
      // Go back to the previous screen that led to 98report
      if (previousScreen === 'gladtohearthat') {
        performTransition('gladtohearthat');
      } else if (previousScreen === 'professionalcareisimportant') {
        performTransition('professionalcareisimportant');
      } else if (previousScreen === 'depressionsurvey3') {
        performTransition('depressionsurvey3');
      } else if (previousScreen === 'anxietysurvey3') {
        performTransition('anxietysurvey3');
      } else {
        // Default to heretohelp if no previous screen or if previous was heretohelp
        performTransition('heretohelp');
      }
    } else if (currentScreen === '87report') {
      performTransition('98report');
    } else if (currentScreen === 'backedbyexperts') {
      performTransition('87report');
    } else if (currentScreen === 'finalstep') {
      performTransition('backedbyexperts');
    } else if (currentScreen === 'wakeup') {
      performTransition('finalstep');
    } else if (currentScreen === 'gotobed') {
      performTransition('wakeup');
    } else if (currentScreen === 'interestgrid') {
      performTransition('gotobed');
    } else if (currentScreen === 'supportsystem') {
      performTransition('interestgrid');
    } else if (currentScreen === 'agegroup') {
      performTransition('supportsystem');
    } else if (currentScreen === 'customizing') {
      performTransition('agegroup');
    } else if (currentScreen === 'routineready') {
      performTransition('customizing');
    } else if (currentScreen === 'joining10m') {
      performTransition('routineready');
    } else if (currentScreen === 'workoutlist') {
      performTransition('joining10m');
    } else if (currentScreen === 'fivestars') {
      performTransition('workoutlist');
    } else if (currentScreen === 'depressionsurvey1') {
      performTransition('dealingwith');
    } else if (currentScreen === 'depressionsurvey2') {
      performTransition('depressionsurvey1');
    } else if (currentScreen === 'depressionsurvey3') {
      performTransition('depressionsurvey2');
    } else if (currentScreen === 'anxietysurvey1') {
      performTransition('dealingwith');
    } else if (currentScreen === 'anxietysurvey2') {
      performTransition('anxietysurvey1');
    } else if (currentScreen === 'anxietysurvey3') {
      performTransition('anxietysurvey2');
    } else if (currentScreen === 'professionalcareisimportant') {
      performTransition('dealingwith');
    }
    // First screen has no previous screen
  };

  // Render current screen with transition wrapper
  const renderCurrentScreen = () => {
    console.log('Rendering screen:', currentScreen);
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
          <FoundationOfMeaningfulLife onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'howhaveyoubeen') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <HowHaveYouBeen 
            onBack={handleBack} 
            onNext={handleNext}
            questionData={questions.find(q => q.name === 'Q5')}
          />
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
          <DealingWith 
            onBack={handleBack} 
            onNext={handleNext} 
            onOptionSelect={setDealingWithSelection}
            questionData={questions.find(q => q.name === 'Q4')}
          />
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
    
    if (currentScreen === 'heretohelp') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <HereToHelp onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === '98report') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <NinetyEightReport onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === '87report') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <EightySevenReport onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'backedbyexperts') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <BackedByExperts onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'finalstep') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <FinalStep onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'wakeup') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <WakeUp onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'gotobed') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <GoToBed onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'interestgrid') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <InterestGrid 
            onBack={handleBack} 
            onNext={handleNext}
            questionData={questions.find(q => q.name === 'Q6')}
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'supportsystem') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <SupportSystem 
            onBack={handleBack} 
            onNext={handleNext}
            questionData={questions.find(q => q.name === 'Q7')}
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'agegroup') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <AgeGroup 
            onBack={handleBack} 
            onNext={handleNext}
            questionData={questions.find(q => q.name === 'Q2')}
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'customizing') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <Customizing 
            onBack={handleBack} 
            onNext={handleNext} 
            dealingWithSelection={dealingWithSelection}
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'routineready') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <RoutineReady 
            onBack={handleBack} 
            onNext={handleNext} 
            dealingWithSelection={dealingWithSelection}
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'joining10m') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <Joining10m 
            onBack={handleBack} 
            onNext={handleNext} 
            dealingWithSelection={dealingWithSelection}
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'workoutlist') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <WorkoutList 
            onBack={handleBack} 
            onNext={handleNext} 
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'fivestars') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <FiveStars 
            onBack={handleBack} 
            onNext={handleNext} 
          />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'depressionsurvey1') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <DepressionSurvey1 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'depressionsurvey2') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <DepressionSurvey2 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'depressionsurvey3') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <DepressionSurvey3 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'anxietysurvey1') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <AnxietySurvey1 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'anxietysurvey2') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <AnxietySurvey2 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'anxietysurvey3') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <AnxietySurvey3 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>
      );
    }
    
    if (currentScreen === 'professionalcareisimportant') {
      return (
        <TransitionWrapper show={!isTransitioning}>
          <ProfessionalCareIsImportant onBack={handleBack} onNext={handleNext} />
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
      <AuthProvider>
        <MetadataProvider>
          <RecommendationsProvider>
            <SelectionsProvider>
              <AppContent />
            </SelectionsProvider>
          </RecommendationsProvider>
        </MetadataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}