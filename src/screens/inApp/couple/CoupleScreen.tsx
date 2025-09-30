import React, {useState} from 'react';
import {ScrollView, StatusBar, View, SafeAreaView} from 'react-native';
import GraphIcon from '@/assets/images/graph_icon.svg';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import AppText from '@/components/text/AppText';
import {coupleStyle} from '@/styles/coupleStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import AiGameIcon from '@/assets/images/aiGame_icon.png';
import AppImage from '@/components/image/AppImage';
import AppPressable from '@/components/button/AppPressable';
import {
  CoupleScreenProps,
  CoupleStackParamList,
} from '@/types/navigation/CoupleNavigationType';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {
  hasActiveSubscription,
  hasFeatureAccess,
  getRequiredTierForFeature,
} from '@/utils/subscriptionUtils';
import SubscriptionRestrictionModal from '@/components/subscription/SubscriptionRestrictionModal';

interface Game {
  title: string;
  description: string;
  screen?: keyof CoupleStackParamList;
}

export const coupleGames: Game[] = [
  {
    title: 'AI Counselor',
    description: '',
    screen: 'AICounselorScreen',
  },
  {
    title: 'Question Roulette',
    description: '5 Stages/Levels',
    screen: 'QuestionRouletteScreen',
  },
  {
    title: 'Couple Challenge',
    description: "Couple's Game",
    screen: 'CoupleChallengeScreen',
  },
  {
    title: 'Memory Lane',
    description: "Couple's Game",
    screen: 'MemoryLaneScreen',
  },
  {
    title: 'Progress Tracking',
    description: '',
    screen: 'ProgressTrackingScreen',
  },
];

// Define subscription requirements for each game
const gameSubscriptionRequirements: Record<string, string> = {
  AICounselorScreen: 'ai_coaching',
  QuestionRouletteScreen: 'questions',
  CoupleChallengeScreen: 'unlimited_questions',
  MemoryLaneScreen: 'unlimited_questions',
  ProgressTrackingScreen: 'analytics',
};

export const GamesComponent = ({
  navigateTo,
  slice = 0,
  onGamePress,
}: {
  navigateTo: any;
  slice?: number;
  onGamePress?: (game: Game) => void;
}) => (
  <View style={coupleStyle.coupleSectionTabWrapper}>
    {coupleGames.slice(slice).map((cog, index) => {
      return (
        <AppPressable
          key={index}
          onPress={() => {
            if (onGamePress) {
              onGamePress(cog);
            } else if (cog.screen) {
              navigateTo(cog.screen);
            }
          }}>
          <View style={coupleStyle.coupleSectionTab}>
            {index === 0 ? (
              <AppImage
                source={AiGameIcon}
                style={{
                  width: sizeBlock.getWidthSize(60),
                  height: sizeBlock.getWidthSize(60),
                }}
              />
            ) : (
              <GraphIcon />
            )}
            <View style={{width: '65%', rowGap: sizeBlock.getHeightSize(5)}}>
              <AppText fontType="medium" fontSize={fontSize.small + 1}>
                {cog.title}
              </AppText>
              {cog.description && (
                <AppText
                  fontSize={fontSize.small - 3}
                  color={appColors.textGrey}>
                  {cog.description}
                </AppText>
              )}
            </View>
            <ArrowLeft
              fill={appColors.green}
              style={{
                transform: [{rotate: '180deg'}, {scale: 1.3}],
                marginRight: sizeBlock.getWidthSize(10),
              }}
            />
          </View>
        </AppPressable>
      );
    })}
  </View>
);

