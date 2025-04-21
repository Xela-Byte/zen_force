import {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import AppPressable from '@/components/button/AppPressable';
import HeaderComponent from '@/components/button/HeaderComponent';
import StepFive from '@/components/details/StepFive';
import StepFour from '@/components/details/StepFour';
import StepOne from '@/components/details/StepOne';
import StepThree from '@/components/details/StepThree';
import StepTwo from '@/components/details/StepTwo';
import AppText from '@/components/text/AppText';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import {
  setCurrentVettingStep,
  setVettingData,
  VettingData,
} from '@/store/slices/appSlice';
import {detailsStyle} from '@/styles/detailsStyle';
import {appColors} from '@/styles/universalStyle';
import {DetailsScreenProps} from '@/types/navigation/AuthNavigationType';

interface Step {
  stepName: string;
  headerText: string;
  stepComponent: React.JSX.Element;
}

const DetailsScreen = ({navigation}: DetailsScreenProps) => {
  const currentStep =
    useAppSelector(state => state.app.currentVettingStep) ?? 0;

  const dispatch = useAppDispatch();

  const setCurrentStep = (step: number) => {
    dispatch(setCurrentVettingStep(step));
  };

  const handleStep = (value: number) => {
    setCurrentStep(value);
  };

  // Function to update Redux store with form values
  const storeVettingData = (payload: Partial<VettingData>) => {
    dispatch(setVettingData(payload));
  };

  const allSteps: Step[] = [
    {
      stepName: '1',
      headerText: 'Your details',
      stepComponent: (
        <StepOne
          type="inApp"
          handleStep={handleStep}
          storeVettingData={storeVettingData}
        />
      ),
    },
    {
      stepName: '2',
      headerText: 'Interests',
      stepComponent: (
        <StepTwo
          type="inApp"
          handleStep={handleStep}
          storeVettingData={storeVettingData}
        />
      ),
    },
    {
      stepName: '3',
      headerText: 'Relationship details',
      stepComponent: (
        <StepThree
          type="inApp"
          handleStep={handleStep}
          storeVettingData={storeVettingData}
        />
      ),
    },
    {
      stepName: '4',
      headerText: 'Relationship goals',
      stepComponent: (
        <StepFour
          type="inApp"
          handleStep={handleStep}
          storeVettingData={storeVettingData}
        />
      ),
    },
    {
      stepName: '5',
      headerText: 'Add Partner',
      stepComponent: <StepFive handleStep={handleStep} />,
    },
  ];

  const SkipButton = () => {
    return (
      <AppPressable
        onPress={() => {
          handleStep(5);
        }}>
        <AppText color={appColors.textGrey}>Skip</AppText>
      </AppPressable>
    );
  };

  useEffect(() => {
    if (currentStep === 5) {
      navigation.navigate('ProfileSummaryScreen');
    }
  }, [currentStep]);
  return (
    <>
      <ScrollView style={detailsStyle.wrapper}>
        <HeaderComponent
          title={allSteps[currentStep]?.headerText || ''}
          navigation={navigation}
          extraComponent={currentStep === 4 && <SkipButton />}
          onPress={() => {
            currentStep !== 0
              ? setCurrentStep(currentStep - 1)
              : navigation.goBack();
          }}
        />
        <View style={detailsStyle.container}>
          <View style={detailsStyle.slideWrapper}>
            {Array.from({length: 5}, (_, index) => {
              return (
                <AppPressable
                  key={index}
                  customViewStyle={
                    currentStep >= index
                      ? detailsStyle.activeSlideStyle
                      : detailsStyle.slideStyle
                  }
                  onPress={() => {
                    setCurrentStep(index);
                  }}
                />
              );
            })}
          </View>
          {allSteps[currentStep]?.stepComponent || null}
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
