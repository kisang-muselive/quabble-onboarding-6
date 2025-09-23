import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SelectionsContextType {
  selections: number[];
  addSelection: (optionId: number) => void;
  removeSelection: (optionId: number) => void;
  clearSelections: () => void;
  submitSelections: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
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

  const submitSelections = async () => {
    if (selections.length === 0) {
      console.log('⚠️ No selections to submit');
      return;
    }

    console.log('🚀 Submitting selections to API:', selections);
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
      
    } catch (error) {
      console.error('❌ Failed to submit selections:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit selections');
      throw error; // Re-throw so calling code can handle it
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
    submitError
  };

  return (
    <SelectionsContext.Provider value={value}>
      {children}
    </SelectionsContext.Provider>
  );
};