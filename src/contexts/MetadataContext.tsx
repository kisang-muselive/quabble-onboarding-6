import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface MetadataItem {
  id: number;
  type: string;
  name: string;
  displayName: string;
}

interface MetadataResponse {
  message: {
    hasSucceeded: boolean;
    practice: MetadataItem[];
    supportSystem: MetadataItem[];
  };
}

interface DebugInfo {
  url?: string;
  headers?: Record<string, string>;
  status?: number;
  error?: string;
}

interface MetadataContextType {
  metadata: MetadataResponse['message'] | null;
  loading: boolean;
  error: string | null;
  debugInfo: DebugInfo | null;
  fetchMetadata: () => Promise<void>;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
};

interface MetadataProviderProps {
  children: ReactNode;
}

export const MetadataProvider: React.FC<MetadataProviderProps> = ({ children }) => {
  const [metadata, setMetadata] = useState<MetadataResponse['message'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
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

  // Default fallback data
  const defaultMetadata: MetadataResponse['message'] = {
    hasSucceeded: false,
    practice: [
      { id: 14, type: "practice", name: "breathing", displayName: "Breathing exercises" },
      { id: 17, type: "practice", name: "mood", displayName: "Mood tracking" },
      { id: 15, type: "practice", name: "journaling", displayName: "Journaling" },
      { id: 18, type: "practice", name: "selflove", displayName: "Self-love" },
      { id: 19, type: "practice", name: "gratitude", displayName: "Gratitude practices" },
      { id: 16, type: "practice", name: "meditation", displayName: "Meditation" },
      { id: 20, type: "practice", name: "physical", displayName: "Physical activities" },
      { id: 21, type: "practice", name: "sleep", displayName: "Better sleep" },
      { id: 27, type: "practice", name: "productivity", displayName: "Productivity" }
    ],
    supportSystem: [
      { id: 23, type: "supportsystem", name: "excellent", displayName: "Excellent" },
      { id: 24, type: "supportsystem", name: "good", displayName: "Good" },
      { id: 25, type: "supportsystem", name: "limited", displayName: "Limited" },
      { id: 26, type: "supportsystem", name: "poor", displayName: "Poor" }
    ]
  };

  const fetchMetadata = useCallback(async () => {
    if (!accessToken) {
      console.warn('⚠️ No access token available, using default metadata');
      setMetadata(defaultMetadata);
      setLoading(false);
      setDebugInfo({
        error: 'No access token available'
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const requestUrl = `${BASE_URL}/quabble/onboardings/metadata`;
      const requestHeaders = getHeaders();
      
      // Set debug info for request
      setDebugInfo({
        url: requestUrl,
        headers: {
          ...requestHeaders,
          Authorization: `Bearer ${accessToken?.substring(0, 20)}...` // Truncate for display
        }
      });
      
      console.log('📡 Making API call to:', requestUrl);
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: requestHeaders
      });

      console.log('📥 API response status:', response.status);
      
      // Update debug info with response status
      setDebugInfo(prev => ({
        ...(prev || {}),
        status: response.status
      }));

      if (!response.ok) {
        const errorText = await response.text();
        const errorMessage = `Failed to fetch metadata: ${response.status} - ${errorText}`;
        
        // Update debug info with error
        setDebugInfo(prev => ({
          ...(prev || {}),
          error: errorText || `HTTP ${response.status} Error`
        }));
        
        throw new Error(errorMessage);
      }

      const data: MetadataResponse = await response.json();
      console.log('✅ Metadata fetched successfully:', data);
      setMetadata(data.message);
    } catch (err) {
      console.error('❌ Error fetching metadata:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch metadata';
      setError(errorMessage);
      
      // Update debug info with catch error
      setDebugInfo(prev => ({
        ...(prev || {}),
        error: errorMessage
      }));
      
      // Use default metadata if API fails
      console.log('🔄 Using default metadata as fallback');
      setMetadata(defaultMetadata);
    } finally {
      setLoading(false);
      console.log('🏁 Metadata fetch completed');
    }
  }, [accessToken]);

  // Don't auto-fetch on mount - let components trigger it manually
  // useEffect(() => {
  //   fetchMetadata();
  // }, []);

  const value: MetadataContextType = {
    metadata,
    loading,
    error,
    debugInfo,
    fetchMetadata
  };

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
};