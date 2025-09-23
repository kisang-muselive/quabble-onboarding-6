import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface TestimonialsV2ScreenProps {
  onNext: () => void;
}

export function TestimonialsV2Screen({
  onNext
}: TestimonialsV2ScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_review",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  const testimonials = [
    {
      textKey: "testimonialsV2.testimonial1Text",
      authorKey: "testimonialsV2.testimonial1Author"
    },
    {
      textKey: "testimonialsV2.testimonial2Text",
      authorKey: "testimonialsV2.testimonial2Author"
    },
    {
      textKey: "testimonialsV2.testimonial3Text",
      authorKey: "testimonialsV2.testimonial3Author"
    },
    {
      textKey: "testimonialsV2.testimonial4Text",
      authorKey: "testimonialsV2.testimonial4Author"
    },
    {
      textKey: "testimonialsV2.testimonial5Text",
      authorKey: "testimonialsV2.testimonial5Author"
    }
  ];

  const renderStars = () => {
    return (
      <div 
        className="flex"
        style={{ gap: 'min(0.5vw, 2px)' }}
      >
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            className="text-yellow-400"
            style={{ fontSize: 'min(6vw, 26px)' }}
          >★</span>
        ))}
      </div>
    );
  };

  return <>
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/testimonial-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Scrollable Content Container */}
      <div 
        className="flex flex-col items-center px-5 sm:px-6 overflow-y-auto"
        style={{ 
          height: '100vh',
          paddingTop: '70vh',
          paddingBottom: '20vh'
        }}
      >
        
        {/* Rating Section */}
        {/* <div className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-white text-3xl font-bold">4.8</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
        </div> */}
        
        {/* Testimonials Container */}
        <div 
          className="w-full max-w-sm flex flex-col"
          style={{ gap: 'min(4vw, 16px)' }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg"
              style={{ 
                padding: 'min(4vw, 16px)',
                borderRadius: 'min(4vw, 16px)'
              }}
            >
              {renderStars()}
              <p 
                className="text-gray-800 font-normal leading-relaxed"
                style={{ 
                  fontSize: 'min(4.5vw, 18px)',
                  marginTop: 'min(2vw, 8px)',
                  marginBottom: 'min(3vw, 12px)'
                }}
              >
                {t(testimonial.textKey)}
              </p>
              <p 
                className="text-gray-500"
                style={{ fontSize: 'min(3.5vw, 14px)' }}
              >
                {t('testimonialsV2.authorPrefix')} {t(testimonial.authorKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
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
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
    `}</style>
  </>;
}