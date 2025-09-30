import {useState} from 'react';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {SubscriptionTier} from '@/types/subscription';
import {
  hasFeatureAccess,
  getRequiredTierForFeature,
  hasActiveSubscription,
} from '@/utils/subscriptionUtils';

interface UseSubscriptionRestrictionProps {
  feature: string;
  onUpgrade?: () => void;
}

interface UseSubscriptionRestrictionReturn {
  canAccess: boolean;
  showRestrictionModal: boolean;
  currentTier: SubscriptionTier;
  requiredTier: SubscriptionTier;
  featureName: string;
  openRestrictionModal: () => void;
  closeRestrictionModal: () => void;
  handleFeatureAccess: () => boolean;
}

export const useSubscriptionRestriction = ({
  feature,
  onUpgrade,
}: UseSubscriptionRestrictionProps): UseSubscriptionRestrictionReturn => {
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);

  const user = useAppSelector(state => state.app.user);
  const currentTier = user?.userInfo?.subscription?.tier || 'basic';
  const requiredTier = getRequiredTierForFeature(feature);
  const isSubscribed = user?.userInfo?.subscription?.isSubscribed || false;
  const status = user?.userInfo?.subscription?.status || 'inactive';
  const expired = user?.userInfo?.subscription?.expired || true;
  const expiryDate = user?.userInfo?.subscription?.expiryDate;

  const hasActiveSub = hasActiveSubscription(
    isSubscribed,
    status,
    expired,
    expiryDate,
  );
  const canAccess =
    hasFeatureAccess(currentTier, requiredTier) &&
    (requiredTier === 'basic' ? true : hasActiveSub);

  const openRestrictionModal = () => {
    setShowRestrictionModal(true);
  };

  const closeRestrictionModal = () => {
    setShowRestrictionModal(false);
  };

  const handleFeatureAccess = (): boolean => {
    if (canAccess) {
      return true;
    } else {
      openRestrictionModal();
      return false;
    }
  };

  const handleUpgrade = () => {
    closeRestrictionModal();
    if (onUpgrade) {
      onUpgrade();
    }
  };

  return {
    canAccess,
    showRestrictionModal,
    currentTier,
    requiredTier,
    featureName: getFeatureDisplayName(feature),
    openRestrictionModal,
    closeRestrictionModal,
    handleFeatureAccess,
  };
};

const getFeatureDisplayName = (feature: string): string => {
  const featureNames: Record<string, string> = {
    unlimited_questions: 'Unlimited Questions',
    questions: 'Questions & Prompts',
    analytics: 'Analytics & Progress Reports',
    romance_section: 'Romance & Intimacy Section',
    ai_coaching: 'AI-Powered Coaching',
    expert_sessions: 'Expert Q&A Sessions',
    priority_support: 'Priority Support',
    early_access: 'Early Access Features',
  };

  return featureNames[feature] || feature;
};
