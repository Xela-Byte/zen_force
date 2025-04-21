import {useMutation} from '@tanstack/react-query';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {View} from 'react-native';
import {profileInfoUpdateFn, profileUpdateFn} from '@/api/profile';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import useToast from '@/hooks/helpers/useToast';
import {
  AppUser,
  setTempUser,
  updateUser,
  VettingData,
} from '@/store/slices/appSlice';
import {appColors, sizeBlock} from '@/styles/universalStyle';
import AppButton from '../button/AppButton';
import DropdownComponent from '../dropdown/DropdownComponent';
import AppInput from '../input/AppInput';
import UploadPPButton from './UploadPPButton';

interface Inputs {
  fullName: string;
  age: string;
  gender: string;
  personalityInsight: string;
}

interface Props {
  handleStep: (value: number) => void;
  storeVettingData: (payload: Partial<VettingData>) => void;
  type?: 'auth' | 'inApp';
}

const genderOptions = [
  {key: 'Male', value: 'Male'},
  {key: 'Female', value: 'Female'},
];

const personalityOptions = [
  {key: 'introverted', value: 'Introverted'},
  {key: 'extroverted', value: 'Extroverted'},
  {key: 'ambivert', value: 'Ambivert'},
  {key: 'analytical', value: 'Analytical'},
  {key: 'creative', value: 'Creative'},
  {key: 'empathetic', value: 'Empathetic'},
  {key: 'optimistic', value: 'Optimistic'},
  {key: 'realistic', value: 'Realistic'},
  {key: 'adventurous', value: 'Adventurous'},
  {key: 'methodical', value: 'Methodical'},
];

const StepOne = ({handleStep, storeVettingData, type = 'auth'}: Props) => {
  if (type === 'auth') {
    const {control, setValue, watch} = useForm<Inputs>();

    const vettingData = useAppSelector(state => state.app.vettingData);

    useEffect(() => {
      setValue('age', vettingData?.age?.toString() ?? '');
      setValue('fullName', vettingData?.fullName ?? '');
      setValue('gender', vettingData?.gender ?? '');
      setValue('personalityInsight', vettingData?.personalityInsight ?? '');
    }, []);

    // Local state to track if the button should be disabled
    const [isDisabled, setIsDisabled] = useState(true);

    // Watches for form field values
    const fullName = watch('fullName');
    const age = watch('age');
    const gender = watch('gender');
    const personalityInsight = watch('personalityInsight');

    const updateVettingData = () => {
      storeVettingData({
        fullName,
        age: Number(age),
        gender: gender.toLowerCase(),
        personalityInsight,
      });
    };

    useEffect(() => {
      // Check if all fields are filled
      const isFormValid = fullName && age && gender && personalityInsight;
      setIsDisabled(!isFormValid);
    }, [fullName, age, gender, personalityInsight]);

    // Handles dropdown selection
    const handleValues = (key: keyof Inputs, value: string) => {
      setValue(key, value);
    };

    const {showToast} = useToast();

    const dispatch = useAppDispatch();

    const storeTempUser = (user: AppUser) => {
      dispatch(setTempUser(user));
    };

    const profileInfoUpdateMutation = useMutation({
      mutationFn: profileInfoUpdateFn,
      onSuccess: result => {
        storeTempUser(result);
        showToast({
          text1: `Profile updated!`,
          text2: `Let's go 🚀`,
          type: 'success',
        });
        updateVettingData();
        handleStep(1);
      },
      onError: (error: any) => {
        showToast({
          text1: 'Error updating profile.',
          type: 'error',
          text2: 'Profile update failed',
        });
      },
    });

    // Handles next step
    const handleNext = () => {
      if (!isDisabled) {
        profileInfoUpdateMutation.mutate({
          age: Number(age),
          fullName,
          gender,
          personalityInsight,
        });
      }
    };

    return (
      <>
        <UploadPPButton storeVettingData={storeVettingData} />

        <AppInput<Inputs>
          control={control}
          name="fullName"
          placeholder="Enter your name"
          animatedPlaceholder="Full name"
          customStyle={{marginTop: sizeBlock.getHeightSize(20)}}
        />

        <AppInput<Inputs>
          control={control}
          name="age"
          placeholder="Enter your age"
          animatedPlaceholder="Age"
          customStyle={{marginTop: sizeBlock.getHeightSize(10)}}
          inputProps={{
            keyboardType: 'number-pad',
          }}
        />

        <View style={{height: sizeBlock.getHeightSize(10)}} />
        <DropdownComponent
          options={genderOptions}
          placeholder="Select a gender"
          onSelect={(value: string) => handleValues('gender', value)}
        />

        <View style={{height: sizeBlock.getHeightSize(20)}} />
        <DropdownComponent
          options={personalityOptions}
          placeholder="Select a personality insight"
          onSelect={(value: string) =>
            handleValues('personalityInsight', value)
          }
        />

        <AppButton
          customViewStyle={{marginTop: '60%'}}
          title="Next"
          bgColor={appColors.green}
          onPress={handleNext}
          loading={profileInfoUpdateMutation.isPending}
          disabled={isDisabled} // Disable button if form is not valid
        />
      </>
    );
  }

  if (type === 'inApp') {
    const userData = useAppSelector(state => state.app.user?.userInfo);

    const {control, setValue} = useForm<Inputs>({
      defaultValues: {
        age: String(userData?.age),
        fullName: userData?.fullName,
        gender: userData?.gender,
        personalityInsight: userData?.personalityInsight,
      },
    });

    const watchedValues = useWatch({control});

    // Handles dropdown selection
    const handleValues = (key: keyof Inputs, value: string) => {
      setValue(key, value);
    };

    const {showToast} = useToast();

    const dispatch = useAppDispatch();

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
      },
      onError: (error: any) => {
        showToast({
          text1: 'Error updating profile.',
          type: 'error',
          text2: 'Profile update failed',
        });
      },
    });

    // Handles next step
    const handleUpdate = () => {
      profileUpdateMutation.mutate({
        ...watchedValues,
        age: Number(watchedValues.age),
      });
    };

    return (
      <>
        <UploadPPButton storeVettingData={storeVettingData} />

        <AppInput<Inputs>
          control={control}
          name="fullName"
          placeholder="Enter your name"
          animatedPlaceholder="Full name"
          customStyle={{marginTop: sizeBlock.getHeightSize(20)}}
        />

        <AppInput<Inputs>
          control={control}
          name="age"
          placeholder="Enter your age"
          animatedPlaceholder="Age"
          customStyle={{marginTop: sizeBlock.getHeightSize(10)}}
          inputProps={{
            keyboardType: 'number-pad',
            defaultValue: String(userData?.age),
          }}
        />

        <View style={{height: sizeBlock.getHeightSize(10)}} />

        <DropdownComponent
          options={genderOptions}
          placeholder="Select a gender"
          onSelect={(value: string) => handleValues('gender', value)}
          defaultOption={genderOptions.find(
            item => item.key === userData?.gender,
          )}
        />

        <View style={{height: sizeBlock.getHeightSize(20)}} />

        <DropdownComponent
          options={personalityOptions}
          placeholder="Select a personality insight"
          onSelect={(value: string) =>
            handleValues('personalityInsight', value)
          }
          defaultOption={personalityOptions.find(
            item => item.value === userData?.personalityInsight,
          )}
        />

        <AppButton
          customViewStyle={{marginTop: '60%'}}
          title="Update"
          bgColor={appColors.green}
          onPress={handleUpdate}
          loading={profileUpdateMutation.isPending}
        />
      </>
    );
  }
};

export default StepOne;
