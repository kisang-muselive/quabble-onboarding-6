import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getLanguageFromUrl } from '../utils/language';

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
  fetchRecommendations: () => Promise<void>;
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

const API_ENDPOINT = process.env.NODE_ENV === 'development'
  ? '/api/quabble/onboardings/v3/recommendations/routines'  // Use proxy in development
  : 'https://prod-canary-1-27.muse.live/api/quabble/onboardings/v3/recommendations/routines'; // Direct URL in production

export const RecommendationsProvider: React.FC<RecommendationsProviderProps> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  const fetchRecommendations = useCallback(async () => {
    if (loading) {
      console.log('🔄 Recommendations fetch already in progress, skipping...');
      return;
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Error fetching recommendations:', errorMessage);
      setError(errorMessage);
      setRecommendations(null);
    } finally {
      setLoading(false);
      console.log('🏁 Recommendations fetch completed');
    }
  }, [accessToken, loading]);

  const value: RecommendationsContextType = {
    recommendations,
    loading,
    error,
    fetchRecommendations,
  };

  return (
    <RecommendationsContext.Provider value={value}>
      {children}
    </RecommendationsContext.Provider>
  );
};