import {View, Text} from 'react-native';
import React from 'react';
import {detailsStyle} from '@/styles/detailsStyle';
import AppPressable from '../button/AppPressable';
import PfpIcon from '@/assets/svgsComponents/PfpIcon';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
} from '@/styles/universalStyle';
import AppText from '../text/AppText';
import AppInput from '../input/AppInput';
import {useForm} from 'react-hook-form';
import DropdownComponent from '../dropdown/DropdownComponent';
import AppButton from '../button/AppButton';
import {VettingData} from '@/store/slices/appSlice';
import {profileRUpdateFn} from '@/api/profile';
import {useMutation} from '@tanstack/react-query';
import useToast from '@/hooks/helpers/useToast';
import {useAppSelector} from '@/hooks/helpers/useRedux';

interface Inputs {
  relationshipGoal: string;
}

interface Props {
  handleStep: (value: number) => void;
  storeVettingData: (payload: Partial<VettingData>) => void;
}

const relationshipGoals = [
  {key: 'casual_dating', value: 'Casual Dating'}, // No serious commitment
  {key: 'serious_relationship', value: 'Looking for a Serious Relationship'}, // Committed partnership
  {key: 'long_term', value: 'Looking for a Long-Term Relationship'}, // Stability & future planning
  {key: 'marriage', value: 'Seeking Marriage'}, // Wants to get married
  {key: 'companionship', value: 'Looking for Companionship'}, // Emotional connection without romance
  {key: 'friendship', value: 'Looking for Friendship'}, // Non-romantic bond
  {key: 'open_relationship', value: 'Open to an Open Relationship'}, // Ethical non-monogamy
  {key: 'polyamory', value: 'Interested in Polyamory'}, // Multiple relationships at once
  {key: 'exploring', value: 'Exploring My Options'}, // Unsure but open-minded
  {key: 'no_commitment', value: 'Not Looking for Commitment'}, // No strings attached
];

const StepFour = ({handleStep, storeVettingData}: Props) => {
  const {watch, setValue} = useForm<Inputs>();

  const handleValues = (key: keyof Inputs, value: string) => {
    setValue(key, value);
  };
  const vettingData = useAppSelector(state => state.app.vettingData);

  const goal = watch('relationshipGoal');

  const {showToast} = useToast();

  const profileRUpdateMutation = useMutation({
    mutationFn: profileRUpdateFn,
    onSuccess: result => {
      showToast({
        text1: `Profile updated!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });
      storeVettingData({relationshipGoal: goal});
      handleStep(4);
    },
    onError: (error: any) => {
      showToast({
        text1: 'Error updating profile.',
        type: 'error',
        text2: 'Profile update failed',
      });
    },
  });

  const handleNext = () => {
    profileRUpdateMutation.mutate({
      loveLanguage: vettingData?.loveLanguage ?? '',
      relationshipDesire: vettingData?.relationshipDesire ?? '',
      relationshipDuration: vettingData?.relationshipDuration ?? '',
      relationshipGoal: goal,
      relationshipStage: vettingData?.relationshipStage ?? '',
    });
  };

  return (
    <>
      <AppText fontSize={fontSize.medium} fontType="medium">
        What do you want to improve in your relationship?
      </AppText>

      <View style={{height: sizeBlock.getHeightSize(30)}} />

      <View style={{height: sizeBlock.getHeightSize(10)}} />
      <DropdownComponent
        options={relationshipGoals}
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
        disabled={!goal}
        loading={profileRUpdateMutation.isPending}
        onPress={() => {
          handleNext();
        }}
      />
    </>
  );
};

export default StepFour;
