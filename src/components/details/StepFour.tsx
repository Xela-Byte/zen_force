import {profileRUpdateFn, profileUpdateFn} from '@/api/profile';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import useToast from '@/hooks/helpers/useToast';
import {updateUser, VettingData} from '@/store/slices/appSlice';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import AppButton from '../button/AppButton';
import DropdownComponent from '../dropdown/DropdownComponent';
import AppText from '../text/AppText';

interface Inputs {
  relationshipGoal: string;
}

interface Props {
  handleStep: (value: number) => void;
  storeVettingData: (payload: Partial<VettingData>) => void;
  type?: 'auth' | 'inApp';
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

const StepFour = ({handleStep, storeVettingData, type = 'auth'}: Props) => {
  if (type === 'auth') {
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
  }

  if (type === 'inApp') {
    const userData = useAppSelector(state => state.app.user?.userInfo);

    const {watch, setValue} = useForm<Inputs>({
      defaultValues: {
        relationshipGoal: userData?.relationshipGoal,
      },
    });

    const handleValues = (key: keyof Inputs, value: string) => {
      setValue(key, value);
    };

    const goal = watch('relationshipGoal');

    const {showToast} = useToast();

    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();

    const updateUserData = (payload: any) => {
      dispatch(updateUser(payload));
    };

    const profileUpdateMutation = useMutation({
      mutationFn: profileUpdateFn,
      onSuccess: result => {
        updateUserData(result.data);
        showToast({
          text1: `Profile updated!`,
          text2: `Let's go 🚀`,
          type: 'success',
        });
        navigation.goBack();
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
      profileUpdateMutation.mutate({relationshipGoal: goal});
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
          defaultOption={relationshipGoals.find(
            rg => rg.value === userData?.relationshipGoal,
          )}
        />

        <AppButton
          customViewStyle={{
            marginTop: '60%',
          }}
          title="Update"
          bgColor={appColors.green}
          disabled={!goal}
          loading={profileUpdateMutation.isPending}
          onPress={() => {
            handleNext();
          }}
        />
      </>
    );
  }
};

export default StepFour;
