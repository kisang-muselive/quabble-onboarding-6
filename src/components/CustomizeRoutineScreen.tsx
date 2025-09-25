import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useSelections } from '../contexts/SelectionsContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CustomizeRoutineScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function CustomizeRoutineScreen({
  onBack,
  onNext
}: CustomizeRoutineScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const { submitSelections } = useSelections();
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_customizing_routine",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
    
    // Submit user selections to API - only run once when component mounts
    submitSelections();

    // Try to load the Lottie animation data
    const loadLottieData = async () => {
      try {
        const response = await fetch('/images/Lab duck.json');
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        } else {
          console.error('Failed to load Lottie animation');
          setLoadingError(true);
        }
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        setLoadingError(true);
      }
    };

    loadLottieData();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const duration = 6000; // 6 seconds
    const contentSwitchTime = 2000; // 2 seconds

    const interval = 50; // Update every 50ms for smooth animation
    const increment = (100 / duration) * interval;

    // Timer to switch content after 2 seconds
    const contentTimer = setTimeout(() => {
      setShowInitialContent(false);
    }, contentSwitchTime);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          // Auto-advance to next screen when progress completes
          onNext();
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(contentTimer);
    };
  }, [onNext]);

  return (
    <div className="flex flex-col w-full min-h-screen relative px-9" style={{ backgroundColor: '#FAF9F2' }}>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1">
        {/* Content area with fixed height to maintain progress bar position */}
        <div className="flex-1 flex flex-col items-center justify-center w-full" style={{ paddingBottom: '12vh' }}>
          {/* Transitioning content container */}
          <div className="relative flex flex-col items-center justify-center min-h-[30vh] w-full">
            {/* Initial content */}
            <div 
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                showInitialContent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-center mb-6">
                <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: 'min(6vw, 2rem)' }}>
                  {t("customizeRoutine.title")}
                </h1>
              </div>
              {animationData ? (
                <Lottie 
                  animationData={animationData} 
                  loop={true}
                  autoplay={true}
                  style={{ width: 'min(50vw, 200px)', height: 'min(50vw, 200px)' }}
                />
              ) : loadingError ? (
                <img 
                  src="/images/22-duck.png" 
                  alt="Quabble duck customizing routine" 
                  className="object-contain" 
                  style={{ width: 'min(50vw, 200px)', height: 'min(50vw, 200px)' }}
                />
              ) : (
                <div style={{ width: 'min(50vw, 200px)', height: 'min(50vw, 200px)' }} className="flex items-center justify-center">
                  {/* Loading placeholder */}
                  <div className="animate-pulse bg-gray-200 rounded-full" style={{ width: 'min(50vw, 200px)', height: 'min(50vw, 200px)' }}></div>
                </div>
              )}
            </div>

            {/* New content after transition */}
            <div 
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                !showInitialContent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div style={{ marginLeft: '-36px', marginRight: '-36px', paddingLeft: '36px', paddingRight: '36px' }}>
                <div 
                  className="text-center rounded-2xl"
                  style={{ 
                    backgroundColor: '#FFF0E5',
                    borderRadius: '20px',
                    paddingTop: 'min(6vw, 24px)',
                    paddingBottom: 'min(9vw, 36px)', 
                    paddingLeft: 'min(7vw, 28px)',
                    paddingRight: 'min(7vw, 28px)'
                  }}
                >
                  <div className="flex justify-center mb-3">
                    <img 
                      src="/images/quotationmark.svg" 
                      alt="Quote" 
                      style={{ width: 'min(6vw, 24px)', height: 'min(6vw, 24px)' }}
                    />
                  </div>
                  <h1 className="font-normal text-gray-800 leading-tight" style={{ fontSize: 'min(5vw, 1.5rem)' }}>
                    A recent study shows small daily routines can ease stress and anxiety, and build resilience.
                  </h1>
                  <p className="text-gray-500 mt-3" style={{ fontSize: 'min(3.5vw, 1rem)' }}>
                    Frontiers in Psychology, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fixed Progress bar position */}
          <div className="w-64 px-4 mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-orange-400 h-2 rounded-full transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center">
              <span className="text-2xl font-medium text-gray-800">
                {Math.round(progress)}{t("customizeRoutine.percentage")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 