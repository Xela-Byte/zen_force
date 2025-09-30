import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import AppButton from '@/components/button/AppButton';
import AppText from '@/components/text/AppText';
import {useInitiateSubscriptionMutation} from '@/hooks/mutations/usePaymentMutation';
import useToast from '@/hooks/helpers/useToast';
import {
  appColors,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';

interface PaymentExampleProps {
  planType: 'standard' | 'premium' | 'elite';
  onSuccess?: (clientSecret: string) => void;
  onError?: (error: string) => void;
}

const PaymentExample: React.FC<PaymentExampleProps> = ({
  planType,
  onSuccess,
  onError,
}) => {
  const {showToast} = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const initiateSubscriptionMutation = useInitiateSubscriptionMutation();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const result = await initiateSubscriptionMutation.mutateAsync({
        planType,
      });

      // Success - client secret received
      console.log('Payment intent created:', result.clientSecret);

      showToast({
        text1: 'Payment Intent Created',
        text2: 'Ready to process payment',
        type: 'success',
      });

      // Call success callback with client secret
      onSuccess?.(result.clientSecret);
    } catch (error: any) {
      console.error('Payment intent creation failed:', error);

      const errorMessage = error.message || 'Failed to create payment intent';

      showToast({
        text1: 'Payment Failed',
        text2: errorMessage,
        type: 'error',
      });

      // Call error callback
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const getPlanDetails = () => {
    switch (planType) {
      case 'standard':
        return {
          name: 'Standard Plan',
          price: '$9.99/month',
          description: 'Unlimited access to questionnaires and prompts',
        };
      case 'premium':
        return {
          name: 'Premium Plan',
          price: '$19.99/month',
          description: 'Full access to all features and priority support',
        };
      case 'elite':
        return {
          name: 'Elite Plan',
          price: '$29.99/month',
          description:
            'Premium features plus exclusive content and priority support',
        };
      default:
        return {
          name: 'Unknown Plan',
          price: '$0.00/month',
          description: 'Please select a valid plan',
        };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <View style={universalStyle.verticalCentering}>
      <View style={{marginBottom: sizeBlock.getHeightSize(20)}}>
        <AppText
          fontSize={fontSize.medium}
          fontType="medium"
          customStyle={{marginBottom: sizeBlock.getHeightSize(10)}}>
          {planDetails.name}
        </AppText>
        <AppText
          fontSize={fontSize.small}
          color={appColors.textGrey}
          customStyle={{marginBottom: sizeBlock.getHeightSize(5)}}>
          {planDetails.price}
        </AppText>
        <AppText fontSize={fontSize.small - 2} color={appColors.textGrey}>
          {planDetails.description}
        </AppText>
      </View>

      <AppButton
        title={
          isProcessing || initiateSubscriptionMutation.isPending
            ? 'Creating Payment Intent...'
            : 'Continue to Payment'
        }
        bgColor={appColors.green}
        onPress={handlePayment}
        disabled={isProcessing || initiateSubscriptionMutation.isPending}
        customViewStyle={{
          width: '100%',
        }}
      />

      {(isProcessing || initiateSubscriptionMutation.isPending) && (
        <AppText
          fontSize={fontSize.small - 2}
          color={appColors.textGrey}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
            textAlign: 'center',
          }}>
          Please wait while we prepare your payment...
        </AppText>
      )}
    </View>
  );
};

export default PaymentExample;
