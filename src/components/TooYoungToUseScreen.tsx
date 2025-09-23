import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

export function TooYoungToUseScreen() {

  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_12_under",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden" style={{ backgroundColor: '#F8EFE0' }}>
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 pb-16">
        {/* Title */}
        <div className="text-center mb-6 max-w-sm">
          <h1 className="font-medium mb-6" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6vw, 2.25rem)',
            lineHeight: '1.2'
          }}>
            Quabble is for users aged 13 and up
          </h1>
          <div className="leading-relaxed" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(4vw, 1rem)'
          }}>
            <p className="mb-4">Thanks for your interest!<br/>Please come back when you're old<br />enough. We'll be here waiting. 💛</p>
          </div>
        </div>

        {/* Duck illustration */}
        <div className="flex items-center justify-center mb-12">
          <img
            src="/images/too-young-duck.png"
            alt="Too Young Duck Illustration"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(80vw, 400px)',
              maxHeight: 'min(40vh, 350px)'
            }}
          />
        </div>

        {/* Support text */}
        <div className="text-center">
          <p style={{ 
            color: '#4C4A3C',
            fontSize: 'min(3.5vw, 0.875rem)'
          }}>
            Do you need a support? Contact us at quabble@muse.live
          </p>
        </div>
      </div>
    </div>
  );
}