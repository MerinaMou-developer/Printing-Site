"use client";

import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

export function WebVitalsAnalytics() {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendToAnalytics = (metric: WebVitalsMetric) => {
      // You can replace this with your analytics service
      console.log('Web Vital:', metric);
      
      // Example: Send to Google Analytics
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
    };

    // Simple performance monitoring without external library
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor page load time
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        
        sendToAnalytics({
          name: 'Page Load Time',
          value: loadTime,
          delta: loadTime,
          id: 'page-load',
          navigationType: 'navigate',
        });
      });

      // Monitor LCP using Performance Observer
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            sendToAnalytics({
              name: 'LCP',
              value: entry.startTime,
              delta: entry.startTime,
              id: 'lcp',
              navigationType: 'navigate',
            });
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);

  return null;
}
