import React, { useState, useEffect } from 'react';
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
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const duration = 3000; // 3 seconds

    const interval = 50; // Update every 50ms for smooth animation
    const increment = (100 / duration) * interval;

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

    return () => clearInterval(progressInterval);
  }, [onNext]);

  return (
    <div className="flex flex-col w-full min-h-screen px-4 relative" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        <button className="p-2 text-gray-800" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-1">
        {/* Title */}
        <div className="text-center px-4" style={{ marginBottom: '0.8vh', marginTop: '1vh' }}>
          <h1 className="font-medium text-gray-800 leading-tight" style={{ fontSize: '3vh' }}>
            {t("customizeRoutine.title")}
          </h1>
        </div>
        
        {/* Duck illustration and progress bar - slightly above center */}
        <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingBottom: '12vh' }}>
          <img 
            src="/images/22-duck.png" 
            alt="Quabble duck customizing routine" 
            className="object-contain mb-6" 
            style={{ width: '20vh', height: '20vh' }}
          />
          
          {/* Progress bar */}
          <div className="w-64 px-4">
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