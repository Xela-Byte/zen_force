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
  relationshipStage: string;
  relationshipAge: string;
  relationshipDesire: string;
  relationshipLoveLanguage: string;
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

const StepThree = ({handleStep}: Props) => {
  const {control, setValue} = useForm<Inputs>();

  const handleValues = (key: keyof Inputs, value: string) => {
    setValue(key, value);
  };

  return (
    <>
      <AppText fontSize={fontSize.medium} fontType="medium">
        Tell us about your current relationship.
      </AppText>

      <View style={{height: sizeBlock.getHeightSize(30)}} />
      <DropdownComponent
        options={relationshipStages}
        placeholder={'Relationship level/stage'}
        onSelect={(value: string) => {
          handleValues('relationshipStage', value);
        }}
      />

      <AppInput<Inputs>
        control={control}
        name="relationshipAge"
        placeholder="How old is your relationship?"
        animatedPlaceholder="How old is your relationship?"
        customStyle={{
          marginTop: sizeBlock.getHeightSize(20),
        }}
      />

      <View style={{height: sizeBlock.getHeightSize(10)}} />
      <DropdownComponent
        options={relationshipStages}
        placeholder={'Relationship desire'}
        onSelect={(value: string) => {
          handleValues('relationshipDesire', value);
        }}
      />

      <View style={{height: sizeBlock.getHeightSize(20)}} />
      <DropdownComponent
        options={relationshipStages}
        placeholder={'Your love language'}
        onSelect={(value: string) => {
          handleValues('relationshipLoveLanguage', value);
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

export default StepThree;
