/**
 * API Client for Django REST Framework Backend
 */

import { API_BASE_URL, TOKEN_KEYS, REQUEST_TIMEOUT } from './api-config';
import type { User } from '@/services/auth.service';

// Token management
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.access);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.refresh);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.access, accessToken);
  localStorage.setItem(TOKEN_KEYS.refresh, refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.access);
  localStorage.removeItem(TOKEN_KEYS.refresh);
  localStorage.removeItem(TOKEN_KEYS.user);
}

export function getUserData(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(TOKEN_KEYS.user);
  return data ? JSON.parse(data) : null;
}

export function setUserData(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.user, JSON.stringify(user));
}

// API Client Error
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic API call function
export async function apiCall<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle different status codes
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      throw new APIError(
        errorData.detail || errorData.error || 'API request failed',
        response.status,
        errorData
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout');
      }
      throw new APIError(error.message);
    }
    
    throw new APIError('Unknown error occurred');
  }
}

// Authenticated API call
export async function authenticatedApiCall<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    throw new APIError('Not authenticated', 401);
  }

  try {
    return await apiCall<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (error instanceof APIError && error.status === 401) {
      // Try to refresh token
      const refreshToken = getRefreshToken();
      
      if (refreshToken) {
        try {
          const response = await apiCall<{ access: string }>('/auth/token/refresh/', {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
          });
          
          setTokens(response.access, refreshToken);
          
          // Retry original request with new token
          return await apiCall<T>(endpoint, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${response.access}`,
            },
          });
        } catch {
          // Refresh failed, clear tokens and throw
          clearTokens();
          throw new APIError('Session expired. Please login again.', 401);
        }
      }
    }
    
    throw error;
  }
}

// File upload helper
export async function uploadFiles<T = unknown>(
  endpoint: string,
  data: Record<string, unknown>,
  files?: Record<string, File>,
  authenticated = true
): Promise<T> {
  const formData = new FormData();
  
  // Add regular data
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      formData.append(key, stringValue);
    }
  });
  
  // Add files
  if (files) {
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });
  }
  
  const headers: HeadersInit = {};
  
  if (authenticated) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(
      errorData.detail || errorData.error || 'Upload failed',
      response.status,
      errorData
    );
  }
  
  return await response.json();
}

