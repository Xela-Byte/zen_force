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
  relationshipGoal: string;
}

interface Props {
  handleStep: (value: number) => void;
}

const relationshipStages = [
  {key: 'single', value: 'Single'},
  {key: 'dating', value: 'Dating'},
  {key: 'in_relationship', value: 'In a Relationship'},
  {key: 'engaged', value: 'Engaged'},
  {key: 'married', value: 'Married'},
  {key: 'complicated', value: 'It’s Complicated'},
  {key: 'open_relationship', value: 'Open Relationship'},
  {key: 'separated', value: 'Separated'},
  {key: 'divorced', value: 'Divorced'},
  {key: 'widowed', value: 'Widowed'},
];

const StepFour = ({handleStep}: Props) => {
  const {control, setValue} = useForm<Inputs>();

  const handleValues = (key: keyof Inputs, value: string) => {
    setValue(key, value);
  };

  return (
    <>
      <AppText fontSize={fontSize.medium} fontType="medium">
        What do you want to improve in your relationship?
      </AppText>

      <View style={{height: sizeBlock.getHeightSize(30)}} />

      <View style={{height: sizeBlock.getHeightSize(10)}} />
      <DropdownComponent
        options={relationshipStages}
        placeholder={'What’s your relationship goal?'}
        onSelect={(value: string) => {
          handleValues('relationshipGoal', value);
        }}
      />

      <AppButton
        customViewStyle={{
          marginTop: '60%',
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

export default StepFour;
