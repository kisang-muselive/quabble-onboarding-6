/**
 * Centralized API configuration
 * Determines base URL based on deployment environment
 */

// Use production URL only if deployed to quabble-onboarding-6.vercel.app
const isProduction = typeof window !== 'undefined' &&
  window.location.hostname.includes('quabble-onboarding-6.vercel.app');

export const BASE_URL = isProduction
  ? 'https://prod-canary-1-27.muse.live/api'  // Production: prod-canary
  : 'https://dev-1-27.clubmuse.live/api';  // Development/other: dev

// Log the current environment configuration
console.log('🌐 API Environment:', isProduction ? 'Production' : 'Development');
console.log('📍 Base URL:', BASE_URL);
