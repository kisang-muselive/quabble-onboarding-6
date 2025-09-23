export interface QuestionOption {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  name: string;
  text: string;
  tag: string;
  options: QuestionOption[];
}

export interface QuestionsResponse {
  message: Question[];
}

const API_ENDPOINT = process.env.NODE_ENV === 'development'
  ? '/api/quabble/onboardings/v3/questions'  // Use proxy in development
  : 'https://prod-canary-1-27.muse.live/api/quabble/onboardings/v3/questions'; // Direct URL in production

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    // Import the language utility
    const { getLanguageFromUrlForQuestionsRequest } = await import('../utils/language');
    const currentLanguage = getLanguageFromUrlForQuestionsRequest();
    console.log('🔄 Fetching questions for language:', currentLanguage);
    const response = await fetch(API_ENDPOINT, {
      referrerPolicy: 'no-referrer',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'lang': currentLanguage,
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: QuestionsResponse = await response.json();
    return data.message;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

// Default fallback questions in case API fails
export const defaultQuestions: Question[] = [
  {
    id: 1,
    name: "Q1",
    text: "How did you hear about us?",
    tag: "onboarding4",
    options: [
      { id: 1, text: "App search" },
      { id: 2, text: "Social Media Ad" },
      { id: 3, text: "Friend or Family" },
      { id: 4, text: "Other" }
    ]
  },
  {
    id: 2,
    name: "Q2",
    text: "What is your age group?",
    tag: "onboarding4",
    options: [
      { id: 5, text: "Under 18" },
      { id: 6, text: "18-24" },
      { id: 7, text: "25-34" },
      { id: 8, text: "35 and over" },
      { id: 9, text: "Prefer not to answer" }
    ]
  },
  {
    id: 3,
    name: "Q3",
    text: "What do you want to achieve with us?",
    tag: "onboarding4",
    options: [
      { id: 10, text: "Taking care of my mental health" },
      { id: 11, text: "Managing daily stress" },
      { id: 12, text: "Cultivating a positive mindset" },
      { id: 13, text: "Boosting self-love" },
      { id: 14, text: "Connecting with others" },
      { id: 15, text: "Improving productivity" }
    ]
  },
  {
    id: 4,
    name: "Q4",
    text: "What have you been dealing with",
    tag: "onboarding4",
    options: [
      { id: 16, text: "Depression" },
      { id: 17, text: "Anxiety" },
      { id: 18, text: "Panicky" },
      { id: 19, text: "OCD" },
      { id: 20, text: "Bipolar Disorder" },
      { id: 21, text: "Eating Disorder" },
      { id: 22, text: "PTSD" },
      { id: 23, text: "Something Else" }
    ]
  },
  {
    id: 5,
    name: "Q5",
    text: "How have you been lately?",
    tag: "onboarding4",
    options: [
      { id: 24, text: "Going through something difficult recently" },
      { id: 25, text: "ongoing mental health challenges" },
      { id: 26, text: "doing okay" }
    ]
  },
  {
    id: 6,
    name: "Q6",
    text: "Which of the following are you interested in practicing?",
    tag: "onboarding4",
    options: [
      { id: 27, text: "Breathing exercises" },
      { id: 28, text: "Mood tracking" },
      { id: 29, text: "Journaling" },
      { id: 30, text: "Self-love" },
      { id: 31, text: "Gratitude practices" },
      { id: 32, text: "Meditation" },
      { id: 33, text: "Physical activities" },
      { id: 34, text: "Better sleep" },
      { id: 35, text: "Productivity" }
    ]
  },
  {
    id: 7,
    name: "Q7",
    text: "How strong is your support system?",
    tag: "onboarding4",
    options: [
      { id: 36, text: "Excellent" },
      { id: 37, text: "Good" },
      { id: 38, text: "Limited" },
      { id: 39, text: "Poor" }
    ]
  },
  {
    id: 8,
    name: "Q8",
    text: "Sorry to hear that. What's been going on?",
    tag: "onboarding4",
    options: [
      { id: 40, text: "Breakup or relationship stress" },
      { id: 41, text: "Career or academic pressure" },
      { id: 42, text: "Health issues" },
      { id: 43, text: "Burnout" },
      { id: 44, text: "Loneliness" },
      { id: 45, text: "Loss" },
      { id: 46, text: "Something else" },
      { id: 47, text: "Nothing specific" }
    ]
  }
];