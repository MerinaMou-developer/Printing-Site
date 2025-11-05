"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Toast } from './toast';
import ToastContainer from './toast';
import { cleanupOldCartData } from '@/lib/cart-cleanup';
import { autoCleanupIfNeeded } from '@/lib/force-cleanup-cart';

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  showSuccess: (title: string, message: string, options?: Partial<Toast>) => void;
  showError: (title: string, message: string, options?: Partial<Toast>) => void;
  showWarning: (title: string, message: string, options?: Partial<Toast>) => void;
  showInfo: (title: string, message: string, options?: Partial<Toast>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Clean up old cart data on app load
  useEffect(() => {
    // Run automatic cleanup first (quick check)
    autoCleanupIfNeeded();
    // Then run detailed cleanup
    cleanupOldCartData();
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId();
    const newToast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [removeToast]);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showSuccess = useCallback((title: string, message: string, options?: Partial<Toast>) => {
    showToast({
      type: 'success',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  const showError = useCallback((title: string, message: string, options?: Partial<Toast>) => {
    showToast({
      type: 'error',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  const showWarning = useCallback((title: string, message: string, options?: Partial<Toast>) => {
    showToast({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  const showInfo = useCallback((title: string, message: string, options?: Partial<Toast>) => {
    showToast({
      type: 'info',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}