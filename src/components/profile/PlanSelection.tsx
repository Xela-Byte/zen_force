import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import AppText from '../text/AppText';
import AppPressable from '../button/AppPressable';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../button/AppButton';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {useCancelSubscriptionMutation} from '@/hooks/mutations/useCancelSubscriptionMutation';

type Props = {
  showBottomTab: boolean;
  setShowBottomTab: (value: boolean) => void;
};

export const plans = [
  {
    title: 'BASIC',
    price: 'Free',
    description:
      'Profile creation + basic questionnaire with limited features.',
    benefits: [
      'Profile creation + basic questionnaire',
      'Limited number of questions/prompts',
      'Weekly "starter" challenges/games',
      'General relationship tips & articles',
    ],
    planType: 'basic' as const,
  },
  {
    title: 'STANDARD',
    price: '$9.99/month',
    description:
      'Everything in Basic plus unlimited personalized AI-driven questions.',
    benefits: [
      'Everything in Basic',
      'Unlimited personalized AI-driven questions',
      'Progress tracking & milestone tools',
      'Access to themed content packs (e.g. anniversary, holiday, long-distance)',
    ],
    planType: 'standard' as const,
  },
  {
    title: 'PREMIUM',
    price: '$19.99/month',
    description:
      'Everything in Standard plus advanced analytics and exclusive content.',
    benefits: [
      'Everything in Standard',
      'Advanced analytics & detailed progress reports',
      'Exclusive romance/erotica section',
      'Priority customer support',
    ],
    planType: 'premium' as const,
  },
  {
    title: 'ELITE',
    price: '$29.99/month',
    description:
      'Everything in Premium plus AI-powered coaching and expert sessions.',
    benefits: [
      'Everything in Premium',
      'AI-powered 1-on-1 relationship coaching',
      'Early access to new features/tools',
      'Monthly live Q&A sessions with relationship experts',
    ],
    planType: 'elite' as const,
  },
];

