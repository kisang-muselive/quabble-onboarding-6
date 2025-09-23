import { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelections } from '../contexts/SelectionsContext';
import { Question } from '../services/questionsService';

interface AgeGroupScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  questionData?: Question;
  onTooYoung?: () => void;
}
export function AgeGroupScreen({
  onBack,
  onNext,
  onSkip,
  questionData,
  onTooYoung
}: AgeGroupScreenProps) {

  const { t } = useLanguage();
  const { addSelection } = useSelections();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(26);
  const [selectedMonth, setSelectedMonth] = useState<string>('Jun');
  const [selectedYear, setSelectedYear] = useState<number>(2000);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const ageGroups = questionData ? 
    questionData.options.map(option => ({
      key: option.text,
      systemName: option.text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '')
    })) :
    [
      { key: 'age.under18', systemName: 'under_18' },
      { key: 'age.19to24', systemName: '19_24' },
      { key: 'age.25to34', systemName: '25_34' },
      { key: 'age.35plus', systemName: '35_and_over' },
      { key: 'age.preferNotToAnswer', systemName: 'prefer_not_to_answer' }
    ];
  
  const handleAgeGroupClick = (ageGroupKey: string) => {
    sendToFlutter(JSON.stringify(
      {"event": "heptic"}
    ));
    setSelectedAgeGroup(ageGroupKey);
  };

  const calculateAge = (day: number, month: string, year: number) => {
    const monthIndex = months.indexOf(month);
    const birthDate = new Date(year, monthIndex, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthdayNext = () => {
    const age = calculateAge(selectedDay, selectedMonth, selectedYear);
    sendToFlutter(JSON.stringify({
      "event": "click_next_ob_birthday_selection",
      "eventProperties": {
        "onboarding_version": 4.0,
        "user_age": age,
        "birth_day": selectedDay,
        "birth_month": selectedMonth,
        "birth_year": selectedYear
      }
    }));
    
    setShowBirthdayModal(false);
    
    if (age < 13 && onTooYoung) {
      onTooYoung();
    } else {
      onNext();
    }
  };

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_age_group",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <style>{`
      .scrollable-options::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    <div className="flex flex-col w-full h-screen bg-[#faf7f0] text-gray-800 relative overflow-hidden">
      {/* Fixed Header - Moderately sized */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
        <button className="p-3 text-lg sm:text-xl font-normal touch-target" onClick={() => {
          sendToFlutter(JSON.stringify({
            "event": "click_skip_ob_survey_age_group",
            "eventProperties": {
              "onboarding_version": 4.0
            }
          }));
          onSkip();
        }} style={{ color: '#7B7968' }}>
          Skip
        </button>
      </div>
      
      {/* Title - with padding */}
      <div className="flex justify-center mb-4 sm:mb-5 px-5 flex-shrink-0 mt-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center leading-tight" style={{ color: '#4C4A3C' }}>
          {(questionData ? questionData.text : t('age.title')).split(/[\n\s]+/).reduce((acc, word, index, words) => {
            const midpoint = Math.ceil(words.length / 2);
            if (index === midpoint) acc.push(<br key={`br-${index}`} />);
            acc.push(word);
            if (index < words.length - 1 && index !== midpoint - 1) acc.push(' ');
            return acc;
          }, [] as (string | JSX.Element)[])}
        </h1>
      </div>
      
      {/* Image with viewport-based padding */}
      <div 
        className="flex justify-center px-5 flex-shrink-0"
        style={{ 
          paddingTop: '0.25vh', /* 1/400 of viewport height */
          paddingBottom: '2vh'  /* 1/50 of viewport height */
        }}
      >
        <div
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
          style={{ height: '15vh' }}          /* Smaller image */
        >
          <img
            src="/images/2-duck.png"
            alt="Age group illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Option Buttons with bigger text */}
      <div 
        className="flex-1 overflow-y-auto scrollable-options" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingBottom: '9rem', // Space for fixed button
          paddingLeft: '8vw', // 1/12.5 of viewport width
          paddingRight: '8vw' // 1/12.5 of viewport width
        }}
      >
        <div className="w-full max-w-md mx-auto space-y-3 sm:space-y-4">
          {ageGroups.map(ageGroup => (
            <button 
              key={ageGroup.key} 
              className={`w-full px-6 sm:px-7 rounded-full text-center font-normal transition-colors touch-target ${
                selectedAgeGroup === ageGroup.key 
                  ? 'bg-[#f2994a] text-white' 
                  : 'bg-white border-2'
              }`}
              style={{ 
                color: selectedAgeGroup === ageGroup.key ? 'white' : '#4C4A3C',
                borderColor: selectedAgeGroup === ageGroup.key ? 'transparent' : '#E1E0D3',
                height: '7.5vh', // Slightly bigger button height
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={() => handleAgeGroupClick(ageGroup.key)}
            >
              {questionData ? ageGroup.key : t(ageGroup.key)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Next Button - always visible, disabled when no selection */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
            <div className="max-w-md mx-auto">
              <button
                className={`w-full mx-auto block px-7 rounded-full text-white text-center font-normal transition-colors shadow-lg touch-target ${
                  selectedAgeGroup ? 'bg-black hover:bg-gray-800' : 'cursor-not-allowed'
                }`}
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh', // 1/40 of viewport height
                  backgroundColor: selectedAgeGroup ? undefined : '#BBB8A5'
                }}
                disabled={!selectedAgeGroup}
                onClick={() => {
                  // Get system name for selected age group
                  const selectedAgeGroupData = selectedAgeGroup ? ageGroups.find(ag => ag.key === selectedAgeGroup) : null;
                  const systemName = selectedAgeGroupData ? selectedAgeGroupData.systemName : null;
                  
                  // Add selection to context if we have question data
                  if (questionData && selectedAgeGroupData) {
                    const selectedOptionId = questionData.options.find(opt => 
                      opt.text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '') === selectedAgeGroupData.systemName
                    )?.id;
                    if (selectedOptionId) {
                      addSelection(selectedOptionId);
                    }
                  }
                  sendToFlutter(JSON.stringify({
                    "event": "click_next_ob_survey_age_group",
                    "eventProperties": {
                      "onboarding_version": 4.0
                    },
                    "userProperties": {
                      "survey_age_group": systemName || selectedAgeGroup || ""
                    }
                  }));
                  onNext();
                  // Check if user selected "Under 18" and show birthday modal
                  // const isUnder18 = selectedAgeGroup === 'age.under18' || 
                  //                  (questionData && selectedAgeGroupData?.systemName === 'under_18') ||
                  //                  (selectedAgeGroup && selectedAgeGroup.toLowerCase().includes('under 18'));
                  
                  // if (isUnder18) {
                  //   setShowBirthdayModal(true);
                  // } else {
                  //   onNext();
                  // }
                }}
              >
                {t('next')}
              </button>
            </div>
          </div>
        </div>

      {/* Birthday Modal */}
      {showBirthdayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Modal container */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setShowBirthdayModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Main content container */}
            <div className="flex flex-col items-center justify-center px-6 pb-6">
              {/* Title */}
              <div className="flex justify-center items-center mb-8">
                <h3 className="text-xl font-semibold text-gray-800">When is your birthday?</h3>
              </div>

              {/* Date picker */}
              <div className="flex justify-center items-center gap-2 mb-8">
                {/* Day Selector */}
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="text-3xl font-medium bg-gray-100 rounded-2xl p-4 text-center min-w-[80px] border-0 outline-none appearance-none"
                  style={{ backgroundColor: '#F5F5F5' }}
                >
                  {days.map(day => (
                    <option key={day} value={day}>{String(day).padStart(2, '0')}</option>
                  ))}
                </select>
                
                {/* Month Selector */}
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="text-3xl font-medium bg-gray-100 rounded-2xl p-4 text-center min-w-[80px] border-0 outline-none appearance-none"
                  style={{ backgroundColor: '#F5F5F5' }}
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                
                {/* Year Selector */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="text-3xl font-medium bg-gray-100 rounded-2xl p-4 text-center min-w-[80px] border-0 outline-none appearance-none"
                  style={{ backgroundColor: '#F5F5F5' }}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Done Button */}
            <div className="p-6 pt-4">
              <button
                className="w-full bg-black text-white rounded-3xl py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
                onClick={handleBirthdayNext}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
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
        --text-xl { font-size: 1.5rem; }
      }
    `}</style>
  </>;
}