import {View, Text} from 'react-native';
import React from 'react';
import {detailsStyle} from '../../styles/detailsStyle';
import AppPressable from '../button/AppPressable';
import PfpIcon from '../../assets/svgsComponents/PfpIcon';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
} from '../../styles/universalStyle';
import AppText from '../text/AppText';
import AppInput from '../input/AppInput';
import {useForm} from 'react-hook-form';
import DropdownComponent from '../dropdown/DropdownComponent';
import AppButton from '../button/AppButton';

interface Inputs {
  fullName: string;
  age: string;
  gender: string;
  personalityInsight: string;
}

interface Props {
  handleStep: (value: number) => void;
}

const genderOptions = [
  {
    key: 'male',
    value: 'male',
  },
  {
    key: 'female',
    value: 'female',
  },
];

const personalityOptions = [
  {
    key: 'introverted',
    value: 'Introverted',
  },
  {
    key: 'extroverted',
    value: 'Extroverted',
  },
  {
    key: 'ambivert',
    value: 'Ambivert', // A mix of introverted and extroverted
  },
  {
    key: 'analytical',
    value: 'Analytical', // Logical and detail-oriented
  },
  {
    key: 'creative',
    value: 'Creative', // Innovative and imaginative
  },
  {
    key: 'empathetic',
    value: 'Empathetic', // Sensitive to others' feelings
  },
  {
    key: 'optimistic',
    value: 'Optimistic', // Positive and hopeful
  },
  {
    key: 'realistic',
    value: 'Realistic', // Practical and grounded
  },
  {
    key: 'adventurous',
    value: 'Adventurous', // Love to explore new things
  },
  {
    key: 'methodical',
    value: 'Methodical', // Organized and systematic
  },
];

const StepOne = ({handleStep}: Props) => {
  const {control, setValue} = useForm<Inputs>();

  const handleValues = (key: keyof Inputs, value: string) => {
    setValue(key, value);
  };

  return (
    <>
      <View style={detailsStyle.uploadBtnWrapper}>
        <PfpIcon />
        <AppPressable
          customViewStyle={{
            borderColor: appColors.text,
            borderWidth: 2,
            paddingVertical: sizeBlock.getHeightSize(10),
            paddingHorizontal: sizeBlock.getWidthSize(20),
            borderRadius: borderRadius.medium,
          }}
          onPress={() => {}}>
          <AppText fontSize={fontSize.small - 1}>Upload</AppText>
        </AppPressable>
      </View>

      <AppInput<Inputs>
        control={control}
        name="fullName"
        placeholder="Enter your name"
        animatedPlaceholder="Full name"
        customStyle={{
          marginTop: sizeBlock.getHeightSize(20),
        }}
      />

      <AppInput<Inputs>
        control={control}
        name="age"
        placeholder="Enter your age"
        animatedPlaceholder="Age"
        customStyle={{
          marginTop: sizeBlock.getHeightSize(10),
        }}
      />

      <View style={{height: sizeBlock.getHeightSize(10)}} />
      <DropdownComponent
        options={genderOptions}
        placeholder="Select a gender"
        onSelect={(value: string) => {
          handleValues('gender', value);
        }}
      />

      <View style={{height: sizeBlock.getHeightSize(20)}} />
      <DropdownComponent
        options={personalityOptions}
        placeholder="Select a personality insight"
        onSelect={(value: string) => {
          handleValues('personalityInsight', value);
        }}
      />

      <AppButton
        customViewStyle={{
          marginTop: '70%',
        }}
        title="Next"
        bgColor={appColors.green}
        onPress={() => {
          handleStep(1);
        }}
      />
    </>
  );
};

export default StepOne;
