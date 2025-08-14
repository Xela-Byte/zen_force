import BulletIcon from '@/assets/images/bullet.svg';
import AppButton from '@/components/button/AppButton';
import HeaderComponent from '@/components/button/HeaderComponent';
import {plans} from '@/components/profile/PlanSelection';
import AppText from '@/components/text/AppText';
import {choosePlanStyle} from '@/styles/choosePlanStyle';
import {
  appColors,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {ChoosePlanScreenProps} from '@/types/navigation/ProfileNavigationType';
import {useState, useEffect} from 'react';
import {Alert, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {useInitiateSubscriptionMutation} from '@/hooks/mutations/usePaymentMutation';
import useToast from '@/hooks/helpers/useToast';
import {useStripe} from '@stripe/stripe-react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/index';

const ChoosePlanScreen = ({navigation, route}: ChoosePlanScreenProps) => {
  const {params} = route;
  const {plan} = params;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingUpPayment, setIsSettingUpPayment] = useState(false);
  const [isPresentingPayment, setIsPresentingPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const {showToast} = useToast();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  // Get user email from store
  const userEmail = useSelector((state: RootState) => state.app.user?.email);

  const specificPlan = plans.find(item => {
    return item.title === plan.title;
  });

  if (!specificPlan) {
    navigation.goBack();
    return null;
  }

  // Use planType from the plan object
  const planType = specificPlan.planType;
  const isFreePlan = planType === 'free';

  // Payment mutation hook
  const initiateSubscriptionMutation = useInitiateSubscriptionMutation();

  // Setup payment sheet when client secret is available
  const setupPaymentSheet = async (paymentIntentClientSecret: string) => {
    try {
      setIsSettingUpPayment(true);
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Zen Force',
        paymentIntentClientSecret,
        defaultBillingDetails: {
          email: userEmail || 'customer@zenforce.com', // Use email from store or fallback
        },
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        showToast({
          text1: 'Payment Setup Failed',
          text2: error.message || 'Failed to setup payment',
          type: 'error',
        });
        return false;
      }
      return true;
    } catch (error: any) {
      console.error('Error in setupPaymentSheet:', error);
      showToast({
        text1: 'Payment Setup Failed',
        text2: error.message || 'Failed to setup payment',
        type: 'error',
      });
      return false;
    } finally {
      setIsSettingUpPayment(false);
    }
  };

  // Present payment sheet
  const handlePresentPaymentSheet = async () => {
    try {
      setIsPresentingPayment(true);
      const {error} = await presentPaymentSheet();

      if (error) {
        console.error('Payment failed:', error);
        showToast({
          text1: 'Payment Failed',
          text2: error.message || 'Payment was not completed',
          type: 'error',
        });
        return false;
      } else {
        // Payment successful
        showToast({
          text1: 'Payment Successful!',
          text2: 'Your subscription has been activated successfully.',
          type: 'success',
        });

        Alert.alert(
          'Payment Successful!',
          'Your subscription has been activated successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return true;
      }
    } catch (error: any) {
      console.error('Error in handlePresentPaymentSheet:', error);
      showToast({
        text1: 'Payment Failed',
        text2: error.message || 'Payment was not completed',
        type: 'error',
      });
      return false;
    } finally {
      setIsPresentingPayment(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    Alert.alert(
      'Payment Successful!',
      'Your subscription has been activated successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const handlePaymentError = (error: string) => {
    setShowPaymentModal(false);
    Alert.alert('Payment Failed', error);
  };

  const handleContinue = async () => {
    if (isFreePlan) {
      // For free plans, just show success message
      Alert.alert(
        'Plan Activated!',
        'Your free plan has been activated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      // Handle payment intent mutation
      try {
        setIsProcessing(true);
        const result = await initiateSubscriptionMutation.mutateAsync({
          planType: planType as 'basic' | 'premium',
        });

        // Handle successful payment intent creation
        console.log('Payment intent created:', result.clientSecret);

        // Setup payment sheet with the client secret from backend
        const setupSuccess = await setupPaymentSheet(result.clientSecret);

        if (setupSuccess) {
          // Present the payment sheet
          await handlePresentPaymentSheet();
        }
      } catch (error: any) {
        console.error('Payment intent creation failed:', error);
        showToast({
          text1: 'Payment Failed',
          text2: error.message || 'Failed to create payment intent',
          type: 'error',
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const getButtonTitle = () => {
    if (isFreePlan) {
      return 'Activate Free Plan';
    }

    if (isProcessing) {
      return 'Creating Payment...';
    }

    if (isSettingUpPayment) {
      return 'Setting Up Payment...';
    }

    if (isPresentingPayment) {
      return 'Processing Payment...';
    }

    return 'Continue to Payment';
  };

  const getButtonColor = () => {
    if (isFreePlan) {
      return appColors.grey;
    }
    return appColors.green;
  };

  return (
    <SafeAreaView style={choosePlanStyle.wrapper}>
      <StatusBar backgroundColor={appColors.white} barStyle={'dark-content'} />
      <HeaderComponent navigation={navigation} title="Choose your plan" />
      <ScrollView style={choosePlanStyle.container}>
        <View
          style={[
            choosePlanStyle.radioBtnContainer,
            {
              borderColor: appColors.green,
            },
          ]}>
          <AppText fontSize={fontSize.small - 3} color={appColors.border}>
            {specificPlan.title}
          </AppText>
          <AppText>{specificPlan.price}</AppText>
          <AppText fontSize={fontSize.small - 3}>
            {specificPlan.description}
          </AppText>
          <View style={choosePlanStyle.radioBtn} />

          <AppText
            fontType="medium"
            customStyle={{
              marginVertical: sizeBlock.getHeightSize(10),
            }}>
            Benefits
          </AppText>

          {specificPlan.benefits.map((text, index) => {
            return (
              <View
                key={index}
                style={[
                  universalStyle.verticalCentering,
                  {
                    gap: sizeBlock.getWidthSize(15),
                    width: '90%',
                  },
                ]}>
                <BulletIcon />
                <AppText>{text}</AppText>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={choosePlanStyle.container}>
        <AppButton
          customViewStyle={{
            position: 'relative',
          }}
          title={getButtonTitle()}
          bgColor={getButtonColor()}
          onPress={handleContinue}
          disabled={
            isProcessing ||
            isSettingUpPayment ||
            isPresentingPayment ||
            initiateSubscriptionMutation.isPending
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ChoosePlanScreen;
