import React, {useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  appColors,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import HeaderComponent from '@/components/button/HeaderComponent';
import AppText from '@/components/text/AppText';
import AppButton from '@/components/button/AppButton';
import StripePaymentExample from '@/components/payment/StripePaymentExample';

const StripeTestScreen = ({navigation}: any) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1000); // $10.00 in cents
  const [selectedPlanType, setSelectedPlanType] = useState<
    'basic' | 'premium' | null
  >(null);
  const [paymentMode, setPaymentMode] = useState<'plan' | 'custom'>('plan');

  const testAmounts = [
    {label: '$1.00', value: 100},
    {label: '$5.00', value: 500},
    {label: '$10.00', value: 1000},
    {label: '$25.00', value: 2500},
    {label: '$50.00', value: 5000},
  ];

  const planTypes = [
    {label: 'Basic Plan ($9.99)', value: 'basic' as const},
    {label: 'Premium Plan ($19.99)', value: 'premium' as const},
  ];

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    const amount =
      paymentMode === 'plan'
        ? selectedPlanType === 'basic'
          ? 9.99
          : 19.99
        : selectedAmount / 100;

    Alert.alert(
      'Payment Successful!',
      `Payment of $${amount.toFixed(2)} was processed successfully.`,
      [
        {
          text: 'OK',
          onPress: () => console.log('Payment success acknowledged'),
        },
      ],
    );
  };

  const handlePaymentError = (error: string) => {
    setShowPaymentModal(false);
    Alert.alert('Payment Failed', error);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setPaymentMode('custom');
    setSelectedPlanType(null);
  };

  const handlePlanSelect = (planType: 'basic' | 'premium') => {
    setSelectedPlanType(planType);
    setPaymentMode('plan');
  };

  const handleTestPayment = () => {
    if (paymentMode === 'plan' && !selectedPlanType) {
      Alert.alert('Error', 'Please select a plan first');
      return;
    }
    setShowPaymentModal(true);
  };

  const getSelectedDisplay = () => {
    if (paymentMode === 'plan' && selectedPlanType) {
      return selectedPlanType === 'basic'
        ? 'Basic Plan ($9.99)'
        : 'Premium Plan ($19.99)';
    }
    return `Custom Amount ($${(selectedAmount / 100).toFixed(2)})`;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor={appColors.white} barStyle={'dark-content'} />
      <HeaderComponent navigation={navigation} title="Stripe Payment Test" />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <AppText
            fontSize={fontSize.medium}
            fontType="medium"
            customStyle={styles.title}>
            Test Stripe Payment Integration
          </AppText>

          <AppText fontSize={fontSize.small} customStyle={styles.description}>
            This screen demonstrates the complete Stripe React Native
            integration with PaymentSheet, Apple Pay, Google Pay, and custom
            card forms.
          </AppText>

          {/* Plan Selection Section */}
          <View style={styles.section}>
            <AppText
              fontSize={fontSize.small}
              fontType="medium"
              customStyle={styles.sectionTitle}>
              Select Subscription Plan:
            </AppText>

            <View style={styles.planGrid}>
              {planTypes.map((plan, index) => (
                <AppButton
                  key={index}
                  title={plan.label}
                  bgColor={
                    selectedPlanType === plan.value && paymentMode === 'plan'
                      ? appColors.green
                      : appColors.grey
                  }
                  onPress={() => handlePlanSelect(plan.value)}
                  customViewStyle={styles.planButton}
                />
              ))}
            </View>
          </View>

          {/* Custom Amount Section */}
          <View style={styles.section}>
            <AppText
              fontSize={fontSize.small}
              fontType="medium"
              customStyle={styles.sectionTitle}>
              Or Select Custom Amount:
            </AppText>

            <View style={styles.amountGrid}>
              {testAmounts.map((amount, index) => (
                <AppButton
                  key={index}
                  title={amount.label}
                  bgColor={
                    selectedAmount === amount.value && paymentMode === 'custom'
                      ? appColors.green
                      : appColors.grey
                  }
                  onPress={() => handleAmountSelect(amount.value)}
                  customViewStyle={styles.amountButton}
                />
              ))}
            </View>
          </View>

          {/* Selected Option Display */}
          <View style={styles.selectedContainer}>
            <AppText
              fontSize={fontSize.small}
              customStyle={styles.selectedLabel}>
              Selected:
            </AppText>
            <AppText
              fontSize={fontSize.medium}
              fontType="medium"
              color={appColors.green}
              customStyle={styles.selectedValue}>
              {getSelectedDisplay()}
            </AppText>
          </View>

          <View style={styles.featuresSection}>
            <AppText
              fontSize={fontSize.small}
              fontType="medium"
              customStyle={styles.sectionTitle}>
              Available Payment Methods:
            </AppText>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <AppText fontSize={fontSize.small - 2}>
                  • PaymentSheet (Recommended)
                </AppText>
              </View>
              <View style={styles.featureItem}>
                <AppText fontSize={fontSize.small - 2}>
                  • Apple Pay (iOS only)
                </AppText>
              </View>
              <View style={styles.featureItem}>
                <AppText fontSize={fontSize.small - 2}>
                  • Google Pay (Android only)
                </AppText>
              </View>
              <View style={styles.featureItem}>
                <AppText fontSize={fontSize.small - 2}>
                  • Custom Card Form
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.testInfo}>
            <AppText
              fontSize={fontSize.small - 2}
              color={appColors.textGrey}
              customStyle={styles.infoText}>
              Use test card number: 4242 4242 4242 4242
            </AppText>
            <AppText
              fontSize={fontSize.small - 2}
              color={appColors.textGrey}
              customStyle={styles.infoText}>
              Any future expiry date and any 3-digit CVC
            </AppText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title="Test Payment"
          bgColor={appColors.green}
          onPress={handleTestPayment}
          customViewStyle={styles.testButton}
        />
      </View>

      {showPaymentModal && (
        <StripePaymentExample
          planType={paymentMode === 'plan' ? selectedPlanType : undefined}
          amount={paymentMode === 'custom' ? selectedAmount : undefined}
          currency="usd"
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: sizeBlock.getWidthSize(20),
  },
  title: {
    textAlign: 'center',
    marginBottom: sizeBlock.getHeightSize(20),
  },
  description: {
    textAlign: 'center',
    marginBottom: sizeBlock.getHeightSize(30),
    color: appColors.textGrey,
    lineHeight: 20,
  },
  section: {
    marginBottom: sizeBlock.getHeightSize(30),
  },
  sectionTitle: {
    marginBottom: sizeBlock.getHeightSize(15),
    textAlign: 'center',
  },
  planGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: sizeBlock.getHeightSize(20),
  },
  planButton: {
    width: '48%',
    marginBottom: sizeBlock.getHeightSize(10),
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: sizeBlock.getHeightSize(20),
  },
  amountButton: {
    width: '48%',
    marginBottom: sizeBlock.getHeightSize(10),
  },
  selectedContainer: {
    ...universalStyle.centering,
    padding: sizeBlock.getWidthSize(15),
    backgroundColor: appColors.lightGreen,
    borderRadius: 8,
    marginBottom: sizeBlock.getHeightSize(30),
  },
  selectedLabel: {
    marginRight: sizeBlock.getWidthSize(10),
  },
  selectedValue: {
    fontSize: fontSize.medium,
  },
  featuresSection: {
    marginBottom: sizeBlock.getHeightSize(30),
  },
  featureList: {
    backgroundColor: appColors.gray,
    padding: sizeBlock.getWidthSize(15),
    borderRadius: 8,
  },
  featureItem: {
    marginBottom: sizeBlock.getHeightSize(5),
  },
  testInfo: {
    backgroundColor: appColors.lightCyan,
    padding: sizeBlock.getWidthSize(15),
    borderRadius: 8,
    marginBottom: sizeBlock.getHeightSize(20),
  },
  infoText: {
    textAlign: 'center',
    marginBottom: sizeBlock.getHeightSize(5),
  },
  footer: {
    padding: sizeBlock.getWidthSize(20),
    backgroundColor: appColors.white,
  },
  testButton: {
    width: '100%',
  },
});

export default StripeTestScreen;
