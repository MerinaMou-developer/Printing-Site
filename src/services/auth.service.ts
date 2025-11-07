/**
 * Authentication Service
 */

import { apiCall, authenticatedApiCall, setTokens, setUserData, clearTokens, getUserData } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  company_name?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
  login_as_admin?: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
  message: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  const payload: Record<string, unknown> = {
    ...data,
    password2: data.password_confirm,
  };

  const response = await apiCall<AuthResponse>(API_ENDPOINTS.auth.register, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  
  // Store tokens and user data
  setTokens(response.tokens.access, response.tokens.refresh);
  setUserData(response.user);
  
  return response;
}

/**
 * Login user
 */
export async function login({ email, password, login_as_admin = false }: LoginData): Promise<User> {
  const payload: Record<string, string> = {
    email,
    password,
  };

  if (login_as_admin) {
    payload.login_as_admin = 'true';
  }

  const response = await apiCall<LoginResponse>(API_ENDPOINTS.auth.login, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  
  // Store tokens
  setTokens(response.access, response.refresh);
  
  // Fetch user profile
  const user = await getProfile(response.access);
  setUserData(user);
  
  return user;
}

/**
 * Get user profile
 */
export async function getProfile(token?: string): Promise<User> {
  if (token) {
    return await apiCall<User>(API_ENDPOINTS.auth.profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  return await authenticatedApiCall<User>(API_ENDPOINTS.auth.profile);
}

/**
 * Update user profile
 */
export async function updateProfile(data: Partial<User>): Promise<{ user: User; message: string }> {
  const response = await authenticatedApiCall<{ user: User; message: string }>(
    API_ENDPOINTS.auth.updateProfile,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    }
  );
  
  // Update stored user data
  setUserData(response.user);
  
  return response;
}

/**
 * Change password
 */
export async function changePassword(data: {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}): Promise<{ message: string }> {
  return await authenticatedApiCall<{ message: string }>(
    API_ENDPOINTS.auth.changePassword,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

/**
 * Logout user
 */
export function logout(): void {
  clearTokens();
  
  // Redirect to home
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getUserData() !== null;
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return getUserData();
}

