'use client';

import { useUser } from '@/app/context/UserContext';

interface UsePaywallResult {
  hasFullAccess: boolean;
  shouldShowAds: boolean;
  canAccessArticle: (articlePaywalled: boolean) => boolean;
}

/**
 * Custom hook to handle paywall-related functionality
 * @returns Object with paywall utility functions and status
 */
export function usePaywall(): UsePaywallResult {
  const { user, isAuthenticated } = useUser();
  
  // User has full access if they're authenticated and have paywall access
  const hasFullAccess = isAuthenticated && user.paywall;
  
  // Show ads if user is not authenticated or doesn't have paywall access
  const shouldShowAds = !isAuthenticated || !user.paywall;
  
  /**
   * Determines if a user can access the full content of an article
   * @param articlePaywalled Whether the article requires paywall access
   * @returns Boolean indicating if the user can access the full article
   */
  const canAccessArticle = (articlePaywalled: boolean): boolean => {
    // If article is not paywalled, everyone can access it
    if (!articlePaywalled) {
      return true;
    }
    
    // If user is not authenticated, they can access all articles
    if (!isAuthenticated) {
      return true;
    }
    
    // If user is authenticated and article is paywalled, only users with paywall access can see it fully
    return hasFullAccess;
  };
  
  return {
    hasFullAccess,
    shouldShowAds,
    canAccessArticle
  };
}
