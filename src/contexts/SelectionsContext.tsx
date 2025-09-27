import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SelectionsContextType {
  practiceIds: number[];
  supportSystemId: number | null;
  setPracticeIds: (ids: number[]) => void;
  setSupportSystemId: (id: number | null) => void;
  submitSelections: () => Promise<any>;
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
      return { success: false, error: 'No access token' };
    }

    try {
      console.log('🚀 Submitting user selections...');
      console.log('📊 Selections:', {
        feelingStatusIds,
        practiceIds,
        supportSystemId
      });
      
      const requestBody = {
        feelingStatusIds: feelingStatusIds && feelingStatusIds.length > 0 ? feelingStatusIds : [1],
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
        const errorText = await response.text();
        throw new Error(`Failed to submit selections: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Selections submitted successfully:', data);
      return { success: true, data, status: response.status };
    } catch (err) {
      console.error('❌ Error submitting selections:', err);
      // Don't throw error - allow user to continue even if submission fails
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
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