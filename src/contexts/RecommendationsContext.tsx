import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Workout {
  id: number;
  name: string;
  displayName: string;
  description: string;
  smallThumbnailUrl: string;
  bigThumbnailUrl: string;
  BackgroundImageUrl: string;
  BackgroundRGBColor: string;
  isNew: boolean;
  order: number;
  category: {
    id: number;
    name: string;
    displayName: string;
  };
  tags: Array<{
    id: number;
    name: string;
    displayName: string;
  }> | null;
  availableVersion: string;
}

interface RecommendationsResponse {
  message: {
    workouts: Workout[];
  };
}

interface RecommendationsContextType {
  recommendations: Workout[] | null;
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

export const RecommendationsProvider: React.FC<RecommendationsProviderProps> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<Workout[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // Default fallback workouts
  const defaultWorkouts: Workout[] = [
    {
      id: 1,
      name: "mood-diary-morning",
      displayName: "Mood Diary",
      description: "Morning mood tracking",
      smallThumbnailUrl: "/images/24-smoothie.png",
      bigThumbnailUrl: "/images/24-smoothie.png",
      BackgroundImageUrl: "/images/24-smoothie.png",
      BackgroundRGBColor: "FFA500",
      isNew: false,
      order: 1,
      category: { id: 1, name: "wellness", displayName: "Wellness" },
      tags: null,
      availableVersion: "2.2.8"
    },
    {
      id: 2,
      name: "gratitude-evening",
      displayName: "Gratitude Jar",
      description: "Evening gratitude practice",
      smallThumbnailUrl: "/images/24-jar.png",
      bigThumbnailUrl: "/images/24-jar.png",
      BackgroundImageUrl: "/images/24-jar.png",
      BackgroundRGBColor: "605D4E",
      isNew: false,
      order: 2,
      category: { id: 2, name: "gratitude", displayName: "Gratitude" },
      tags: null,
      availableVersion: "2.2.8"
    }
  ];

  const fetchRecommendations = async () => {
    if (!accessToken) {
      console.warn('⚠️ No access token available, using default recommendations');
      setRecommendations(defaultWorkouts);
      setLoading(false);
      return;
    }

    try {
      console.log('🚀 Starting recommendations fetch...');
      setLoading(true);
      setError(null);
      
      console.log('📡 Making API call to:', `${BASE_URL}/quabble/onboardings/recommendations`);
      const response = await fetch(`${BASE_URL}/quabble/onboardings/recommendations`, {
        method: 'GET',
        headers: getHeaders()
      });

      console.log('📥 Recommendations API response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.status}`);
      }

      const data: RecommendationsResponse = await response.json();
      console.log('✅ Recommendations fetched successfully:', data);
      setRecommendations(data.message.workouts);
    } catch (err) {
      console.error('❌ Error fetching recommendations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
      // Use default workouts if API fails
      console.log('🔄 Using default workouts as fallback');
      setRecommendations(defaultWorkouts);
    } finally {
      setLoading(false);
      console.log('🏁 Recommendations fetch completed');
    }
  };

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