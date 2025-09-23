import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userId: number | null;
  accessToken: string | null;
  setAuthData: (userId: number, accessToken: string) => void;
  clearAuthData: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setAuthData = (newUserId: number, newAccessToken: string) => {
    console.log('🔐 Setting auth data:', { userId: newUserId, hasToken: !!newAccessToken });
    setUserId(newUserId);
    setAccessToken(newAccessToken);
  };

  const clearAuthData = () => {
    console.log('🔓 Clearing auth data');
    setUserId(null);
    setAccessToken(null);
  };

  const isAuthenticated = userId !== null && accessToken !== null;

  const value: AuthContextType = {
    userId,
    accessToken,
    setAuthData,
    clearAuthData,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};