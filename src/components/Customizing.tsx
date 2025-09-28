import { useEffect, useRef, useState, useCallback } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { useRecommendations } from '../contexts/RecommendationsContext';
import { useAuth } from '../contexts/AuthContext';

// lottie-player 웹 컴포넌트 타입 선언
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}

interface CustomizingProps {
  onBack: () => void;
  onNext: () => void;
  dealingWithSelection?: string | null;
}

export function Customizing({ onBack, onNext, dealingWithSelection }: CustomizingProps) {
  const { t } = useLanguage();
  const { submitSelections, practiceIds, supportSystemId } = useSelections();
  const { fetchRecommendations, recommendations, error: recError } = useRecommendations();
  const { accessToken } = useAuth();
  const lottieRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showDuck, setShowDuck] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasCalledApis, setHasCalledApis] = useState(false);
  const [apiLogs, setApiLogs] = useState<Array<{
    type: string, 
    message: string, 
    timestamp: Date,
    details?: any
  }>>([]);

  const addLog = useCallback((type: string, message: string, details?: any) => {
    setApiLogs(prev => [...prev, { 
      type, 
      message, 
      timestamp: new Date(),
      details
    }]);
  }, []);

  const performApiCalls = async () => {
    try {
      // Log authentication status
      addLog('info', 'Authentication Status', {
        hasToken: !!accessToken,
        tokenPreview: accessToken ? `${accessToken.substring(0, 20)}...` : 'No token'
      });

      // First API call: submitSelections
      addLog('info', 'Starting submitSelections API call...', {
        endpoint: '/api/quabble/onboardings/v3/questions',
        method: 'POST',
        practiceIds: practiceIds || [],
        supportSystemId: supportSystemId || null
      });
      
      const selectionsResult = await submitSelections();
      
      if (selectionsResult?.success) {
        addLog('success', 'submitSelections completed successfully', {
          status: selectionsResult.status,
          response: selectionsResult.data,
          requestPayload: selectionsResult.requestPayload
        });
      } else {
        addLog('error', 'submitSelections failed', {
          error: selectionsResult?.error || 'Unknown error',
          requestPayload: selectionsResult?.requestPayload
        });
      }
      
      // Second API call: fetchRecommendations  
      addLog('info', 'Starting fetchRecommendations API call...', {
        endpoint: '/api/quabble/onboardings/v3/recommendations/routines',
        method: 'GET'
      });
      
      const recommendationsResult = await fetchRecommendations();
      
      if (recommendationsResult?.success) {
        addLog('success', 'fetchRecommendations completed successfully', {
          status: recommendationsResult.status,
          workoutsReceived: recommendationsResult.data?.length || 0,
          recommendations: recommendationsResult.data,
          fullResponse: recommendationsResult.fullResponse
        });
      } else {
        addLog('warning', 'fetchRecommendations returned default data', {
          error: recommendationsResult?.error || 'Using fallback data',
          defaultWorkouts: recommendationsResult?.data
        });
      }
      
      addLog('info', 'All API calls completed', {
        totalRequests: 2,
        status: 'Complete',
        summary: {
          selectionsSuccess: selectionsResult?.success || false,
          recommendationsSuccess: recommendationsResult?.success || false,
          recommendationsCount: recommendationsResult?.data?.length || 0
        }
      });
    } catch (error) {
      addLog('error', `API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        errorDetails: error instanceof Error ? error.stack : error
      });
    }
    
    // Show modal with results
    setShowModal(true);
  };

  // Make API calls only once when component mounts
  useEffect(() => {
    if (!hasCalledApis) {
      setHasCalledApis(true);
      performApiCalls();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_customizing_quote_anxiety",
      "eventProperties": {
        "onboarding_version": 6.0
      }
    }));

    // 6초 동안 로딩 진행 (처음 2초는 오리 애니메이션, 4초부터 카드 표시)
    const duration = 6000; // 6초
    const interval = 50; // 50ms마다 업데이트
    const steps = duration / interval;
    const progressStep = 100 / steps;

    // 1.5초 후 오리 애니메이션 숨기기
    const duckTimer = setTimeout(() => {
      setShowDuck(false);
    }, 1500);

    // 1.6초 후 카드 표시 (오리 애니메이션 fade-out 완료 직후)
    const cardTimer = setTimeout(() => {
      setShowCard(true);
    }, 1600);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressStep;
        if (newProgress >= 100 && !hasCompleted) {
          clearInterval(timer);
          setHasCompleted(true);
          // Wait 10 seconds after loading completes before navigating
          setTimeout(() => {
            onNext();
          }, 30000);
          return 100;
        }
        return newProgress;
      });
      
      setPercentage(prev => {
        const newPercentage = prev + progressStep;
        return newPercentage >= 100 ? 100 : newPercentage;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(duckTimer);
      clearTimeout(cardTimer);
    };
  }, [onNext, hasCompleted]);

  return (
    <>
    {/* API Request Log Modal */}
    {showModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        />
        <div className="relative bg-white rounded-lg p-6 max-w-lg w-full shadow-xl max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold mb-4 text-gray-800">API Request Log</h3>
          
          <div className="space-y-3">
            {apiLogs.map((log, index) => (
              <div 
                key={index}
                className={`p-3 rounded ${
                  log.type === 'error' ? 'bg-red-50 border border-red-200' :
                  log.type === 'success' ? 'bg-green-50 border border-green-200' :
                  log.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`font-medium text-sm ${
                    log.type === 'error' ? 'text-red-800' :
                    log.type === 'success' ? 'text-green-800' :
                    log.type === 'warning' ? 'text-yellow-800' :
                    'text-gray-800'
                  }`}>{log.message}</span>
                  <span className="text-xs opacity-60 ml-2">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {log.details && (
                  <div className="mt-2 bg-white bg-opacity-50 rounded p-2">
                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap" style={{
                      color: log.type === 'error' ? '#991b1b' :
                             log.type === 'success' ? '#166534' :
                             log.type === 'warning' ? '#92400e' :
                             '#1f2937',
                      fontFamily: 'monospace'
                    }}>
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {apiLogs.length === 0 && (
            <p className="text-gray-500 text-center py-4">Loading API responses...</p>
          )}
        </div>
      </div>
    )}
    
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden screen-container" style={{ backgroundColor: '#FAF9F2' }}>
      {/* Header with back button */}
      <div 
        className="flex items-center justify-start px-4 header-container"
        style={{ 
          backgroundColor: '#FAF9F2',
          paddingTop: '56px',
          paddingBottom: '1rem'
        }}
      >
        <div 
          className="p-2 flex items-center justify-center header-button-area"
          style={{ width: '40px', height: '40px' }}
        >
          <img 
            src="/images/arrow_left.svg" 
            alt="Back" 
            className="w-6 h-6 header-back-icon"
            style={{ 
              width: '24px', 
              height: '24px',
              opacity: 0,
              filter: 'none'
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center main-content">
        {/* Content Area - Fixed Height */}
        <div className="w-full relative" style={{ height: '350px', paddingTop: '20px', paddingBottom: '20px' }}>
          {/* Initial Content - Title and Image */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${!showCard && showDuck ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-sm title-container px-9 mx-auto">
              <h1 className="font-medium leading-snug title-text" style={{ 
                color: '#4C4A3C',
                fontSize: 'min(5.5vw, 1.625rem)'
              }}>
                Customizing your<br />mental wellness routine
              </h1>
            </div>

            <div className="flex items-center justify-center image-container w-full" style={{ marginTop: '20px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div 
                className="h-auto object-contain main-image"
                style={{ 
                  width: '242px',
                  height: '242px',
                  maxWidth: '242px',
                  maxHeight: '242px'
                }}
              >
                <lottie-player
                  ref={lottieRef}
                  src="/images/labduck.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  autoplay
                  loop
                />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center w-full h-full transition-opacity duration-1000 ease-in-out ${showCard ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              paddingLeft: '36px',
              paddingRight: '36px'
            }}
          >
            <div 
              className="flex flex-col items-center w-full max-w-md"
              style={{ 
                backgroundColor: '#FFF0E5',
                borderRadius: '20px',
                paddingTop: '24px',
                paddingBottom: '36px',
                paddingLeft: '28px',
                paddingRight: '28px'
              }}
            >
              {/* Quote icon */}
              <div style={{ marginBottom: '10px' }}>
                <img 
                  src="/images/quotationmarks.svg" 
                  alt="Quote" 
                  style={{ 
                    width: '32px', 
                    height: '32px'
                  }}
                />
              </div>
              
              {/* Main text */}
              <p 
                className="text-center font-normal leading-snug mb-4"
                style={{ 
                  color: '#4C4A3C',
                  fontSize: 'min(4.5vw, 1.125rem)'
                }}
              >
                {dealingWithSelection === 'Anxiety' 
                  ? 'A recent study shows small daily routines can ease stress and anxiety, and build resilience'
                  : 'Research shows even small daily actions like walking, gratitude, or connecting can boost mood and well-being.'
                }
              </p>
              
              {/* Source text */}
              <p 
                className="text-center text-sm"
                style={{ 
                  color: '#7B7968',
                  fontSize: 'min(3.5vw, 0.875rem)'
                }}
              >
                {dealingWithSelection === 'Anxiety' 
                  ? 'Frontiers in Psychology, 2024'
                  : 'MQ Mental Health, 2023'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Loading Bar - Fixed Position */}
        <div className="w-full max-w-sm px-9" style={{ paddingLeft: '72px', paddingRight: '72px', marginTop: '40px' }}>
          <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: '#E1E0D3' }}>
            <div 
              className="bg-orange-400 h-2 rounded-full transition-all duration-75 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#F28C39'
              }}
            />
          </div>
          
          {/* Percentage Counter */}
          <div className="text-center mt-4">
            <span className="text-2xl font-medium" style={{ color: '#4C4A3C' }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* No CTA button - automatic progression after loading */}
    </div>
    </>
  );
}