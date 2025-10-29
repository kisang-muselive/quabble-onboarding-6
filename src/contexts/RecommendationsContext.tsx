import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getLanguageFromUrl } from '../utils/language';
import { BASE_URL } from '../utils/apiConfig';

interface FetchRecommendationsResult {
  success: boolean;
  status?: number;
  data?: Recommendation[];
  error?: string;
  fullResponse?: unknown;
}

interface Recommendation {
  id: number;
  displayName: string;
  smallThumbnailUrl: string;
  largeThumbnailUrl?: string;
  description?: string;
}

interface RecommendationsContextType {
  recommendations: Recommendation[] | null;
  loading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<FetchRecommendationsResult>;
}

const RecommendationsContext = createContext<RecommendationsContextType | undefined>(undefined);

export const useRecommendations = () => {
  const context = useContext(RecommendationsContext);
  if (context === undefined) {
    throw new Error('useRecommendations must be used within a RecommendationsProvider');
  }
  return context;
};

interface RecommendationsProviderProps {
  children: ReactNode;
}

const API_ENDPOINT = `${BASE_URL}/quabble/onboardings/v3/recommendations/routines`;

export const RecommendationsProvider: React.FC<RecommendationsProviderProps> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  const fetchRecommendations = useCallback(async (): Promise<FetchRecommendationsResult> => {
    if (loading) {
      console.log('🔄 Recommendations fetch already in progress, skipping...');
      return { success: false, error: 'Fetch already in progress' };
    }

    console.log('🚀 Starting recommendations fetch...');
    setLoading(true);
    setError(null);

    try {
      const currentLanguage = getLanguageFromUrl();
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken ? `Bearer ${accessToken}` : '',
          'lang': currentLanguage,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Recommendations fetched successfully:', data);
      console.log('✅ Data type:', typeof data);
      console.log('✅ Data is array:', Array.isArray(data));
      
      // Handle API response format: { message: { workouts: [...] } }
      let recommendationsArray: Recommendation[] | null = null;
      
      if (data && data.message && Array.isArray(data.message.workouts)) {
        recommendationsArray = data.message.workouts;
        console.log('📋 Using data.message.workouts array');
      } else {
        console.log('❓ Unexpected response format:', data);
      }
      
      console.log('📊 Final recommendations array:', recommendationsArray);
      setRecommendations(recommendationsArray);
      setError(null);
      
      return { 
        success: true, 
        status: response.status, 
        data: recommendationsArray || [],
        fullResponse: data
      };
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Error fetching recommendations:', errorMessage);
      setError(errorMessage);
      setRecommendations(null);
      
      return { 
        success: false, 
        error: errorMessage,
        data: [] // fallback to empty array
      };
      
    } finally {
      setLoading(false);
      console.log('🏁 Recommendations fetch completed');
    }
  }, [accessToken, loading]);

  const value: RecommendationsContextType = {
    recommendations,
    loading,
    error,
    fetchRecommendations
  };

  return (
    <RecommendationsContext.Provider value={value}>
      {children}
    </RecommendationsContext.Provider>
  );
};