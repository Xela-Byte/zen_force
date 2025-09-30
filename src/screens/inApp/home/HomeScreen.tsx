import Avatar from '@/assets/images/avatar.png';
import FemaleIcon from '@/assets/images/female.svg';
import MaleIcon from '@/assets/images/male.svg';
import OrbIcon from '@/assets/images/orb_icon.svg';
import PulseIcon from '@/assets/images/pulse.svg';
import PuzzleIcon from '@/assets/images/puzzle_icon.svg';
import SunIcon from '@/assets/images/sun_icon.svg';
import AppButton from '@/components/button/AppButton';
import AppPressable from '@/components/button/AppPressable';
import AppImage from '@/components/image/AppImage';
import SubscriptionRestrictionModal from '@/components/subscription/SubscriptionRestrictionModal';
import AppText from '@/components/text/AppText';
import useHexToRGBA from '@/hooks/helpers/useHexToRGBA';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {homeStyle} from '@/styles/homeStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {HomeScreenProps} from '@/types/navigation/HomeStackNavigationType';
import {
  getRequiredTierForFeature,
  hasActiveSubscription,
  hasFeatureAccess,
} from '@/utils/subscriptionUtils';
import React, {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import ProgressPie from 'react-native-progress/Pie';
import {GamesComponent} from '../couple/CoupleScreen';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const navigateTo = (route: any, screenName?: any) => {
    navigation.navigate(route, {screen: screenName});
  };

  const [progress, setProgress] = useState(0.65);
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

  const userData = useMemo(() => {
    return user?.userInfo;
  }, [user]);

  const handleGamePress = (game: any) => {
    if (!game.screen) return;

    // Define subscription requirements for games
    const gameSubscriptionRequirements: Record<string, string> = {
      AICounselorScreen: 'ai_coaching',
      QuestionRouletteScreen: 'questions',
      CoupleChallengeScreen: 'unlimited_questions',
      MemoryLaneScreen: 'unlimited_questions',
      ProgressTrackingScreen: 'analytics',
    };

    const requiredFeature = gameSubscriptionRequirements[game.screen];
    if (!requiredFeature) {
      // No subscription required, navigate directly
      navigateTo('Couple', game.screen);
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
    console.log('=== SUBSCRIPTION DEBUG ===');
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
    console.log('========================');

    if (canAccess) {
      navigateTo('Couple', game.screen);
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
    <SafeAreaView style={homeStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <ScrollView style={homeStyle.wrapper}>
        <View style={homeStyle.container}>
          {/* Header */}
          <View style={universalStyle.flexBetween}>
            <View
              style={{
                rowGap: sizeBlock.getHeightSize(5),
                width: '80%',
              }}>
              <View
                style={[
                  universalStyle.verticalCentering,
                  {
                    columnGap: sizeBlock.getWidthSize(10),
                  },
                ]}>
                <SunIcon />
                <AppText
                  fontType="medium"
                  fontSize={fontSize.small - 3}
                  color={appColors.lightPink}>
                  GOOD MORNING
                </AppText>
              </View>
              <AppText
                color={appColors.white}
                fontSize={fontSize.medium - 1}
                numLine={2}
                fontType="medium">
                {user?.userInfo?.fullName}
              </AppText>
            </View>

            <View style={homeStyle.avatar}>
              {!userData?.profileImage ? (
                <AppImage
                  source={Avatar}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: borderRadius.full,
                  }}
                  alt="Avatar"
                  resizeMode="cover"
                />
              ) : (
                <AppImage
                  source={{
                    uri: userData?.profileImage,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: borderRadius.full,
                  }}
                  alt="Avatar"
                  resizeMode="cover"
                />
              )}
            </View>
          </View>

          {/* Game */}
          <View style={[universalStyle.flexBetween, homeStyle.gameContainer]}>
            <View
              style={{
                rowGap: sizeBlock.getHeightSize(5),
              }}>
              <AppText
                fontType="medium"
                fontSize={fontSize.small - 1}
                color={useHexToRGBA(appColors.brown, 0.5)}>
                TOP GAME
              </AppText>

              <View
                style={[
                  universalStyle.verticalCentering,
                  {
                    columnGap: sizeBlock.getWidthSize(5),
                  },
                ]}>
                <PuzzleIcon />
                <AppText
                  color={appColors.brown}
                  fontSize={fontSize.small + 3}
                  fontType="medium">
                  Memory Lane
                </AppText>
              </View>
            </View>

            <View style={homeStyle.avatar}>
              <ProgressPie
                key={`${progress}`}
                progress={progress}
                color={'#FF8FA2'}
                unfilledColor={'#FFB3C0'}
                size={sizeBlock.getWidthSize(55)}
              />
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  ...universalStyle.centering,
                }}>
                <AppText
                  color={appColors.white}
                  fontSize={fontSize.small - 1}
                  fontType="medium">
                  {progress * 100}%
                </AppText>
              </View>
            </View>
          </View>

          {/* Add partner */}
          <View style={homeStyle.partnerCard}>
            <MaleIcon
              style={{
                position: 'absolute',
                top: sizeBlock.getHeightSize(15),
                left: sizeBlock.getWidthSize(15),
              }}
            />
            <FemaleIcon
              style={{
                position: 'absolute',
                bottom: sizeBlock.getHeightSize(15),
                right: sizeBlock.getWidthSize(15),
              }}
            />
            <PulseIcon
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: [{rotate: '180deg'}],
                zIndex: 10,
              }}
            />
            <PulseIcon
              style={{
                position: 'absolute',
                bottom: 0,
                zIndex: 10,
                left: 0,
              }}
            />
            <View
              style={{
                ...universalStyle.centering,
                flexDirection: 'column',
                rowGap: sizeBlock.getHeightSize(25),
                paddingHorizontal: sizeBlock.getWidthSize(35),
                paddingVertical: sizeBlock.getHeightSize(25),
              }}>
              <AppText
                color={appColors.white}
                fontSize={fontSize.small - 1}
                fontType="medium">
                YOUR PARTNER
              </AppText>
              <AppText
                fontSize={fontSize.small + 3}
                customStyle={{
                  textAlign: 'center',
                  marginTop: sizeBlock.getHeightSize(10),
                }}
                fontType="medium"
                color={appColors.white}>
                Take part in challenges with your partner
              </AppText>
              <AppButton
                icon={<OrbIcon />}
                iconPosition="left"
                bgColor={appColors.white}
                textColor={appColors.green}
                customViewStyle={{
                  width: 'auto',
                  borderRadius: borderRadius.full,
                }}
                onPress={() => {
                  !userData?.linkedPartner
                    ? navigateTo('AddPartnerScreen')
                    : navigateTo('ViewPartnerScreen');
                }}
                title={
                  !userData?.linkedPartner ? 'Add Partner' : 'View Partner'
                }
              />
            </View>
          </View>
        </View>
        {/* Couple */}
        <View style={homeStyle.coupleSection}>
          <View
            style={{
              ...universalStyle.flexBetween,
            }}>
            <AppText fontType="medium" fontSize={fontSize.medium - 5}>
              Couple
            </AppText>
            <AppPressable
              onPress={() => {
                navigateTo('Couple', 'CoupleScreen');
              }}>
              <AppText
                fontSize={fontSize.small - 1}
                fontType="medium"
                color={appColors.green}>
                See all
              </AppText>
            </AppPressable>
          </View>

          <GamesComponent
            slice={1}
            navigateTo={(screen: string) => {
              navigateTo('Couple', screen);
            }}
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

export default HomeScreen;
