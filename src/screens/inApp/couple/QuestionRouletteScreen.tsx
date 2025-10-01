import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {questionRouletteStyle} from '@/styles/questionRouletteStyle';
import HeaderComponent from '@/components/button/HeaderComponent';
import {
  CoupleStackParamList,
  QuestionRouletteScreenProps,
} from '@/types/navigation/CoupleNavigationType';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  sizeBlock,
} from '@/styles/universalStyle';
import AppText from '@/components/text/AppText';
import CoupleImage from '@/assets/images/couple.jpg';
import AppImage from '@/components/image/AppImage';
import LinearGradient from 'react-native-linear-gradient';
import AppPressable from '@/components/button/AppPressable';
import {QuestionType} from '@/api/games';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {
  hasActiveSubscription,
  hasFeatureAccess,
  getRequiredTierForFeature,
} from '@/utils/subscriptionUtils';
import SubscriptionRestrictionModal from '@/components/subscription/SubscriptionRestrictionModal';

interface Stage {
  title: string;
  questions: number;
  status: string;
  questionType: QuestionType;
  imageSrc: any;
}

const stages: Stage[] = [
  {
    title: 'Single & Dating',
    questions: 12,
    status: 'Free',
    questionType: 'single-dating',
    imageSrc: require('@/assets/images/single-dating.png'),
  },
  {
    title: 'Couple (Non married)',
    questions: 12,
    status: 'Free',
    questionType: 'couple-unmarried',
    imageSrc: require('@/assets/images/couple-non-married.png'),
  },
  {
    title: 'Married Couples',
    questions: 12,
    status: 'Free',
    questionType: 'married-couples',
    imageSrc: require('@/assets/images/married-couples.png'),
  },
  {
    title: 'Newly wed',
    questions: 12,
    status: 'Free',
    questionType: 'newly-wed',
    imageSrc: require('@/assets/images/newly-wed.png'),
  },
  {
    title: 'Advance (Romance & Erotica)',
    questions: 12,
    status: 'Premium',
    questionType: 'advance-romance-erotica',
    imageSrc: require('@/assets/images/advanced.png'),
  },
];

const QuestionRouletteScreen = ({navigation}: QuestionRouletteScreenProps) => {
  const [restrictionModal, setRestrictionModal] = useState<{
    visible: boolean;
    currentTier: string;
    requiredTier: string;
    featureName: string;
  }>({
    visible: false,
    currentTier: 'basic',
    requiredTier: 'premium',
    featureName: '',
  });

  // Get user subscription data at component level
  const user = useAppSelector(state => state.app.user);
  const currentTier = user?.userInfo?.subscription?.tier || 'basic';
  const isSubscribed = user?.userInfo?.subscription?.isSubscribed || false;
  const status = user?.userInfo?.subscription?.status || 'inactive';
  const expired = user?.userInfo?.subscription?.expired || true;

  const navigateTo = <T extends keyof CoupleStackParamList>(
    route: T,
    params?: CoupleStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const handleStagePress = (stage: Stage) => {
    // Check if this is the premium romance section
    if (stage.questionType === 'advance-romance-erotica') {
      const requiredTier = getRequiredTierForFeature('romance_section');
      const hasActiveSub = hasActiveSubscription(isSubscribed, status, expired);
      const canAccess =
        hasFeatureAccess(currentTier, requiredTier) && hasActiveSub;

      if (canAccess) {
        navigateTo('QuestionRouletteDetailScreen', {
          stageType: stage.title,
          questionType: stage.questionType,
        });
      } else {
        setRestrictionModal({
          visible: true,
          currentTier,
          requiredTier,
          featureName: getFeatureDisplayName('romance_section'),
        });
      }
    } else {
      // Free stages, navigate directly
      navigateTo('QuestionRouletteDetailScreen', {
        stageType: stage.title,
        questionType: stage.questionType,
      });
    }
  };

  const closeRestrictionModal = () => {
    setRestrictionModal(prev => ({...prev, visible: false}));
  };

  const handleUpgrade = () => {
    closeRestrictionModal();
    navigation.navigate('Profile', {screen: 'ChoosePlanScreen'});
  };

  const StageButton = memo(({stg}: {stg: Stage}) => {
    const handlePress = useCallback(() => {
      handleStagePress(stg);
    }, [stg]);

    return (
      <AppPressable onPress={handlePress}>
        <View style={questionRouletteStyle.gameTab}>
          <AppImage
            source={stg.imageSrc}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: sizeBlock.getWidthSize(360),
              borderRadius: borderRadius.medium + 5,
            }}
            resizeMode="cover"
          />

          <View style={questionRouletteStyle.gameTabCard}>
            <AppText fontType="medium">{stg.title}</AppText>
            <AppText fontSize={fontSize.small - 3}>
              {stg.questions} Questions
            </AppText>
          </View>

          {/* Price tag */}

          <LinearGradient
            style={questionRouletteStyle.gameTabTag}
            colors={['#3BA700', '#6FCB03']}>
            <View style={{paddingHorizontal: sizeBlock.getWidthSize(10)}}>
              <AppText fontSize={fontSize.small} color={appColors.white}>
                {stg.status}
              </AppText>
            </View>
          </LinearGradient>
        </View>
      </AppPressable>
    );
  });

  return (
    <SafeAreaView style={questionRouletteStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <View style={questionRouletteStyle.wrapper}>
        <HeaderComponent
          title="Question Roulette"
          navigation={navigation}
          theme="light"
        />
        <View style={questionRouletteStyle.container}>
          <AppText fontSize={fontSize.small + 1} fontType="semiBold">
            Select Stage/Level
          </AppText>
          <View
            style={{
              height: screenHeight * 0.75,
            }}>
            <FlatList
              contentContainerStyle={{
                paddingVertical: sizeBlock.getHeightSize(15),
              }}
              data={stages}
              renderItem={({item}) => {
                return <StageButton stg={item} />;
              }}
            />
          </View>
        </View>
      </View>

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

export default QuestionRouletteScreen;
