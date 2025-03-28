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

type Props = {
  showBottomTab: boolean;
  setShowBottomTab: (value: boolean) => void;
};

export const plans = [
  {
    title: 'FREE PLAN',
    price: '$0.00/month',
    description: 'Limited access to questionnaires and prompts.',
    benefits: [
      'Access to basic questionnaires',
      'Limited prompts per day',
      'Community support',
    ],
  },
  {
    title: 'PRO PLAN',
    price: '$9.99/month',
    description:
      'Unlimited access to questionnaires, prompts, and exclusive insights.',
    benefits: [
      'Unlimited questionnaires & prompts',
      'Access to exclusive insights',
      'Priority customer support',
      'Ad-free experience',
    ],
  },
  {
    title: 'PREMIUM PLAN',
    price: '$19.99/month',
    description:
      'Full access to all features, priority support, and early access to new tools.',
    benefits: [
      'Everything in Pro Plan',
      'Personalized recommendations',
      'Early access to new features',
      '1-on-1 expert consultations',
    ],
  },
];

const PlanSelection = ({setShowBottomTab, showBottomTab}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const navigation = useNavigation<any>();

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
                  {plans.map((plan, index) => (
                    <AppPressable
                      key={index}
                      customViewStyle={{width: '100%'}}
                      onPress={() => {
                        setSelectedPlan(plan);
                      }}>
                      <View
                        style={[
                          styles.radioBtnContainer,
                          {
                            borderColor:
                              selectedPlan.title === plan.title
                                ? appColors.green
                                : appColors.border,
                          },
                        ]}>
                        <AppText
                          fontSize={fontSize.small - 3}
                          color={appColors.border}>
                          {plan.title}
                        </AppText>
                        <AppText>{plan.price}</AppText>
                        <AppText fontSize={fontSize.small - 3}>
                          {plan.description}
                        </AppText>
                        {selectedPlan.title === plan.title && (
                          <View style={styles.radioBtn} />
                        )}
                      </View>
                    </AppPressable>
                  ))}
                </View>
              </ScrollView>

              <AppButton
                bgColor={appColors.green}
                onPress={() => {
                  handleDone();
                }}
                title="Continue to payment"
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
