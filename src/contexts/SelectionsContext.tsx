import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SelectionsContextType {
  practiceIds: number[];
  supportSystemId: number | null;
  setPracticeIds: (ids: number[]) => void;
  setSupportSystemId: (id: number | null) => void;
  submitSelections: () => Promise<void>;
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

export const SelectionsProvider: React.FC<SelectionsProviderProps> = ({ children }) => {
  const [mentalStatusId, setMentalStatusId] = useState<number | null>(null);
  const [feelingStatusIds, setFeelingStatusIds] = useState<number[]>([]);
  const [practiceIds, setPracticeIds] = useState<number[]>([]);
  const [supportSystemId, setSupportSystemId] = useState<number | null>(null);
  const { accessToken } = useAuth();

  // API configuration - different URLs for dev vs production
  const BASE_URL = (import.meta as any).env.DEV 
    ? '/api'  // Development: use proxy
    : 'https://prod-canary-1-27.muse.live/api';  // Production: direct URL
  
  const getHeaders = () => ({
    'Authorization': `Bearer ${accessToken}`,
    'X-Is-Reader': 'yes',
    'Content-Type': 'application/json'
  });

  const submitSelections = async () => {
    if (!accessToken) {
      console.warn('⚠️ No access token available, skipping selections submission');
      return;
    }

    try {
      console.log('🚀 Submitting user selections...');
      console.log('📊 Selections:', {
        mentalStatusId,
        feelingStatusIds,
        practiceIds,
        supportSystemId
      });
      
      const requestBody = {
        mentalStatusId,
        feelingStatusIds,
        practiceIds,
        supportSystemId
      };

      console.log('📡 Making POST request to:', `${BASE_URL}/quabble/onboardings/metadata`);
      const response = await fetch(`${BASE_URL}/quabble/onboardings/metadata`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Selections submission response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to submit selections: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Selections submitted successfully:', data);
    } catch (err) {
      console.error('❌ Error submitting selections:', err);
      // Don't throw error - allow user to continue even if submission fails
    }
  };

  const value: SelectionsContextType = {
    practiceIds,
    supportSystemId,
    setPracticeIds,
    setSupportSystemId,
    submitSelections
  };

  return (
    <SelectionsContext.Provider value={value}>
      {children}
    </SelectionsContext.Provider>
  );
};