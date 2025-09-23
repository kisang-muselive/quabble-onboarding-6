import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, getLanguageFromUrl, updateUrlLanguage } from '../utils/language';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getLanguageFromUrl());

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    updateUrlLanguage(newLanguage);
  };

  useEffect(() => {
    // Listen for URL changes (back/forward navigation)
    const handlePopState = () => {
      setLanguageState(getLanguageFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation function
function getTranslation(key: string, language: SupportedLanguage): string {
  const translations = getTranslations();
  // Type assertion to tell TypeScript that we know the structure
  const typedTranslations = translations as unknown as Record<SupportedLanguage, Record<string, string>>;
  return typedTranslations[language]?.[key] || typedTranslations.en[key] || key;
}

// Translation data - organized by language then by key
function getTranslations() {
  return {
    en: {
      // Common
      next: "Next",
      back: "Back", 
      done: "Done",
      skip: "Skip",
      cancel: "Cancel",
      
      // Age Group Screen
      "age.title": "What's your age group?",
      "age.under18": "Under 18",
      "age.19to24": "19-24",
      "age.25to34": "25-34", 
      "age.35plus": "35 and over",
      "age.preferNotToAnswer": "Prefer not to answer",
      
      // Gender Screen
      "gender.title": "How do you identify your gender?",
      "gender.male": "Male",
      "gender.female": "Female",
      "gender.nonBinary": "Non-binary",
      "gender.preferNotToSay": "Prefer not to answer",
      
      // Focus Screen
      "focus.title": "What has been your focus lately?",
      "focus.stress": "Reducing and managing stress",
      "focus.positive": "Cultivating a positive mindset", 
      "focus.selfLove": "Boosting self-love",
      "focus.connecting": "Connecting with others",
      "focus.productivity": "Improving productivity",
      
      // Confirmation Screen
      "confirmation.welcomeMessage": "Welcome!\nLet's find out how\nwe can help you",
      
      // Testimonials Screen
      "testimonials.testimonial1Text": "It's an app I've been looking for all my life.",
      "testimonials.testimonial1Author": "t.m.s.d7d",
      "testimonials.testimonial2Text": "It has been a game changer for my mental health and mindfulness and brings me so much joy.",
      "testimonials.testimonial2Author": "Emma",
      "testimonials.testimonial3Text": "It is a mind blowing way and a different perspective on how you look at mental health as a whole.",
      "testimonials.testimonial3Author": "Lucy N",
      "testimonials.testimonial4Text": "Y'all should know dis the best wellness app ever.",
      "testimonials.testimonial4Author": "Anonymous",
      "testimonials.authorPrefix": "by",
      
      // Duck With Jar Screen
      "duckWithJar.title": "Quabble",
      "duckWithJar.subtitle": "10M+ mental wellness routines completed",
      
      // Mental Wellness Screens
      "mentalWellness1.title": "Consistent mental wellness is the key to staying balanced, resilient, and fulfilled in life!",
      "mentalWellness1.daysSundayShort": "S",
      "mentalWellness1.daysMondayShort": "M",
      "mentalWellness1.daysTuesdayShort": "T",
      "mentalWellness1.daysWednesdayShort": "W",
      "mentalWellness1.daysThursdayShort": "T",
      "mentalWellness1.daysFridayShort": "F",
      "mentalWellness1.daysSaturdayShort": "S",
      
      "mentalWellness2.statistic": "98% of regular users find Quabble helpful for managing their mental health",
      
      "mentalWellness3.proceedButton": "Proceed",
      "mentalWellness3.statistic": "10M+ mental wellness\nroutines completed",
      "mentalWellness3.signingInButton": "Signing in...",
      
      // Chart Screen
      "chart.title": "Stay motivated with personal insights to guide your wellness journey!",
      
      // Sign Up Screen
      "signUp.title": "Quabble",
      "signUp.subtitle": "Daily Mental Wellness with One Joyful App!",
      "signUp.termsText": "I agree to Quabble's Terms of Service and Privacy Policy",
      
      // Duck Naming Screen
      "duckNaming.title": "Meet your Quabble Duck! Do you want to name your duck?",
      "duckNaming.defaultName": "Waddles",
      "duckNaming.modalTitle": "Name your duck",
      "duckNaming.modalPlaceholder": "Enter duck name",
      
      // Tell Us Intro Screen
      "tellUsIntro.message": "Tell us a little about you so that we can personalize your Quabble experience.",
      "tellUsIntro.tapToStart": "Tap to start >>",
      
      // Routine Recommendation Screen
      "routineRecommendation.morningRoutineTitle": "Morning Routine",
      "routineRecommendation.eveningRoutineTitle": "Evening Routine",
      "routineRecommendation.checkIn": "Check-in",
      "routineRecommendation.moodDiary": "Mood Diary",
      "routineRecommendation.gratitudeJar": "Gratitude Jar",
      "routineRecommendation.changeText": "You can change this later",
      "routineRecommendation.okayButton": "Okay",
      
      // App Finale Screen
      "appFinale.statistic": "87% of regular users report they improved their mental health since they started using Quabble",
      "appFinale.testimonialAuthor": "Nat",
      "appFinale.testimonialText": "I really love Quabble, my therapist suggested it and it keeps me afloat during the week.",
      "appFinale.therapistRecommendedTitle": "Therapist-recommended",
      "appFinale.therapistText": "Quabble brings real wellness practices to daily life—backed by experts like our advisor, Dr. Jung Kim, Assist. Professor of Psychiatry at Harvard Medical School",
      "appFinale.moodDiaryTitle": "Mood Diary",
      "appFinale.moodDiaryText": "Simple, effective mood tracking to recognize patterns and triggers",
      "appFinale.pleasantActivitiesTitle": "Pleasant Activities",
      "appFinale.pleasantActivitiesText": "Plan and engage in activities that bring you joy",
      
      // Wake Up Screen
      "wakeUp.title": "When do you usually wake up?",
      "wakeUp.modalTitle": "Select Time",
      
      // Good Night Screen
      "goodNight.title": "When do you usually go to bed?",
      "goodNight.modalTitle": "Select Time",
      
      // Mental Wellness Question 1
      "mentalWellnessQ1.title": "How are you doing mentally these days?",
      "mentalWellnessQ1.optionGreat": "Great",
      "mentalWellnessQ1.optionGood": "Good",
      "mentalWellnessQ1.optionNotVeryGood": "Not very good",
      "mentalWellnessQ1.optionPoor": "Poor",
      
      // Ask Feeling Screen
      "askFeelingScreen.title": "How have you been feeling lately?",
      "askFeelingScreen.subtitle": "Choose all that apply",
      "askFeelingScreen.optionExcited": "Excited",
      "askFeelingScreen.optionHappy": "Happy",
      "askFeelingScreen.optionRelaxed": "Relaxed",
      "askFeelingScreen.optionContent": "Content",
      "askFeelingScreen.optionLonely": "Lonely",
      "askFeelingScreen.optionStressed": "Stressed",
      "askFeelingScreen.optionAnxious": "Anxious",
      "askFeelingScreen.optionDepressed": "Depressed",
      "askFeelingScreen.optionPanicky": "Panicky",
      
      // Ask Interests Page
      "askInterests.title": "Which of the following are you interested in practicing?",
      "askInterests.subtitle": "Choose all that apply",
      "askInterests.breathing": "Breathing exercises",
      "askInterests.moodTracking": "Mood tracking",
      "askInterests.journaling": "Journaling",
      "askInterests.selfLove": "Self-love",
      "askInterests.gratitude": "Gratitude practices",
      "askInterests.meditation": "Meditation",
      "askInterests.physical": "Physical activities",
      "askInterests.sleep": "Better sleep",
      "askInterests.productivity": "Productivity",
      
      // Customize Routine Screen
      "customizeRoutine.title": "Customizing your mental wellness routine",
      "customizeRoutine.percentage": "%",
      
      // Recommended Routine Intro Screen
      "recommendedRoutineIntro.message": "Here is your recommended routine",
      "recommendedRoutineIntro.checkItOutButton": "Check it out >>",
      
      // Mind Quote Screen
      "mindQuote.quote": "A healthy mind is the foundation\nof a successful, full,\nand meaningful life.",
      
      // We Can Help Screen
      "weCanHelp.messageGeneral": "While professional care is essential,\nQuabble is here to offer support and\nwalk alongside you in your mental health journey.",
      "weCanHelp.messagePersonalized": "We're here to help you through this tough time,\nand \"{achievement}\" is something\nyou can achieve with us.",
      "weCanHelp.messageDoingOkay": "So glad to hear that!\n\"{achievement}\" is something we can\nabsolutely help with.",
      
      // Why Quabble Screen
      "whyQuabble.title": "Here's why Quabble might\nbe just what you need.",
      
      // Stats Screen
      "stats.title": "98% of our regular users\nreported Quabble helps\nmanaging their mental health",
      
      // Improved Proof Screen
      "improvedProof.title": "87% regular users report their\nmental health has improved\nsince they started using\nQuabble",
      
      // Let's Find Out Screen
      "letsFindOut.message": "Welcome!\nLet's find out how\nwe can help you",
      
      // Why So Many Screen
      "whySoMany.message": "So, why do so many people find Quabble so helpful?",
      
      // Quabble Tools Screen
      "quabbleTools.title": "Quabble has the right tools for everyone",
      "quabbleTools.subtitle": "18 different workouts across 6 categories available now and more to come!",
      "quabbleTools.moodDiary": "Mood Diary",
      "quabbleTools.meditation": "Meditation",
      "quabbleTools.bambooForest": "Bamboo Forest",
      "quabbleTools.oneMinBreathing": "1min Breathing",
      "quabbleTools.watermelonTaiChi": "Watermelon Tai Chi",
      "quabbleTools.proudDandelion": "Proud Dandelion",
      "quabbleTools.gratitudeJar": "Gratitude Jar",
      "quabbleTools.worryBox": "Worry Box",
      "quabbleTools.treasureBox": "Treasure Box",
      "quabbleTools.safePlace": "Safe Place",
      "quabbleTools.moonlight": "Moonlight",
      "quabbleTools.outdoorWalk": "Outdoor Walk",
      "quabbleTools.fiveFourThreeTwoOne": "54321",
      "quabbleTools.pleasantActivities": "Pleasant Activities",
      "quabbleTools.thankYou": "Thank You",
      "quabbleTools.dearSelf": "Dear Self",
      "quabbleTools.smartGoals": "Smart Goals",
      "quabbleTools.mindfulEating": "Mindful Eating",
      
      // Radar Screen
      "radar.title": "Quabble takes a holistic approach to mental health",
      "radar.subtitle": "Our mind and body are deeply connected, and lasting mental health can only come from caring for all areas of life.",
      "radar.radarDescription": "Measure your progress with our Wellness Radar!",
      
      // Routine Intro Screen
      "routineIntro.title": "It delivers bite-sized, personalized daily routines to help you build sustainable habits",
      "routineIntro.morningText": "Start your morning with a positive mindset",
      "routineIntro.eveningText": "End your day with a kind reflection",
      "routineIntro.readyButton": "I'm Ready",
      
      // Testimonials V2 Screen
      "testimonialsV2.testimonial1Text": "It's an app I've been looking for all my life.",
      "testimonialsV2.testimonial1Author": "t.m.s.d7d",
      "testimonialsV2.testimonial2Text": "It has been a game changer for my mental health and mindfulness and brings me so much joy.",
      "testimonialsV2.testimonial2Author": "Emma",
      "testimonialsV2.testimonial3Text": "It is a mind blowing way and a different perspective on how you look at mental health as a whole.",
      "testimonialsV2.testimonial3Author": "Lucy N",
      "testimonialsV2.testimonial4Text": "Y'all should know dis the best wellness app ever.",
      "testimonialsV2.testimonial4Author": "Daryn T",
      "testimonialsV2.testimonial5Text": "It's not a game pretending to be a mental health tool; it's a genuine mental health tool that happens to be fun and adorable.",
      "testimonialsV2.testimonial5Author": "Katherine",
      "testimonialsV2.authorPrefix": "by",
      
      // Are You Ready Screen
      "areYouReady.title": "Are you ready for setting up your personalized routine and start your journey?",
      "areYouReady.yesButton": "Yes",
      "areYouReady.maybeLaterButton": "Maybe later",
      
      // Therapist Screen
      "therapist.title": "It's therapist-recommended",
      "therapist.subtitle": "Quabble brings real wellness practices to daily life—backed by experts like our advisor, Dr. Jung Kim, Assist. Professor of Psychiatry at Harvard Medical School",
      
      // Support System Screen
      "support.title": "How strong is your support system?",
      "support.subtitle": "Family, friends, teachers, peers, etc.",
      "support.excellent": "Excellent",
      "support.good": "Good", 
      "support.limited": "Limited",
      "support.poor": "Poor",
      
      // Mental Health Issue Screen  
      "mentalIssue.title": "Have you been diagnosed with a mental health condition?",
      "mentalIssue.yes": "Yes",
      "mentalIssue.no": "No",
      
      // What Dealing With Screen
      "dealingWith.title": "What are you dealing with?",
      "dealingWith.fullTitle": "What have you been\ndealing with?",
      "dealingWith.subtitle": "Choose the one that affects you most",
      "dealingWith.depression": "Depression",
      "dealingWith.anxiety": "Anxiety", 
      "dealingWith.panicAttacks": "Panic attacks",
      "dealingWith.ocd": "OCD",
      "dealingWith.ptsd": "PTSD",
      "dealingWith.bipolar": "Bipolar disorder",
      "dealingWith.eatingDisorder": "Eating disorder",
      "dealingWith.other": "Other",
      
      // What Did You Try Screen
      "whatTry.title": "What have you tried before?",
      "whatTry.fullTitle": "What have you tried before to\nsupport your mental health?",
      "whatTry.subtitle": "Choose all that apply",
      "whatTry.therapy": "Therapy",
      "whatTry.medication": "Medication",
      "whatTry.otherApps": "Other apps",
      "whatTry.exercise": "Exercise",
      "whatTry.meditation": "Meditation", 
      "whatTry.nothing": "Nothing",
      "whatTry.other": "Other",
      "whatTry.therapyCounseling": "Therapy or counseling",
      "whatTry.medicationDetailed": "Medication",
      "whatTry.mentalWellnessApps": "Other mental wellness apps",
      "whatTry.exerciseDetailed": "Exercise",
      "whatTry.selfHelpBooks": "Self-help books",
      "whatTry.talkingToFriendsFamily": "Talking to friends or family",
      "whatTry.haventTriedAnything": "I haven't tried anything yet",
      
      // What Felt Missing Screen
      "whatFeltMissing.title": "If they didn't quite work, what\nfelt missing?",
      "whatFeltMissing.subtitle": "Choose all that apply",
      "whatFeltMissing.couldntStayConsistent": "I couldn't stay consistent",
      "whatFeltMissing.overwhelming": "Overwhelming or hard to follow",
      "whatFeltMissing.tooExpensive": "Too expensive for what I got",
      "whatFeltMissing.noSocialSupport": "I didn't feel socially supported",
      "whatFeltMissing.feltImpersonal": "Felt impersonal or generic",
      "whatFeltMissing.actuallyLiked": "I actually liked some of them",
      "whatMissing.other": "Other",
      
      // Where Did You Hear Screen
      "whereHear.title": "Where did you\nfirst hear about us?",
      "whereHear.appSearch": "App search",
      "whereHear.socialMedia": "Social Media Ad", 
      "whereHear.friendFamily": "Friend or Family",
      "whereHear.other": "Other",
      
      // Ask Feeling V2 Screen
      "askFeeling.title": "How have you been feeling lately?",
      "askFeeling.difficult": "It's been difficult recently",
      "askFeeling.ongoing": "I have ongoing challenges", 
      "askFeeling.okay": "I'm doing okay",
      "askFeelingV2.title": "How have you been\nlately?",
      "askFeelingV2.difficultDetailed": "I've been going through something difficult recently",
      "askFeelingV2.ongoingDetailed": "I've been living with ongoing mental health challenges",
      "askFeelingV2.okayDetailed": "I'm mostly doing okay",
      
      // Sorry To Heart Screen
      "sorry.title": "We're sorry to hear that",
      "sorry.subtitle": "Let's see what we can do to help",
      "sorry.fullTitle": "Sorry to hear that,\nWhat's been going on?",
      "sorry.fullSubtitle": "Choose the one that affects you most",
      "sorry.depression": "Depression",
      "sorry.anxiety": "Anxiety",
      "sorry.stress": "Stress",
      "sorry.loneliness": "Loneliness",
      "sorry.other": "Other",
      "sorry.breakupRelationship": "Breakup or relationship stress",
      "sorry.careerAcademic": "Career or academic pressure",
      "sorry.healthIssues": "Health issues",
      "sorry.burnout": "Burnout",
      "sorry.loneliness2": "Loneliness",
      "sorry.loss": "Loss",
      "sorry.somethingElse": "Something else",
      "sorry.nothingSpecific": "Nothing specific",
      
      // Achievement Screen
      "achievement.title": "What would you like to achieve?",
      "achievement.feelBetter": "Feel better about myself",
      "achievement.manageAnxiety": "Manage anxiety", 
      "achievement.improveRelationships": "Improve relationships",
      "achievement.betterSleep": "Sleep better",
      "achievement.moreConfident": "Be more confident",
      "achievement.other": "Other",
      "achievement.titleQuestion": "What do you want to\nachieve with us?",
      "achievement.takeCare": "Taking care of my mental health",
      "achievement.managingStress": "Managing daily stress",
      "achievement.positiveMindset": "Cultivating a positive mindset",
      "achievement.boostingSelfLove": "Boosting self-love",
      "achievement.connectingOthers": "Connecting with others",
      "achievement.improvingProductivity": "Improving productivity"
    },
    
    kr: {
      // Common
      next: "다음",
      back: "뒤로",
      done: "완료", 
      skip: "건너뛰기",
      
      // Age Group Screen
      "age.title": "연령대가 어떻게 되시나요?",
      "age.under18": "18세 미만",
      "age.19to24": "19-24세",
      "age.25to34": "25-34세",
      "age.35plus": "35세 이상", 
      "age.preferNotToAnswer": "답변하지 않음",
      
      // Gender Screen
      "gender.title": "성별이 어떻게 되시나요?",
      "gender.male": "남성",
      "gender.female": "여성", 
      "gender.nonBinary": "논바이너리",
      "gender.preferNotToSay": "답변하지 않음",
      
      // Focus Screen
      "focus.title": "어떤 것에 집중하고 싶으신가요?",
      "focus.anxiety": "불안감",
      "focus.depression": "우울감",
      "focus.stress": "스트레스 관리",
      "focus.sleep": "수면 개선",
      "focus.selfEsteem": "자존감", 
      "focus.relationships": "인간관계",
      
      // Confirmation Screen
      "confirmation.welcomeMessage": "환영합니다!\n저희가 어떻게 도움을\n드릴 수 있는지 알아보겠습니다!",
      
      // Mental Wellness 3 Screen
      "mentalWellness3.proceedButton": "진행",
      "mentalWellness3.statistic": "1천만 회 이상의\n정신건강 루틴 완료",
      "mentalWellness3.signingInButton": "로그인 중...",
      
      // Therapist Screen
      "therapist.title": "전문가가 추천하는",
      "therapist.subtitle": "Quabble은 실제 웰니스 실천법을 일상에 적용합니다—하버드 의과대학 정신의학과 조교수인 Dr. Jung Kim과 같은 전문가들의 지원을 받습니다",
      
      // Support System Screen
      "support.title": "지지체계가 얼마나 튼튼한가요?",
      "support.subtitle": "가족, 친구, 선생님, 동료 등",
      "support.excellent": "매우 좋음",
      "support.good": "좋음",
      "support.limited": "제한적",
      "support.poor": "부족함",
      
      // Mental Health Issue Screen
      "mentalIssue.title": "정신건강 질환 진단을 받으신 적이 있나요?",
      "mentalIssue.yes": "예",
      "mentalIssue.no": "아니오",
      
      // What Dealing With Screen  
      "dealingWith.title": "현재 어떤 어려움을 겪고 계신가요?",
      "dealingWith.fullTitle": "어떤 어려움을\n겪고 계신가요?",
      "dealingWith.subtitle": "가장 영향을 받는 것을 선택해주세요",
      "dealingWith.depression": "우울증",
      "dealingWith.anxiety": "불안장애",
      "dealingWith.panicAttacks": "공황발작", 
      "dealingWith.ocd": "강박장애",
      "dealingWith.ptsd": "외상후스트레스장애",
      "dealingWith.bipolar": "양극성장애",
      "dealingWith.eatingDisorder": "섭식장애",
      "dealingWith.other": "기타",
      
      // What Did You Try Screen
      "whatTry.title": "이전에 무엇을 시도해보셨나요?",
      "whatTry.fullTitle": "정신건강을 위해\n이전에 무엇을 시도해보셨나요?",
      "whatTry.subtitle": "해당하는 모든 것을 선택해주세요",
      "whatTry.therapy": "심리치료",
      "whatTry.medication": "약물치료",
      "whatTry.otherApps": "다른 앱",
      "whatTry.exercise": "운동",
      "whatTry.meditation": "명상",
      "whatTry.nothing": "없음", 
      "whatTry.other": "기타",
      "whatTry.therapyCounseling": "심리치료 또는 상담",
      "whatTry.medicationDetailed": "약물치료",
      "whatTry.mentalWellnessApps": "다른 정신건강 앱",
      "whatTry.exerciseDetailed": "운동",
      "whatTry.selfHelpBooks": "자기계발서",
      "whatTry.talkingToFriendsFamily": "친구나 가족과 대화",
      "whatTry.haventTriedAnything": "아직 아무것도 시도해보지 않았어요",
      
      // What Felt Missing Screen
      "whatFeltMissing.title": "제대로 효과가 없었다면,\n무엇이 아쉬웠나요?",
      "whatFeltMissing.subtitle": "해당하는 모든 것을 선택해주세요",
      "whatFeltMissing.couldntStayConsistent": "꾸준히 할 수 없었어요",
      "whatFeltMissing.overwhelming": "너무 복잡하거나 따라하기 어려웠어요",
      "whatFeltMissing.tooExpensive": "받은 것에 비해 너무 비쌌어요",
      "whatFeltMissing.noSocialSupport": "사회적 지지를 받지 못했어요",
      "whatFeltMissing.feltImpersonal": "개인적이지 않고 일반적으로 느껴졌어요",
      "whatFeltMissing.actuallyLiked": "사실 일부는 좋았어요",
      "whatMissing.other": "기타",
      
      // Where Did You Hear Screen
      "whereHear.title": "어디서 저희를\n처음 알게 되셨나요?",
      "whereHear.appSearch": "앱 검색",
      "whereHear.socialMedia": "소셜미디어 광고",
      "whereHear.friendFamily": "지인 추천",
      "whereHear.other": "기타",
      
      // Ask Feeling V2 Screen
      "askFeeling.title": "최근 기분이 어떠셨나요?",
      "askFeeling.difficult": "최근 힘들었어요",
      "askFeeling.ongoing": "지속적인 어려움이 있어요",
      "askFeeling.okay": "괜찮아요",
      "askFeelingV2.title": "최근 어떻게\n지내셨나요?",
      "askFeelingV2.difficultDetailed": "최근에 힘든 일을 겪고 있어요",
      "askFeelingV2.ongoingDetailed": "지속적인 정신건강 문제를 안고 살고 있어요",
      "askFeelingV2.okayDetailed": "대체로 괜찮게 지내고 있어요",
      
      // Sorry To Heart Screen
      "sorry.title": "안타깝게 생각합니다",
      "sorry.subtitle": "도움을 드릴 수 있는 방법을 찾아보겠습니다",
      "sorry.fullTitle": "안타깝게 생각합니다,\n무슨 일이 있으셨나요?",
      "sorry.fullSubtitle": "가장 영향을 받는 것을 선택해주세요",
      "sorry.depression": "우울감",
      "sorry.anxiety": "불안감", 
      "sorry.stress": "스트레스",
      "sorry.loneliness": "외로움",
      "sorry.other": "기타",
      "sorry.breakupRelationship": "이별 또는 관계 스트레스",
      "sorry.careerAcademic": "직업 또는 학업 압박",
      "sorry.healthIssues": "건강 문제",
      "sorry.burnout": "번아웃",
      "sorry.loneliness2": "외로움",
      "sorry.loss": "상실",
      "sorry.somethingElse": "기타",
      "sorry.nothingSpecific": "특별한 것은 없음",
      
      // Achievement Screen
      "achievement.title": "무엇을 이루고 싶으신가요?",
      "achievement.feelBetter": "자신에 대해 더 좋게 느끼기",
      "achievement.manageAnxiety": "불안감 관리",
      "achievement.improveRelationships": "인간관계 개선",
      "achievement.betterSleep": "더 나은 수면",
      "achievement.moreConfident": "더 자신감 있기", 
      "achievement.other": "기타",
      "achievement.titleQuestion": "저희와 함께\n무엇을 이루고 싶으신가요?",
      "achievement.takeCare": "정신건강 관리하기",
      "achievement.managingStress": "일상 스트레스 관리하기",
      "achievement.positiveMindset": "긍정적인 마음가짐 기르기",
      "achievement.boostingSelfLove": "자기사랑 키우기",
      "achievement.connectingOthers": "다른 사람들과 소통하기",
      "achievement.improvingProductivity": "생산성 향상시키기",
      
      // Let's Find Out Screen
      "letsFindOut.message": "환영합니다!\n저희가 어떻게\n도움을 드릴 수 있는지 알아보겠습니다",
      
      // Why So Many Screen
      "whySoMany.message": "그렇다면, 왜 그렇게 많은 사람들이 Quabble을 도움이 된다고 생각할까요?",
      
      // Quabble Tools Screen
      "quabbleTools.title": "Quabble은 모든 사람에게 적합한 도구를 가지고 있습니다",
      "quabbleTools.subtitle": "6개 카테고리의 18가지 다양한 운동이 지금 이용 가능하며 더 많은 것들이 출시될 예정입니다!",
      "quabbleTools.moodDiary": "기분 일기",
      "quabbleTools.meditation": "명상",
      "quabbleTools.bambooForest": "대나무 숲",
      "quabbleTools.oneMinBreathing": "1분 호흡",
      "quabbleTools.watermelonTaiChi": "수박 태극권",
      "quabbleTools.proudDandelion": "자랑스러운 민들레",
      "quabbleTools.gratitudeJar": "감사 항아리",
      "quabbleTools.worryBox": "걱정 상자",
      "quabbleTools.treasureBox": "보물 상자",
      "quabbleTools.safePlace": "안전한 장소",
      "quabbleTools.moonlight": "달빛",
      "quabbleTools.outdoorWalk": "야외 산책",
      "quabbleTools.fiveFourThreeTwoOne": "54321",
      "quabbleTools.pleasantActivities": "즐거운 활동",
      "quabbleTools.thankYou": "감사합니다",
      "quabbleTools.dearSelf": "소중한 나에게",
      "quabbleTools.smartGoals": "스마트 목표",
      "quabbleTools.mindfulEating": "마음챙김 식사",
      
      // Radar Screen
      "radar.title": "Quabble은 정신건강에 대해 전인적인 접근을 취합니다",
      "radar.subtitle": "우리의 마음과 몸은 깊이 연결되어 있으며, 지속적인 정신건강은 삶의 모든 영역을 돌보는 것에서만 나올 수 있습니다.",
      "radar.radarDescription": "웰니스 레이더로 당신의 진전을 측정하세요!",
      
      // Routine Intro Screen
      "routineIntro.title": "지속 가능한 습관을 구축하는 데 도움이 되는 작고 개인화된 일일 루틴을 제공합니다",
      "routineIntro.morningText": "긍정적인 마음가짐으로 아침을 시작하세요",
      "routineIntro.eveningText": "친절한 성찰로 하루를 마무리하세요",
      "routineIntro.readyButton": "준비됐어요",
      
      // Testimonials V2 Screen
      "testimonialsV2.testimonial1Text": "제가 평생 찾고 있던 앱입니다.",
      "testimonialsV2.testimonial1Author": "t.m.s.d7d",
      "testimonialsV2.testimonial2Text": "제 정신건강과 마음챙김에 게임 체인저가 되었고 저에게 많은 기쁨을 가져다주었습니다.",
      "testimonialsV2.testimonial2Author": "Emma",
      "testimonialsV2.testimonial3Text": "정신건강 전반을 바라보는 놀라운 방법이자 다른 관점입니다.",
      "testimonialsV2.testimonial3Author": "Lucy N",
      "testimonialsV2.testimonial4Text": "여러분도 아셔야 해요, 이게 최고의 웰니스 앱입니다.",
      "testimonialsV2.testimonial4Author": "Daryn T",
      "testimonialsV2.testimonial5Text": "정신건강 도구인 척하는 게임이 아니라, 재미있고 사랑스럽기도 한 진짜 정신건강 도구입니다.",
      "testimonialsV2.testimonial5Author": "Katherine",
      "testimonialsV2.authorPrefix": "작성자",
      
      // Are You Ready Screen
      "areYouReady.title": "개인화된 루틴을 설정하고 여정을 시작할 준비가 되셨나요?",
      "areYouReady.yesButton": "네",
      "areYouReady.maybeLaterButton": "나중에",
      
      // Wake Up Screen
      "wakeUp.title": "보통 몇 시에 일어나시나요?",
      "wakeUp.modalTitle": "시간 선택",
      
      // Good Night Screen
      "goodNight.title": "보통 몇 시에 주무시나요?",
      "goodNight.modalTitle": "시간 선택",
      
      // Ask Interests Page
      "askInterests.title": "다음 중 연습하고 싶은 것은 무엇인가요?",
      "askInterests.subtitle": "해당하는 모든 것을 선택해주세요",
      "askInterests.breathing": "호흡 운동",
      "askInterests.moodTracking": "기분 추적",
      "askInterests.journaling": "저널링",
      "askInterests.selfLove": "자기사랑",
      "askInterests.gratitude": "감사 연습",
      "askInterests.meditation": "명상",
      "askInterests.physical": "신체 활동",
      "askInterests.sleep": "더 나은 수면",
      "askInterests.productivity": "생산성",
      
      // Customize Routine Screen
      "customizeRoutine.title": "정신건강 루틴을\n맞춤화하고 있습니다",
      "customizeRoutine.percentage": "%",
      
      // Recommended Routine Intro Screen
      "recommendedRoutineIntro.message": "당신을 위한 추천 루틴입니다",
      "recommendedRoutineIntro.checkItOutButton": "확인하기 >>",
      
      // Routine Recommendation Screen
      "routineRecommendation.morningRoutineTitle": "아침 루틴",
      "routineRecommendation.eveningRoutineTitle": "저녁 루틴",
      "routineRecommendation.checkIn": "체크인",
      "routineRecommendation.moodDiary": "기분 일기",
      "routineRecommendation.gratitudeJar": "감사 항아리",
      "routineRecommendation.changeText": "나중에 변경할 수 있습니다",
      "routineRecommendation.okayButton": "확인",
      
      // Mind Quote Screen
      "mindQuote.quote": "건강한 마음은 성공적이고\n풍요로우며 의미 있는\n삶의 기초입니다.",
      
      // Why Quabble Screen
      "whyQuabble.title": "Quabble이 바로\n당신에게 필요한 것일 수 있는 이유입니다.",
      
      // Stats Screen
      "stats.title": "정기 사용자의 98%가\nQuabble이 정신건강 관리에\n도움이 된다고 보고했습니다",
      
      // Improved Proof Screen
      "improvedProof.title": "정기 사용자의 87%가\n정신건강이 개선되었다고\nQuabble 사용 시작 이후\n보고했습니다",
      
      // We Can Help Screen
      "weCanHelp.messageGeneral": "전문적인 치료가 필수적이지만,\nQuabble은 여러분의 정신건강 여정에서\n지원을 제공하고 함께 걸어가고자 합니다.",
      "weCanHelp.messagePersonalized": "이 힘든 시기에 도움을 드리고자 하며,\n\"{achievement}\"은 저희와 함께\n이루실 수 있습니다."
    },
    
    ja: {
      // Common  
      next: "次へ",
      back: "戻る",
      done: "完了",
      skip: "スキップ",
      
      // Age Group Screen
      "age.title": "年齢層を教えてください",
      "age.under18": "18歳未満", 
      "age.19to24": "19-24歳",
      "age.25to34": "25-34歳",
      "age.35plus": "35歳以上",
      "age.preferNotToAnswer": "回答しない",
      
      // Gender Screen
      "gender.title": "性別を教えてください",
      "gender.male": "男性",
      "gender.female": "女性",
      "gender.nonBinary": "ノンバイナリー", 
      "gender.preferNotToSay": "回答しない",
      
      // Focus Screen
      "focus.title": "何に焦点を当てたいですか？",
      "focus.anxiety": "不安",
      "focus.depression": "うつ",
      "focus.stress": "ストレス管理",
      "focus.sleep": "睡眠改善",
      "focus.selfEsteem": "自尊心",
      "focus.relationships": "人間関係",
      
      // Confirmation Screen
      "confirmation.welcomeMessage": "ようこそ！\nどのようにお手伝い\nできるか見つけましょう！",
      
      // Mental Wellness 3 Screen
      "mentalWellness3.proceedButton": "進む",
      "mentalWellness3.statistic": "1000万回以上の\nメンタルウェルネスルーチンが完了",
      "mentalWellness3.signingInButton": "サインイン中...",
      
      // Therapist Screen
      "therapist.title": "セラピスト推奨",
      "therapist.subtitle": "Quabbleは実際のウェルネス実践を日常生活に取り入れます—ハーバード医学部精神医学科助教授のDr. Jung Kimなどの専門家によってサポートされています",
      
      // Support System Screen
      "support.title": "サポートシステムはどの程度強いですか？",
      "support.subtitle": "家族、友人、教師、仲間など", 
      "support.excellent": "優秀",
      "support.good": "良い",
      "support.limited": "限定的",
      "support.poor": "不十分",
      
      // Mental Health Issue Screen
      "mentalIssue.title": "メンタルヘルスの診断を受けたことがありますか？",
      "mentalIssue.yes": "はい",
      "mentalIssue.no": "いいえ",
      
      // What Dealing With Screen
      "dealingWith.title": "何に対処していますか？",
      "dealingWith.fullTitle": "何に対処して\nいますか？",
      "dealingWith.subtitle": "最も影響を受けているものを選択してください",
      "dealingWith.depression": "うつ病", 
      "dealingWith.anxiety": "不安障害",
      "dealingWith.panicAttacks": "パニック発作",
      "dealingWith.ocd": "強迫性障害",
      "dealingWith.ptsd": "PTSD", 
      "dealingWith.bipolar": "双極性障害",
      "dealingWith.eatingDisorder": "摂食障害",
      "dealingWith.other": "その他",
      
      // What Did You Try Screen
      "whatTry.title": "以前に何を試しましたか？",
      "whatTry.fullTitle": "メンタルヘルスのために\n以前に何を試しましたか？",
      "whatTry.subtitle": "該当するものをすべて選択してください",
      "whatTry.therapy": "セラピー",
      "whatTry.medication": "薬物療法", 
      "whatTry.otherApps": "他のアプリ",
      "whatTry.exercise": "運動",
      "whatTry.meditation": "瞑想",
      "whatTry.nothing": "何もしていない",
      "whatTry.other": "その他",
      "whatTry.therapyCounseling": "セラピーまたはカウンセリング",
      "whatTry.medicationDetailed": "薬物療法",
      "whatTry.mentalWellnessApps": "他のメンタルウェルネスアプリ",
      "whatTry.exerciseDetailed": "運動",
      "whatTry.selfHelpBooks": "自己啓発書",
      "whatTry.talkingToFriendsFamily": "友人や家族との会話",
      "whatTry.haventTriedAnything": "まだ何も試していません",
      
      // What Felt Missing Screen
      "whatFeltMissing.title": "うまくいかなかった場合、\n何が足りないと感じましたか？",
      "whatFeltMissing.subtitle": "該当するものをすべて選択してください",
      "whatFeltMissing.couldntStayConsistent": "継続できませんでした",
      "whatFeltMissing.overwhelming": "圧倒的で従うのが困難でした",
      "whatFeltMissing.tooExpensive": "得られるものに対して高すぎました",
      "whatFeltMissing.noSocialSupport": "社会的サポートを感じませんでした",
      "whatFeltMissing.feltImpersonal": "個人的でなく一般的に感じました",
      "whatFeltMissing.actuallyLiked": "実際にいくつかは良かったです",
      "whatMissing.other": "その他",
      
      // Where Did You Hear Screen
      "whereHear.title": "どこで私たちを\n最初に知りましたか？",
      "whereHear.appSearch": "アプリ検索",
      "whereHear.socialMedia": "ソーシャルメディア広告",
      "whereHear.friendFamily": "友人や家族",
      "whereHear.other": "その他",
      
      // Ask Feeling V2 Screen  
      "askFeeling.title": "最近の気分はいかがですか？",
      "askFeeling.difficult": "最近つらいです",
      "askFeeling.ongoing": "継続的な困難があります", 
      "askFeeling.okay": "大丈夫です",
      "askFeelingV2.title": "最近いかが\nお過ごしですか？",
      "askFeelingV2.difficultDetailed": "最近何か困難なことを経験しています",
      "askFeelingV2.ongoingDetailed": "継続的なメンタルヘルスの課題を抱えて生活しています",
      "askFeelingV2.okayDetailed": "大体元気にやっています",
      
      // Sorry To Heart Screen
      "sorry.title": "それは残念です",
      "sorry.subtitle": "私たちにできることを見つけましょう",
      "sorry.fullTitle": "それは残念です、\n何が起こっていますか？",
      "sorry.fullSubtitle": "最も影響を受けているものを選択してください",
      "sorry.depression": "うつ",
      "sorry.anxiety": "不安",
      "sorry.stress": "ストレス",
      "sorry.loneliness": "孤独感",
      "sorry.other": "その他",
      "sorry.breakupRelationship": "別れや恋愛関係のストレス",
      "sorry.careerAcademic": "キャリアや学業のプレッシャー",
      "sorry.healthIssues": "健康問題",
      "sorry.burnout": "燃え尽き症候群",
      "sorry.loneliness2": "孤独感",
      "sorry.loss": "喪失",
      "sorry.somethingElse": "その他",
      "sorry.nothingSpecific": "特に何もない",
      
      // Achievement Screen
      "achievement.title": "何を達成したいですか？",
      "achievement.feelBetter": "自分をより良く感じる",
      "achievement.manageAnxiety": "不安の管理",
      "achievement.improveRelationships": "人間関係の改善",
      "achievement.betterSleep": "より良い睡眠",
      "achievement.moreConfident": "より自信を持つ",
      "achievement.other": "その他",
      "achievement.titleQuestion": "私たちと一緒に\n何を達成したいですか？",
      "achievement.takeCare": "メンタルヘルスのケア",
      "achievement.managingStress": "日常のストレス管理",
      "achievement.positiveMindset": "ポジティブなマインドセット",
      "achievement.boostingSelfLove": "自己愛の向上",
      "achievement.connectingOthers": "他者とのつながり",
      "achievement.improvingProductivity": "生産性の向上",
      
      // Let's Find Out Screen
      "letsFindOut.message": "ようこそ！\nどのようにお手伝い\nできるか見つけましょう",
      
      // Why So Many Screen
      "whySoMany.message": "では、なぜこれほど多くの人がQuabbleを役立つと感じるのでしょうか？",
      
      // Quabble Tools Screen
      "quabbleTools.title": "Quabbleには誰にでも適したツールがあります",
      "quabbleTools.subtitle": "6つのカテゴリーにわたる18種類のワークアウトが利用可能で、さらに多くが追加予定です！",
      "quabbleTools.moodDiary": "気分日記",
      "quabbleTools.meditation": "瞑想",
      "quabbleTools.bambooForest": "竹林",
      "quabbleTools.oneMinBreathing": "1分呼吸",
      "quabbleTools.watermelonTaiChi": "スイカ太極拳",
      "quabbleTools.proudDandelion": "誇らしいタンポポ",
      "quabbleTools.gratitudeJar": "感謝の瓶",
      "quabbleTools.worryBox": "心配箱",
      "quabbleTools.treasureBox": "宝箱",
      "quabbleTools.safePlace": "安全な場所",
      "quabbleTools.moonlight": "月光",
      "quabbleTools.outdoorWalk": "屋外散歩",
      "quabbleTools.fiveFourThreeTwoOne": "54321",
      "quabbleTools.pleasantActivities": "楽しい活動",
      "quabbleTools.thankYou": "ありがとう",
      "quabbleTools.dearSelf": "親愛なる自分へ",
      "quabbleTools.smartGoals": "スマート目標",
      "quabbleTools.mindfulEating": "マインドフル食事",
      
      // Radar Screen
      "radar.title": "Quabbleはメンタルヘルスに対してホリスティックなアプローチを取ります",
      "radar.subtitle": "私たちの心と体は深くつながっており、持続的なメンタルヘルスは人生のすべての領域をケアすることからのみ生まれます。",
      "radar.radarDescription": "ウェルネスレーダーで進歩を測定しましょう！",
      
      // Routine Intro Screen
      "routineIntro.title": "持続可能な習慣を構築するのに役立つ、一口サイズのパーソナライズされた日常ルーチンを提供します",
      "routineIntro.morningText": "ポジティブなマインドセットで朝を始めましょう",
      "routineIntro.eveningText": "親切な振り返りで一日を終えましょう",
      "routineIntro.readyButton": "準備完了",
      
      // Testimonials V2 Screen
      "testimonialsV2.testimonial1Text": "私が生涯探し求めていたアプリです。",
      "testimonialsV2.testimonial1Author": "t.m.s.d7d",
      "testimonialsV2.testimonial2Text": "私のメンタルヘルスとマインドフルネスにとってゲームチェンジャーとなり、多くの喜びをもたらしてくれました。",
      "testimonialsV2.testimonial2Author": "Emma",
      "testimonialsV2.testimonial3Text": "メンタルヘルス全体を見る驚くべき方法であり、異なる視点です。",
      "testimonialsV2.testimonial3Author": "Lucy N",
      "testimonialsV2.testimonial4Text": "皆さんも知っておくべきです、これは史上最高のウェルネスアプリです。",
      "testimonialsV2.testimonial4Author": "Daryn T",
      "testimonialsV2.testimonial5Text": "メンタルヘルスツールのふりをしたゲームではなく、楽しくて愛らしい本物のメンタルヘルスツールです。",
      "testimonialsV2.testimonial5Author": "Katherine",
      "testimonialsV2.authorPrefix": "投稿者",
      
      // Are You Ready Screen
      "areYouReady.title": "パーソナライズされたルーチンを設定して、あなたの旅を始める準備はできていますか？",
      "areYouReady.yesButton": "はい",
      "areYouReady.maybeLaterButton": "後で",
      
      // Wake Up Screen
      "wakeUp.title": "普段何時に起きますか？",
      "wakeUp.modalTitle": "時間を選択",
      
      // Good Night Screen
      "goodNight.title": "普段何時に寝ますか？",
      "goodNight.modalTitle": "時間を選択",
      
      // Ask Interests Page
      "askInterests.title": "以下のうち、実践したいものはどれですか？",
      "askInterests.subtitle": "該当するものをすべて選択してください",
      "askInterests.breathing": "呼吸エクササイズ",
      "askInterests.moodTracking": "気分の記録",
      "askInterests.journaling": "ジャーナリング",
      "askInterests.selfLove": "自己愛",
      "askInterests.gratitude": "感謝の実践",
      "askInterests.meditation": "瞑想",
      "askInterests.physical": "身体活動",
      "askInterests.sleep": "より良い睡眠",
      "askInterests.productivity": "生産性",
      
      // Customize Routine Screen
      "customizeRoutine.title": "あなたのメンタルウェルネス\nルーティンをカスタマイズ中",
      "customizeRoutine.percentage": "%",
      
      // Recommended Routine Intro Screen
      "recommendedRoutineIntro.message": "あなたのための推奨ルーティンです",
      "recommendedRoutineIntro.checkItOutButton": "確認する >>",
      
      // Routine Recommendation Screen
      "routineRecommendation.morningRoutineTitle": "朝のルーティン",
      "routineRecommendation.eveningRoutineTitle": "夜のルーティン",
      "routineRecommendation.checkIn": "チェックイン",
      "routineRecommendation.moodDiary": "気分日記",
      "routineRecommendation.gratitudeJar": "感謝の瓶",
      "routineRecommendation.changeText": "後で変更できます",
      "routineRecommendation.okayButton": "OK",
      
      // Mind Quote Screen
      "mindQuote.quote": "健康な心は成功した\n充実した意味のある\n人生の基盤です。",
      
      // Why Quabble Screen
      "whyQuabble.title": "Quabbleが\nあなたに必要なものである理由をご紹介します。",
      
      // Stats Screen
      "stats.title": "定期利用者の98%が\nQuabbleがメンタルヘルス管理に\n役立つと報告しています",
      
      // Improved Proof Screen
      "improvedProof.title": "定期利用者の87%が\nQuabbleを使い始めてから\nメンタルヘルスが改善されたと\n報告しています",
      
      // We Can Help Screen
      "weCanHelp.messageGeneral": "専門的なケアは不可欠ですが、\nQuabbleはあなたのメンタルヘルスの\n旅路でサポートを提供し、寄り添います。",
      "weCanHelp.messagePersonalized": "この困難な時期にお手伝いします。\n\"{achievement}\"は私たちと一緒に\n達成できることです。"
    }
  };
}