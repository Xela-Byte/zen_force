import {
  SubscriptionTier,
  SUBSCRIPTION_PLANS,
  TIER_HIERARCHY,
  FeatureAccess,
} from '@/types/subscription';

/**
 * Check if a user's subscription tier has access to a specific feature
 */
export const hasFeatureAccess = (
  userTier: SubscriptionTier,
  requiredTier: SubscriptionTier,
): boolean => {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[requiredTier];
};

/**
 * Get feature access information for a specific feature
 */
export const getFeatureAccess = (
  userTier: SubscriptionTier,
  featureName: string,
  requiredTier: SubscriptionTier,
): FeatureAccess => {
  const canAccess = hasFeatureAccess(userTier, requiredTier);

  return {
    canAccess,
    requiredTier,
    currentTier: userTier,
    featureName,
  };
};

/**
 * Check if user can access unlimited questions
 */
export const canAccessUnlimitedQuestions = (
  userTier: SubscriptionTier,
): boolean => {
  return hasFeatureAccess(userTier, 'standard');
};

/**
 * Check if user can access questions (with limits for basic tier)
 */
export const canAccessQuestions = (
  userTier: SubscriptionTier,
  questionsUsed: number = 0,
): boolean => {
  const plan = SUBSCRIPTION_PLANS[userTier];
  if (!plan) return false;

  // If unlimited questions (-1), always allow
  if (plan.restrictions.maxQuestions === -1) return true;

  // Check if user is within their question limit
  return questionsUsed < plan.restrictions.maxQuestions;
};

/**
 * Get the maximum number of questions for a user's tier
 */
export const getMaxQuestions = (userTier: SubscriptionTier): number => {
  const plan = SUBSCRIPTION_PLANS[userTier];
  return plan?.restrictions.maxQuestions || 0;
};

/**
 * Check if user has reached their question limit
 */
export const hasReachedQuestionLimit = (
  userTier: SubscriptionTier,
  questionsUsed: number,
): boolean => {
  const maxQuestions = getMaxQuestions(userTier);
  if (maxQuestions === -1) return false; // Unlimited
  return questionsUsed >= maxQuestions;
};

/**
 * Check if user can access analytics
 */
export const canAccessAnalytics = (userTier: SubscriptionTier): boolean => {
  return hasFeatureAccess(userTier, 'basic');
};

/**
 * Check if user can access romance section
 */
export const canAccessRomanceSection = (
  userTier: SubscriptionTier,
): boolean => {
  return hasFeatureAccess(userTier, 'premium');
};

/**
 * Check if user can access AI coaching
 */
export const canAccessAICoaching = (userTier: SubscriptionTier): boolean => {
  return hasFeatureAccess(userTier, 'elite');
};

/**
 * Check if user can access expert sessions
 */
export const canAccessExpertSessions = (
  userTier: SubscriptionTier,
): boolean => {
  return hasFeatureAccess(userTier, 'elite');
};

/**
 * Check if user can access priority support
 */
export const canAccessPrioritySupport = (
  userTier: SubscriptionTier,
): boolean => {
  return hasFeatureAccess(userTier, 'premium');
};

/**
 * Check if user can access early features
 */
export const canAccessEarlyFeatures = (userTier: SubscriptionTier): boolean => {
  return hasFeatureAccess(userTier, 'elite');
};

/**
 * Get the minimum tier required for a feature
 */
export const getRequiredTierForFeature = (
  feature: string,
): SubscriptionTier => {
  const featureMap: Record<string, SubscriptionTier> = {
    unlimited_questions: 'standard',
    questions: 'basic', // Basic users can access questions with limits
    analytics: 'basic',
    romance_section: 'premium',
    ai_coaching: 'elite',
    expert_sessions: 'elite',
    priority_support: 'premium',
    early_access: 'elite',
  };

  return featureMap[feature] || 'elite';
};

/**
 * Get user's current subscription plan
 */
export const getUserPlan = (userTier: SubscriptionTier) => {
  return SUBSCRIPTION_PLANS[userTier];
};

/**
 * Check if user has active subscription
 */
export const hasActiveSubscription = (
  isSubscribed: boolean,
  status: 'active' | 'inactive' | 'cancelled',
  expired: boolean,
  expiryDate?: string,
): boolean => {
  // If we have an expiry date, check if it's in the future
  if (expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const isNotExpired = expiry > now;
    return isSubscribed && status === 'active' && isNotExpired;
  }

  // Fallback to the expired boolean
  return isSubscribed && status === 'active' && !expired;
};
