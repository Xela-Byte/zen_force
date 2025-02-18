import {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import AppPressable from '../../components/button/AppPressable';
import HeaderComponent from '../../components/button/HeaderComponent';
import StepOne from '../../components/details/StepOne';
import StepTwo from '../../components/details/StepTwo';
import {detailsStyle} from '../../styles/detailsStyle';
import {DetailsScreenProps} from '../../types/navigation/AuthNavigationType';
import StepThree from '../../components/details/StepThree';
import StepFour from '../../components/details/StepFour';
import StepFive from '../../components/details/StepFive';
import AppText from '../../components/text/AppText';
import {appColors} from '../../styles/universalStyle';

interface Step {
  stepName: string;
  headerText: string;
  stepComponent: React.JSX.Element;
}

const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = (value: number) => {
    setCurrentStep(value);
  };

  const allSteps: Step[] = [
    {
      stepName: '1',
      headerText: 'Your details',
      stepComponent: <StepOne handleStep={handleStep} />,
    },
    {
      stepName: '2',
      headerText: 'Interests',
      stepComponent: <StepTwo handleStep={handleStep} />,
    },
    {
      stepName: '3',
      headerText: 'Relationship details',
      stepComponent: <StepThree handleStep={handleStep} />,
    },
    {
      stepName: '4',
      headerText: 'Relationship goals',
      stepComponent: <StepFour handleStep={handleStep} />,
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
