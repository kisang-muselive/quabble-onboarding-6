import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WeCanHelpScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  achievementSelection?: string | null;
  cameFromYesPath?: boolean;
  fromHaveMentalIssueYes?: boolean;
  userFeelingChoice?: 'difficult_recently' | 'ongoing_challenges' | 'doing_okay' | null;
}

export function WeCanHelpScreen({
  onBack,
  onNext,
  onSkip,
  achievementSelection,
  cameFromYesPath,
  fromHaveMentalIssueYes,
  userFeelingChoice
}: WeCanHelpScreenProps) {
  const { t } = useLanguage();

  // Helper function to render text without manual line breaks
  const renderMessage = (text: string) => {
    // Remove manual line breaks and let CSS handle the wrapping
    return text.replace(/\n/g, ' ');
  };

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_offer_support",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <div 
      className="flex flex-col w-full h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/we-can-help-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Fixed Header */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#FFFFFF' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 sm:px-8 pt-4 sm:pt-6" style={{ paddingBottom: '9rem' }}>
        {/* Message Text */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-medium leading-relaxed text-white proper-line-breaks">
            {fromHaveMentalIssueYes ? (
              // HaveMentalIssueScreen "Yes" → "While professional care..." message
              renderMessage(t('weCanHelp.messageGeneral'))
            ) : userFeelingChoice === 'ongoing_challenges' ? (
              // AskFeelingV2Screen "ongoing_challenges" (2nd option) → "While professional care..." message
              renderMessage(t('weCanHelp.messageGeneral'))
            ) : userFeelingChoice === 'doing_okay' ? (
              // AskFeelingV2Screen "doing_okay" → "So glad to hear that!" message (HIGH PRIORITY)
              renderMessage(t('weCanHelp.messageDoingOkay').replace('{achievement}', achievementSelection?.toLowerCase() || 'your goals'))
            ) : fromHaveMentalIssueYes === false && achievementSelection ? (
              // HaveMentalIssueScreen "No" with achievement → "We're here to help you..." message
              renderMessage(t('weCanHelp.messagePersonalized').replace('{achievement}', achievementSelection.toLowerCase()))
            ) : cameFromYesPath && achievementSelection ? (
              // Other difficult paths with achievement → "We're here to help you..." message
              renderMessage(t('weCanHelp.messagePersonalized').replace('{achievement}', achievementSelection.toLowerCase()))
            ) : achievementSelection ? (
              // Other paths with achievement → "So glad to hear that!" message
              renderMessage(t('weCanHelp.messageDoingOkay').replace('{achievement}', achievementSelection.toLowerCase()))
            ) : (
              // Default fallback
              renderMessage(t('weCanHelp.messageGeneral'))
            )}
          </h1>
        </div>
      </div>
      
      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal transition-colors shadow-lg touch-target"
              style={{ 
                backgroundColor: '#f2994a',
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
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
      
      .proper-line-breaks {
        word-break: keep-all;
        overflow-wrap: normal;
        hyphens: none;
        text-wrap: pretty;
      }
      
      /* Ensure better line breaking for different languages */
      .proper-line-breaks:lang(en) {
        word-break: normal;
        overflow-wrap: normal;
        hyphens: none;
      }
      
      .proper-line-breaks:lang(ko) {
        word-break: keep-all;
        line-break: strict;
        overflow-wrap: normal;
        hyphens: none;
      }
      
      .proper-line-breaks:lang(ja) {
        word-break: keep-all;
        line-break: strict;
        overflow-wrap: normal;
        hyphens: none;
      }
    `}</style>
  </>;
}