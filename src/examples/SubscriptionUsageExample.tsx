/**
 * Example of how to use the subscription restriction system
 *
 * This file demonstrates how to implement subscription-based feature restrictions
 * throughout the app using the subscription utilities and components.
 */

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSubscriptionRestriction} from '@/hooks/useSubscriptionRestriction';
import SubscriptionRestrictionModal from '@/components/subscription/SubscriptionRestrictionModal';
import {useAppDispatch} from '@/hooks/helpers/useRedux';
import {updateSubscription} from '@/store/slices/appSlice';

// Example 1: Basic feature restriction
const BasicFeatureExample = () => {
  const subscriptionCheck = useSubscriptionRestriction({
    feature: 'unlimited_questions',
    onUpgrade: () => {
      // Navigate to upgrade screen
      console.log('Navigate to upgrade');
    },
  });

  const handleFeatureAccess = () => {
    if (subscriptionCheck.handleFeatureAccess()) {
      // User has access, proceed with feature
      console.log('Access granted!');
    }
    // If no access, modal will show automatically
  };

  return (
    <View>
      <TouchableOpacity onPress={handleFeatureAccess}>
        <Text>Access Unlimited Questions</Text>
      </TouchableOpacity>

      <SubscriptionRestrictionModal
        visible={subscriptionCheck.showRestrictionModal}
        onClose={subscriptionCheck.closeRestrictionModal}
        onUpgrade={() => {
          subscriptionCheck.closeRestrictionModal();
          // Navigate to upgrade
        }}
        currentTier={subscriptionCheck.currentTier}
        requiredTier={subscriptionCheck.requiredTier}
        featureName={subscriptionCheck.featureName}
      />
    </View>
  );
};

// Example 2: Advanced feature with custom modal
const AdvancedFeatureExample = () => {
  const [customModal, setCustomModal] = useState(false);
  const dispatch = useAppDispatch();

  const subscriptionCheck = useSubscriptionRestriction({
    feature: 'ai_coaching',
    onUpgrade: () => {
      setCustomModal(true);
    },
  });

  const handleAICoaching = () => {
    if (subscriptionCheck.handleFeatureAccess()) {
      // Start AI coaching session
      console.log('Starting AI coaching...');
    }
  };

  const handleUpgrade = () => {
    // Simulate subscription upgrade
    dispatch(
      updateSubscription({
        tier: 'elite',
        isSubscribed: true,
        status: 'active',
        expired: false,
      }),
    );
    setCustomModal(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAICoaching}>
        <Text>Start AI Coaching</Text>
      </TouchableOpacity>

      <SubscriptionRestrictionModal
        visible={customModal}
        onClose={() => setCustomModal(false)}
        onUpgrade={handleUpgrade}
        currentTier={subscriptionCheck.currentTier}
        requiredTier={subscriptionCheck.requiredTier}
        featureName={subscriptionCheck.featureName}
      />
    </View>
  );
};

// Example 3: Conditional rendering based on subscription
const ConditionalFeatureExample = () => {
  const subscriptionCheck = useSubscriptionRestriction({
    feature: 'analytics',
  });

  return (
    <View>
      {subscriptionCheck.canAccess ? (
        <View>
          <Text>Analytics Dashboard</Text>
          <Text>Your relationship progress...</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => subscriptionCheck.openRestrictionModal()}>
          <Text>Upgrade to see Analytics</Text>
        </TouchableOpacity>
      )}

      <SubscriptionRestrictionModal
        visible={subscriptionCheck.showRestrictionModal}
        onClose={subscriptionCheck.closeRestrictionModal}
        onUpgrade={() => {
          subscriptionCheck.closeRestrictionModal();
          // Navigate to upgrade
        }}
        currentTier={subscriptionCheck.currentTier}
        requiredTier={subscriptionCheck.requiredTier}
        featureName={subscriptionCheck.featureName}
      />
    </View>
  );
};

// Example 4: Game/Feature with subscription requirements
const GameWithRestrictions = ({
  gameName,
  requiredFeature,
}: {
  gameName: string;
  requiredFeature: string;
}) => {
  const subscriptionCheck = useSubscriptionRestriction({
    feature: requiredFeature,
  });

  const handleGamePress = () => {
    if (subscriptionCheck.handleFeatureAccess()) {
      // Start the game
      console.log(`Starting ${gameName}...`);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleGamePress}>
        <Text>{gameName}</Text>
        {!subscriptionCheck.canAccess && (
          <Text style={{color: 'red'}}>Premium Required</Text>
        )}
      </TouchableOpacity>

      <SubscriptionRestrictionModal
        visible={subscriptionCheck.showRestrictionModal}
        onClose={subscriptionCheck.closeRestrictionModal}
        onUpgrade={() => {
          subscriptionCheck.closeRestrictionModal();
          // Navigate to upgrade
        }}
        currentTier={subscriptionCheck.currentTier}
        requiredTier={subscriptionCheck.requiredTier}
        featureName={subscriptionCheck.featureName}
      />
    </View>
  );
};

export {
  BasicFeatureExample,
  AdvancedFeatureExample,
  ConditionalFeatureExample,
  GameWithRestrictions,
};