const PlanSelection = ({setShowBottomTab, showBottomTab}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const navigation = useNavigation<any>();

  // Get user subscription data
  const user = useAppSelector(state => state.app.user);
  const userTier = user?.userInfo?.subscription?.tier || 'basic';
  const isSubscribed = user?.userInfo?.subscription?.isSubscribed || false;

  // Cancel subscription mutation
  const cancelSubscriptionMutation = useCancelSubscriptionMutation();

  // Handle subscription state changes
  useEffect(() => {
    // If user is no longer subscribed and was previously subscribed, close the modal
    if (!isSubscribed && userTier === 'basic') {
      // Reset selected plan to basic if user is now on basic
      setSelectedPlan(plans[0]); // Basic plan is at index 0
    }
  }, [isSubscribed, userTier]);

  const navigateToPlans = () => {
    navigation.navigate('ChoosePlanScreen', {
      plan: selectedPlan,
    });
  };

  const handleDone = () => {
    bottomSheetRef.current?.close();
    setShowBottomTab(false);
    navigateToPlans();
  };

  useEffect(() => {
    if (showBottomTab) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomTab]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
        pressBehavior={'none'}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ['55%'], []);

  // Determine if selected plan is basic (free)
  const isFreePlan = selectedPlan.planType === 'basic';
  const isCurrentPlan = selectedPlan.planType === userTier;
  // Fix: Only show cancel option if user is on a paid tier (not basic) and selecting basic plan
  const isDowngrading = userTier !== 'basic' && isFreePlan;

  // Debug logging
  console.log('PlanSelection - User data:', {
    userTier,
    isSubscribed,
    subscription: user?.userInfo?.subscription,
    selectedPlan: selectedPlan.planType,
    isFreePlan,
    isCurrentPlan,
    isDowngrading,
  });

  // Get button title and color based on plan type and user status
  const getButtonTitle = () => {
    if (isCurrentPlan) {
      return 'Current Plan';
    }
    if (isDowngrading) {
      if (cancelSubscriptionMutation.isPending) {
        return 'Cancelling...';
      }
      return 'Cancel Subscription';
    }
    if (isFreePlan) {
      return 'Basic Plan Selected';
    }
    return 'Continue to Payment';
  };

  const getButtonColor = () => {
    if (isCurrentPlan) {
      return appColors.grey;
    }
    if (isDowngrading) {
      if (cancelSubscriptionMutation.isPending) {
        return appColors.grey; // Grey during loading
      }
      return '#FF4444'; // Red color for cancellation
    }
    if (isFreePlan) {
      return appColors.grey;
    }
    return appColors.green;
  };

  // Check if a plan should be disabled
  const isPlanDisabled = (plan: any) => {
    return plan.planType === userTier;
  };

  // Get plan display info
  const getPlanDisplayInfo = (plan: any) => {
    if (plan.planType === userTier) {
      return {
        title: plan.title,
        price: plan.price,
        description: 'Current Plan',
        isCurrent: true,
      };
    }
    if (isSubscribed && plan.planType === 'free') {
      return {
        title: plan.title,
        price: 'Cancel Subscription',
        description: 'Downgrade to free plan',
        isCancel: true,
      };
    }
    return {
      title: plan.title,
      price: plan.price,
      description: plan.description,
      isCurrent: false,
      isCancel: false,
    };
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            display: !showBottomTab ? 'none' : 'flex',
          },
        ]}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.sheetBackground}
          index={1}
          enablePanDownToClose
          onClose={() => {
            setShowBottomTab(false);
          }}
          handleIndicatorStyle={styles.handleIndicator}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.innerContent}>
              <AppText
                fontSize={fontSize.medium - 5}
                customStyle={{
                  marginBottom: sizeBlock.getHeightSize(10),
                }}
                fontType="medium">
                Choose Your Plan
              </AppText>

              <ScrollView
                contentContainerStyle={{
                  paddingVertical: sizeBlock.getHeightSize(10),
                }}>
                <View style={styles.radioBtnWrapper}>
                  {plans.map((plan, index) => {
                    const planInfo = getPlanDisplayInfo(plan);
                    const isDisabled = isPlanDisabled(plan);
                    const isSelected = selectedPlan.title === plan.title;

                    return (
                      <AppPressable
                        key={index}
                        customViewStyle={{width: '100%'}}
                        onPress={() => {
                          if (!isDisabled) {
                            setSelectedPlan(plan);
                          }
                        }}
                        disabled={isDisabled}>
                        <View
                          style={[
                            styles.radioBtnContainer,
                            {
                              borderColor: isSelected
                                ? appColors.green
                                : appColors.border,
                            },
                          ]}>
                          <AppText
                            fontSize={fontSize.small - 3}
                            color={
                              isDisabled ? appColors.textGrey : appColors.border
                            }>
                            {planInfo.title}
                          </AppText>
                          <AppText
                            color={
                              isDisabled ? appColors.textGrey : appColors.black
                            }>
                            {planInfo.price}
                          </AppText>
                          <AppText
                            fontSize={fontSize.small - 3}
                            color={
                              isDisabled ? appColors.textGrey : appColors.black
                            }>
                            {planInfo.description}
                          </AppText>
                          {isSelected && !isDisabled && (
                            <View style={styles.radioBtn} />
                          )}
                          {isDisabled && (
                            <View
                              style={[
                                styles.radioBtn,
                                {backgroundColor: appColors.grey},
                              ]}
                            />
                          )}
                        </View>
                      </AppPressable>
                    );
                  })}
                </View>
              </ScrollView>

              <AppButton
                bgColor={getButtonColor()}
                onPress={async () => {
                  if (isCurrentPlan) {
                    // Do nothing for current plan
                    return;
                  }
                  if (isDowngrading) {
                    // Handle subscription cancellation
                    try {
                      await cancelSubscriptionMutation.mutateAsync();
                      // Reset selected plan to basic
                      setSelectedPlan(plans[0]);
                      // Close the modal after successful cancellation
                      bottomSheetRef.current?.close();
                      setShowBottomTab(false);
                    } catch (error) {
                      // Error is handled by the mutation's onError callback
                      console.error('Cancellation failed:', error);
                    }
                    return;
                  }
                  if (!isFreePlan) {
                    handleDone();
                  }
                }}
                title={getButtonTitle()}
                disabled={isCurrentPlan || cancelSubscriptionMutation.isPending}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    zIndex: 9999,
  },
  radioBtnWrapper: {
    ...universalStyle.verticalCentering,
    flexDirection: 'column',
    rowGap: sizeBlock.getHeightSize(10),
  },
  radioBtnContainer: {
    width: '100%',
    borderWidth: 1,
    position: 'relative',
    padding: sizeBlock.getWidthSize(15),
    borderRadius: borderRadius.small,
    gap: sizeBlock.getHeightSize(5),
  },
  radioBtn: {
    width: sizeBlock.getWidthSize(20),
    height: sizeBlock.getWidthSize(20),
    borderRadius: borderRadius.full,
    borderWidth: 5,
    borderColor: appColors.green,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  sheetBackground: {
    backgroundColor: appColors.white,
  },
  handleIndicator: {
    backgroundColor: appColors.text,
  },
  contentContainer: {
    padding: 20,
    width: screenWidth,
  },
  innerContent: {
    height: '95%',
  },
  icon: {
    marginTop: sizeBlock.getHeightSize(10),
  },
  button: {
    width: screenWidth * 0.8,
    marginTop: sizeBlock.getHeightSize(20),
  },
});
export default PlanSelection;
