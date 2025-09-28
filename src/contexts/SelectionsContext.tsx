import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SubmitSelectionsResult {
  success: boolean;
  status?: number;
  data?: unknown;
  error?: string;
  requestPayload?: unknown;
}

interface SelectionsContextType {
  selections: number[];
  addSelection: (optionId: number) => void;
  removeSelection: (optionId: number) => void;
  clearSelections: () => void;
  submitSelections: () => Promise<SubmitSelectionsResult>;
  isSubmitting: boolean;
  submitError: string | null;
  // Legacy fields for compatibility with existing components
  practiceIds: number[];
  supportSystemId: number | null;
  setPracticeIds: (ids: number[]) => void;
  setSupportSystemId: (id: number | null) => void;
}

const SelectionsContext = createContext<SelectionsContextType | undefined>(undefined);

export const useSelections = () => {
  const context = useContext(SelectionsContext);
  if (context === undefined) {
    throw new Error('useSelections must be used within a SelectionsProvider');
  }
  return context;
};

interface SelectionsProviderProps {
  children: ReactNode;
}

const API_ENDPOINT = process.env.NODE_ENV === 'development'
  ? '/api/quabble/onboardings/v3/questions'  // Use proxy in development
  : 'https://prod-canary-1-27.muse.live/api/quabble/onboardings/v3/questions'; // Direct URL in production

export const SelectionsProvider: React.FC<SelectionsProviderProps> = ({ children }) => {
  const [selections, setSelections] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Legacy state for existing components
  const [practiceIds, setPracticeIds] = useState<number[]>([]);
  const [supportSystemId, setSupportSystemId] = useState<number | null>(null);
  const { accessToken } = useAuth();

  const addSelection = (optionId: number) => {
    console.log('📝 Adding selection:', optionId);
    setSelections(prev => {
      if (!prev.includes(optionId)) {
        const newSelections = [...prev, optionId];
        console.log('✅ Updated selections:', newSelections);
        return newSelections;
      }
      return prev;
    });
  };

  const removeSelection = (optionId: number) => {
    console.log('🗑️ Removing selection:', optionId);
    setSelections(prev => {
      const newSelections = prev.filter(id => id !== optionId);
      console.log('✅ Updated selections:', newSelections);
      return newSelections;
    });
  };

  const clearSelections = () => {
    console.log('🧹 Clearing all selections');
    setSelections([]);
  };

  const submitSelections = async (): Promise<SubmitSelectionsResult> => {
    // Build comprehensive payload including both new and legacy selection methods
    const payload: Record<string, unknown> = {};
    
    // Include new selection approach if we have selections
    if (selections.length > 0) {
      payload.optionIds = selections;
    }
    
    // Always include a default feeling status
    // payload.feelingStatusIds = [1];

    // Check if we have anything to submit
    if (selections.length === 0) {
      console.log('⚠️ No selections to submit');
      return { success: false, error: 'No selections to submit' };
    }

    console.log('🚀 Submitting selections to API:', payload);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Import the language utility
      const { getLanguageFromUrl } = await import('../utils/language');
      const currentLanguage = getLanguageFromUrl();

      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'lang': currentLanguage,
      };

      // Add authorization header if we have a token
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        referrerPolicy: 'no-referrer',
        headers,
        body: JSON.stringify({
          optionIds: selections
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Selections submitted successfully:', result);
      
      // Clear selections after successful submission
      clearSelections();
      
      return { 
        success: true, 
        status: response.status, 
        data: result,
        requestPayload: payload
      };
      
    } catch (error) {
      console.error('❌ Failed to submit selections:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit selections';
      setSubmitError(errorMessage);
      
      return { 
        success: false, 
        error: errorMessage,
        requestPayload: payload
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const value: SelectionsContextType = {
    selections,
    addSelection,
    removeSelection,
    clearSelections,
    submitSelections,
    isSubmitting,
    submitError,
    // Legacy fields for compatibility
    practiceIds,
    supportSystemId,
    setPracticeIds,
    setSupportSystemId
  };

  return (
    <SelectionsContext.Provider value={value}>
      {children}
    </SelectionsContext.Provider>
  );
};