export type SubscriptionTier = 'basic' | 'standard' | 'premium' | 'elite';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: string;
  features: string[];
  restrictions: {
    maxQuestions?: number;
    maxChallenges?: number;
    hasAnalytics?: boolean;
    hasRomanceSection?: boolean;
    hasAICoaching?: boolean;
    hasExpertSessions?: boolean;
    hasPrioritySupport?: boolean;
    hasEarlyAccess?: boolean;
  };
}

export interface FeatureAccess {
  canAccess: boolean;
  requiredTier: SubscriptionTier;
  currentTier: SubscriptionTier;
  featureName: string;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  basic: {
    tier: 'basic',
    name: 'Basic',
    price: 'Free',
    features: [
      'Profile creation + basic questionnaire',
      '10 personalized questions/prompts',
      'Weekly "starter" challenges/games',
      'General relationship tips & articles',
    ],
    restrictions: {
      maxQuestions: 10,
      maxChallenges: 1,
      hasAnalytics: false,
      hasRomanceSection: false,
      hasAICoaching: false,
      hasExpertSessions: false,
      hasPrioritySupport: false,
      hasEarlyAccess: false,
    },
  },
  standard: {
    tier: 'standard',
    name: 'Standard',
    price: '$9.99/month',
    features: [
      'Everything in Basic',
      'Unlimited personalized AI-driven questions',
      'Progress tracking & milestone tools',
      'Access to themed content packs',
    ],
    restrictions: {
      maxQuestions: -1, // unlimited
      maxChallenges: -1, // unlimited
      hasAnalytics: true,
      hasRomanceSection: false,
      hasAICoaching: false,
      hasExpertSessions: false,
      hasPrioritySupport: false,
      hasEarlyAccess: false,
    },
  },
  premium: {
    tier: 'premium',
    name: 'Premium',
    price: '$19.99/month',
    features: [
      'Everything in Standard',
      'Advanced analytics & detailed progress reports',
      'Exclusive romance/erotica section',
      'Priority customer support',
    ],
    restrictions: {
      maxQuestions: -1,
      maxChallenges: -1,
      hasAnalytics: true,
      hasRomanceSection: true,
      hasAICoaching: false,
      hasExpertSessions: false,
      hasPrioritySupport: true,
      hasEarlyAccess: false,
    },
  },
  elite: {
    tier: 'elite',
    name: 'Elite',
    price: '$29.99/month',
    features: [
      'Everything in Premium',
      'AI-powered 1-on-1 relationship coaching',
      'Early access to new features/tools',
      'Monthly live Q&A sessions with relationship experts',
    ],
    restrictions: {
      maxQuestions: -1,
      maxChallenges: -1,
      hasAnalytics: true,
      hasRomanceSection: true,
      hasAICoaching: true,
      hasExpertSessions: true,
      hasPrioritySupport: true,
      hasEarlyAccess: true,
    },
  },
};

export const TIER_HIERARCHY: Record<SubscriptionTier, number> = {
  basic: 0,
  standard: 1,
  premium: 2,
  elite: 3,
};
