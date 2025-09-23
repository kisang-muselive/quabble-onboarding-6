import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useRecommendations } from '../contexts/RecommendationsContext';
import { useLanguage } from '../contexts/LanguageContext';

interface RoutineRecommendationScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function RoutineRecommendationScreen({
  onBack,
  onNext
}: RoutineRecommendationScreenProps) {
  const { recommendations, loading } = useRecommendations();
  const { t } = useLanguage();
  const [showDebugModal, setShowDebugModal] = useState(false);

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_ask_recommended_routine",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  // Get morning and evening routines (1st and 2nd elements)
  const morningRoutine = recommendations?.[0];
  const eveningRoutine = recommendations?.[1];

  // Default fallback data
  const defaultMorning = {
    displayName: t("routineRecommendation.moodDiary"),
    smallThumbnailUrl: "/images/24-smoothie.png"
  };
  
  const defaultEvening = {
    displayName: t("routineRecommendation.gratitudeJar"), 
    smallThumbnailUrl: "/images/24-jar.png"
  };

  return (
    <>
    <div className="flex flex-col w-full min-h-screen px-6 relative" style={{ backgroundColor: '#EEECDD' }}>
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        <button className="p-2 text-gray-800" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Debug Button - Fixed to right side */}
      <button
        className="fixed top-16 right-4 w-8 h-8 rounded-full bg-transparent text-transparent text-xs font-medium hover:bg-gray-300 hover:bg-opacity-20 hover:text-gray-500 transition-all z-50"
        onClick={() => setShowDebugModal(true)}
        style={{ fontSize: '10px' }}
      >
        D
      </button>


      
      {/* Main content */}
      <div className="flex flex-col flex-1 max-w-xs mx-auto w-full" style={{ paddingBottom: '9rem', paddingTop: '5vh' }}>
        {/* Morning Routine */}
        <div className="bg-white rounded-[3rem] p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-6 text-center">
            {t("routineRecommendation.morningRoutineTitle")}
          </h2>
          
          <div className="relative flex justify-start items-center ml-8">
            {/* Horizontal line connecting icons */}
            <div className="absolute top-6 left-[40%] transform -translate-x-1/2 w-16 h-0.5" style={{ backgroundColor: '#E1E0D3' }}></div>
            
            {/* Check-in */}
            <div className="flex flex-col items-start relative z-10">
              <div className="w-16 h-16 mb-2">
                <img 
                  src="/images/24-sun.png" 
                  alt="Check-in" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-gray-700">{t("routineRecommendation.checkIn")}</span>
            </div>
            
            {/* Morning Routine - Dynamic */}
            <div className="flex flex-col items-center relative z-10 ml-16">
              <div className="w-16 h-16 mb-2">
                <img 
                  src={morningRoutine?.smallThumbnailUrl || defaultMorning.smallThumbnailUrl} 
                  alt={morningRoutine?.displayName || defaultMorning.displayName}
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-gray-700">
                {morningRoutine?.displayName || defaultMorning.displayName}
              </span>
            </div>
          </div>
        </div>
        
        {/* Evening Routine */}
        <div className="rounded-[3rem] p-6 mb-8" style={{ backgroundColor: '#605D4E' }}>
          <h2 className="text-lg font-medium text-white mb-6 text-center">
            {t("routineRecommendation.eveningRoutineTitle")}
          </h2>
          
          <div className="relative flex justify-start items-center ml-8">
            {/* Horizontal line connecting icons */}
            <div className="absolute top-6 left-[40%] transform -translate-x-1/2 w-16 h-0.5" style={{ backgroundColor: '#E1E0D3' }}></div>
            
            {/* Check-in */}
            <div className="flex flex-col items-start relative z-10">
              <div className="w-16 h-16 mb-2">
                <img 
                  src="/images/24-moon.png" 
                  alt="Check-in" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-white">{t("routineRecommendation.checkIn")}</span>
            </div>
            
            {/* Evening Routine - Dynamic */}
            <div className="flex flex-col items-center relative z-10 ml-16">
              <div className="w-16 h-16 mb-2">
                <img 
                  src={eveningRoutine?.smallThumbnailUrl || defaultEvening.smallThumbnailUrl} 
                  alt={eveningRoutine?.displayName || defaultEvening.displayName}
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-white">
                {eveningRoutine?.displayName || defaultEvening.displayName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change later text - stationary above button */}
      <div className="fixed bottom-20 left-0 right-0 z-40">
        <div className="text-center">
          <p className="text-orange-500 text-sm">
            {t("routineRecommendation.changeText")}
          </p>
        </div>
      </div>

      {/* Okay Button - same format as FocusScreen */}
      <div className="fixed bottom-0 left-0 right-0 z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={() => {
                onNext();
              }}
            >
              {t("routineRecommendation.okayButton")}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Debug Modal */}
    {showDebugModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommendations Debug Info</h2>
              <button
                onClick={() => setShowDebugModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Loading Status */}
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">Loading Status</h3>
                <p className="text-sm">Loading: <span className={loading ? 'text-orange-500' : 'text-green-500'}>{loading ? 'Yes' : 'No'}</span></p>
              </div>

              {/* Recommendations Array Info */}
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">Recommendations Array</h3>
                <p className="text-sm">Type: <code className="bg-gray-200 px-1 rounded">{typeof recommendations}</code></p>
                <p className="text-sm">Is Array: <span className={Array.isArray(recommendations) ? 'text-green-500' : 'text-red-500'}>{Array.isArray(recommendations) ? 'Yes' : 'No'}</span></p>
                <p className="text-sm">Length: <code className="bg-gray-200 px-1 rounded">{recommendations?.length || 'null'}</code></p>
                <p className="text-sm">Has Data: <span className={recommendations && recommendations.length > 0 ? 'text-green-500' : 'text-red-500'}>{recommendations && recommendations.length > 0 ? 'Yes' : 'No'}</span></p>
              </div>

              {/* Morning Routine (Index 0) */}
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-medium mb-2">Morning Routine (recommendations[0])</h3>
                {morningRoutine ? (
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Available:</strong> <span className="text-green-500">Yes</span></p>
                    <div className="bg-white p-2 rounded text-xs">
                      <pre>{JSON.stringify(morningRoutine, null, 2)}</pre>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><strong>displayName:</strong> {morningRoutine.displayName || 'N/A'}</div>
                      <div><strong>smallThumbnailUrl:</strong> {morningRoutine.smallThumbnailUrl ? 'Present' : 'Missing'}</div>
                      <div><strong>id:</strong> {morningRoutine.id || 'N/A'}</div>
                      <div><strong>name:</strong> {(morningRoutine as { name?: string }).name || 'N/A'}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">Not available - using fallback</p>
                )}
              </div>

              {/* Evening Routine (Index 1) */}
              <div className="bg-purple-50 p-4 rounded">
                <h3 className="font-medium mb-2">Evening Routine (recommendations[1])</h3>
                {eveningRoutine ? (
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Available:</strong> <span className="text-green-500">Yes</span></p>
                    <div className="bg-white p-2 rounded text-xs">
                      <pre>{JSON.stringify(eveningRoutine, null, 2)}</pre>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><strong>displayName:</strong> {eveningRoutine.displayName || 'N/A'}</div>
                      <div><strong>smallThumbnailUrl:</strong> {eveningRoutine.smallThumbnailUrl ? 'Present' : 'Missing'}</div>
                      <div><strong>id:</strong> {eveningRoutine.id || 'N/A'}</div>
                      <div><strong>name:</strong> {(eveningRoutine as { name?: string }).name || 'N/A'}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">Not available - using fallback</p>
                )}
              </div>

              {/* All Recommendations */}
              {recommendations && recommendations.length > 0 && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium mb-2">All Recommendations ({recommendations.length} items)</h3>
                  <div className="bg-white p-2 rounded text-xs max-h-40 overflow-y-auto">
                    <pre>{JSON.stringify(recommendations, null, 2)}</pre>
                  </div>
                </div>
              )}

              {/* Raw Recommendations Object */}
              <div className="bg-yellow-50 p-4 rounded">
                <h3 className="font-medium mb-2">Raw Recommendations Object</h3>
                <div className="bg-white p-2 rounded text-xs max-h-32 overflow-y-auto">
                  <pre>{JSON.stringify(recommendations, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
      
      @media (max-width: 375px) {
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
      }
      
      @media (max-height: 667px) {
        .space-y-3 > * + * { margin-top: 0.5rem; }
        .space-y-4 > * + * { margin-top: 0.75rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-5 { margin-bottom: 1rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
    </>
  );
} 