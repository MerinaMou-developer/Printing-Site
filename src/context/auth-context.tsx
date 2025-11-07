'use client';

/**
 * Authentication Context
 * Provides authentication state and functions throughout the app
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, RegisterData, login as loginService, register as registerService, logout as logoutService, getCurrentUser, getProfile } from '@/services/auth.service';
import { APIError } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, options?: { asAdmin?: boolean }) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = getCurrentUser();
        setUser(storedUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (
    email: string,
    password: string,
    options?: { asAdmin?: boolean }
  ) => {
    setLoading(true);
    try {
      const userData = await loginService({
        email,
        password,
        login_as_admin: options?.asAdmin,
      });
      setUser(userData);
    } catch (error) {
      if (error instanceof APIError) {
        throw new Error(error.message);
      }
      throw new Error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await registerService(data);
      setUser(response.user);
    } catch (error) {
      if (error instanceof APIError) {
        throw new Error(error.message);
      }
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    logoutService();
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const userData = await getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, user might be logged out
      setUser(null);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