const CoupleScreen = ({navigation}: CoupleScreenProps) => {
  const [restrictionModal, setRestrictionModal] = useState<{
    visible: boolean;
    currentTier: string;
    requiredTier: string;
    featureName: string;
  }>({
    visible: false,
    currentTier: 'basic',
    requiredTier: 'standard',
    featureName: '',
  });

  // Get user subscription data at component level
  const user = useAppSelector(state => state.app.user);
  const currentTier = user?.userInfo?.subscription?.tier || 'basic';
  const isSubscribed = user?.userInfo?.subscription?.isSubscribed || false;
  const status = user?.userInfo?.subscription?.status || 'inactive';
  const expired = user?.userInfo?.subscription?.expired || true;
  const expiryDate = user?.userInfo?.subscription?.expiryDate;

  const navigateTo = <T extends keyof CoupleStackParamList>(
    route: T,
    params?: CoupleStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const handleGamePress = (game: Game) => {
    if (!game.screen) return;

    const requiredFeature = gameSubscriptionRequirements[game.screen];
    if (!requiredFeature) {
      // No subscription required, navigate directly
      navigateTo(game.screen);
      return;
    }

    // Check subscription for this feature using utility functions
    const requiredTier = getRequiredTierForFeature(requiredFeature);
    const hasActiveSub = hasActiveSubscription(
      isSubscribed,
      status,
      expired,
      expiryDate,
    );
    const canAccess =
      hasFeatureAccess(currentTier, requiredTier) &&
      (requiredTier === 'basic' ? true : hasActiveSub);

    // Debug logging
    console.log('=== COUPLE SCREEN SUBSCRIPTION DEBUG ===');
    console.log('Game Screen:', game.screen);
    console.log('Feature:', requiredFeature);
    console.log('Current Tier:', currentTier);
    console.log('Required Tier:', requiredTier);
    console.log('Is Subscribed:', isSubscribed);
    console.log('Status:', status);
    console.log('Expired:', expired);
    console.log('Expiry Date:', expiryDate);
    console.log('Has Active Sub:', hasActiveSub);
    console.log(
      'Has Feature Access:',
      hasFeatureAccess(currentTier, requiredTier),
    );
    console.log('Can Access:', canAccess);
    console.log('========================================');

    if (canAccess) {
      navigateTo(game.screen);
    } else {
      setRestrictionModal({
        visible: true,
        currentTier,
        requiredTier,
        featureName: getFeatureDisplayName(requiredFeature),
      });
    }
  };

  const closeRestrictionModal = () => {
    setRestrictionModal(prev => ({...prev, visible: false}));
  };

  const handleUpgrade = () => {
    closeRestrictionModal();
    navigation.getParent()?.navigate('Profile', {screen: 'ChoosePlanScreen'});
  };

  return (
    <SafeAreaView style={coupleStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <ScrollView style={coupleStyle.wrapper}>
        <AppText
          customStyle={{
            textAlign: 'center',
            marginTop: sizeBlock.getHeightSize(30),
          }}
          fontType="semiBold"
          fontSize={fontSize.small + 5}
          color={appColors.white}>
          Couple
        </AppText>
        <View style={coupleStyle.container}>
          <GamesComponent
            navigateTo={navigateTo}
            onGamePress={handleGamePress}
          />
        </View>
      </ScrollView>

      <SubscriptionRestrictionModal
        visible={restrictionModal.visible}
        onClose={closeRestrictionModal}
        onUpgrade={handleUpgrade}
        currentTier={restrictionModal.currentTier as any}
        requiredTier={restrictionModal.requiredTier as any}
        featureName={restrictionModal.featureName}
      />
    </SafeAreaView>
  );
};

const getFeatureDisplayName = (feature: string): string => {
  const featureNames: Record<string, string> = {
    unlimited_questions: 'Unlimited Questions',
    analytics: 'Analytics & Progress Reports',
    romance_section: 'Romance & Intimacy Section',
    ai_coaching: 'AI-Powered Coaching',
    expert_sessions: 'Expert Q&A Sessions',
    priority_support: 'Priority Support',
    early_access: 'Early Access Features',
  };

  return featureNames[feature] || feature;
};

export default CoupleScreen;
