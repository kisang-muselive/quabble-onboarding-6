import React, { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useRecommendations } from '../contexts/RecommendationsContext';
import { useLanguage } from '../contexts/LanguageContext';

interface RecommendedRoutineIntroScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function RecommendedRoutineIntroScreen({
  onBack,
  onNext
}: RecommendedRoutineIntroScreenProps) {
  const { t } = useLanguage();
  // Get recommendations context
  const { recommendations, loading, error, fetchRecommendations } = useRecommendations();
  const [showDebugModal, setShowDebugModal] = useState(false);

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_check_out_routine",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  useEffect(() => {
    // Trigger recommendations fetch when this screen loads - only run once
    console.log('RecommendedRoutineIntroScreen mounted - triggering recommendations fetch');
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once when component mounts

  useEffect(() => {
    // Debug logging for recommendations state changes - only when modal is open to reduce re-renders
    if (showDebugModal) {
      console.log('Recommendations loading:', loading);
      console.log('Recommendations error:', error);
      console.log('Recommendations:', recommendations);
    }
  }, [loading, error, recommendations, showDebugModal]);
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] relative">
      {/* Invisible Debug Button - top left, moved down */}
      <button
        className="fixed top-16 left-4 w-8 h-8 rounded-full bg-transparent text-transparent text-xs font-medium hover:bg-gray-300 hover:bg-opacity-20 hover:text-gray-500 transition-all z-50"
        onClick={() => setShowDebugModal(true)}
        style={{ fontSize: '10px' }}
      >
        C
      </button>
      {/* Main content - positioned at balanced location */}
      <div className="flex flex-col items-center flex-1 px-8" style={{ paddingBottom: '16rem', paddingTop: '20vh' }}>
        {/* Large circular orange section - responsive size */}
        <div className="relative mb-12" style={{ width: 'min(92vw, 32rem)', height: 'min(92vw, 32rem)' }}>
          {/* Outer light orange circle */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-40"></div>
          
          {/* Inner orange circle with text */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center p-8" style={{ width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}>
            <div className="text-center">
              <p className="text-white font-medium leading-relaxed" style={{ fontSize: '3vh' }}>
                {(() => {
                  const message = t('recommendedRoutineIntro.message');
                  const words = message.split(' ');
                  const breakPoint = words.indexOf('your');
                  if (breakPoint > 0) {
                    return (
                      <>
                        {words.slice(0, breakPoint + 1).join(' ')}<br />
                        {words.slice(breakPoint + 1).join(' ')}
                      </>
                    );
                  }
                  return message;
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Check it out button - closer to duck */}
      <div className="fixed bottom-52 left-0 right-0 flex justify-center z-10">
        <button 
          className="py-6 px-12 font-medium text-2xl hover:text-gray-900 transition-colors"
          style={{ color: '#2d2b2a' }}
          onClick={onNext}
        >
          {t('recommendedRoutineIntro.checkItOutButton')}
        </button>
      </div>

      {/* Duck at bottom - bigger and positioned lower */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center -mb-4" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <img 
          src="/images/15-duck.png" 
          alt="Quabble Duck" 
          className="w-64 h-64 object-contain" 
        />
      </div>

      {/* Debug Modal */}
      {showDebugModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4" style={{ backfaceVisibility: 'hidden' }}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto transform-gpu" style={{ willChange: 'auto', backfaceVisibility: 'hidden' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Recommendations Debug Info</h2>
              <button
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                onClick={() => setShowDebugModal(false)}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* API Request Info */}
              <div className="bg-gray-50 p-3 rounded">
                <h3 className="font-medium text-gray-800 mb-2">API Request</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">URL:</span> {process.env.NODE_ENV === 'development' ? '/api/quabble/onboardings/v3/recommendations/routines' : 'https://prod-canary-1-27.muse.live/api/quabble/onboardings/v3/recommendations/routines'}</p>
                  <p><span className="font-medium">Method:</span> GET</p>
                  <p><span className="font-medium">Headers:</span> Authorization, Content-Type, lang</p>
                </div>
              </div>

              {/* Loading State */}
              <div className="bg-blue-50 p-3 rounded">
                <h3 className="font-medium text-gray-800 mb-2">Loading State</h3>
                <p className="text-sm">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${loading ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                  {loading ? 'Loading...' : 'Completed'}
                </p>
              </div>

              {/* Error State */}
              {error && (
                <div className="bg-red-50 p-3 rounded">
                  <h3 className="font-medium text-gray-800 mb-2">Error</h3>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Success State */}
              {!error && recommendations && (
                <div className="bg-green-50 p-3 rounded">
                  <h3 className="font-medium text-gray-800 mb-2">Success</h3>
                  <p className="text-sm text-green-600">
                    Successfully fetched {recommendations.length} recommendation(s)
                  </p>
                </div>
              )}

              {/* Recommendations Data */}
              <div className="bg-gray-50 p-3 rounded">
                <h3 className="font-medium text-gray-800 mb-2">Response Data</h3>
                <div className="text-sm">
                  {recommendations ? (
                    <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
                      {JSON.stringify(recommendations, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-gray-500">No data available</p>
                  )}
                </div>
              </div>

              {/* Timing Info */}
              <div className="bg-gray-50 p-3 rounded">
                <h3 className="font-medium text-gray-800 mb-2">Debug Actions</h3>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  onClick={() => {
                    console.log('🔄 Manual recommendations fetch triggered');
                    fetchRecommendations();
                  }}
                >
                  Refetch Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 