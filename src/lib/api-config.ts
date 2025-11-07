/**
 * API Configuration for Django Backend
 */

// API Base URL - Change this for production
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    register: '/auth/register/',
    login: '/auth/login/',
    refresh: '/auth/token/refresh/',
    profile: '/auth/profile/',
    updateProfile: '/auth/profile/update/',
    changePassword: '/auth/change-password/',
  },
  
  // Products
  products: {
    list: '/products/',
    detail: (slug: string) => `/products/${slug}/`,
    featured: '/products/featured/',
    search: '/products/search/',
  },
  
  // Categories
  categories: {
    list: '/categories/',
    detail: (slug: string) => `/categories/${slug}/`,
    products: (slug: string) => `/categories/${slug}/products/`,
  },
  
  // Cart
  cart: {
    get: '/cart/',
    addItem: '/cart/add_item/',
    updateItem: (itemId: number) => `/cart/items/${itemId}/`,
    removeItem: (itemId: number) => `/cart/items/${itemId}/`,
    clear: '/cart/clear/',
  },
  
  // Orders
  orders: {
    list: '/orders/',
    detail: (id: number) => `/orders/${id}/`,
    checkout: '/orders/checkout/',
  },
};

// Request timeout
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Token storage keys
export const TOKEN_KEYS = {
  access: 'access_token',
  refresh: 'refresh_token',
  user: 'user_data',
};

