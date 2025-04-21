import {profileUpdateFn} from '@/api/profile';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import {updateUser, VettingData} from '@/store/slices/appSlice';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {View} from 'react-native';
import AppButton from '../button/AppButton';
import DropdownComponent from '../dropdown/DropdownComponent';
import AppInput from '../input/AppInput';
import AppText from '../text/AppText';
import useToast from '@/hooks/helpers/useToast';

interface Inputs {
  relationshipStage: string;
  relationshipAge: string;
  relationshipDesire: string;
  relationshipLoveLanguage: string;
}

interface Props {
  handleStep: (value: number) => void;
  storeVettingData: (payload: Partial<VettingData>) => void;
  type?: 'auth' | 'inApp';
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
  {key: 'domestic_partnership', value: 'Domestic Partnership'}, // Legal but not married
  {key: 'civil_union', value: 'Civil Union'}, // Similar to marriage in some places
  {key: 'situationship', value: 'Situationship'}, // Modern undefined relationship
];

const loveLanguages = [
  {key: 'words_of_affirmation', value: 'Words of Affirmation'}, // Expressing love through verbal appreciation
  {key: 'acts_of_service', value: 'Acts of Service'}, // Showing love by doing helpful things
  {key: 'receiving_gifts', value: 'Receiving Gifts'}, // Feeling loved through thoughtful presents
  {key: 'quality_time', value: 'Quality Time'}, // Love is felt through undivided attention
  {key: 'physical_touch', value: 'Physical Touch'}, // Hugs, kisses, and other forms of touch
  {key: 'digital_affection', value: 'Digital Affection'}, // Expressing love via texts, calls, social media
  {key: 'deep_conversations', value: 'Deep Conversations'}, // Connecting emotionally through meaningful talks
  {key: 'shared_experiences', value: 'Shared Experiences'}, // Bonding through adventures and activities
];

const relationshipDesires = [
  {key: 'single', value: 'Not Looking for a Relationship'},
  {key: 'casual_dating', value: 'Casual Dating'},
  {key: 'serious_relationship', value: 'Looking for a Serious Relationship'},
  {key: 'friendship', value: 'Looking for Friendship'},
  {key: 'open_relationship', value: 'Open to an Open Relationship'},
  {key: 'long_distance', value: 'Open to Long-Distance'},
  {key: 'marriage', value: 'Seeking Marriage'},
  {key: 'situationship', value: 'Open to a Situationship'},
  {key: 'polyamory', value: 'Interested in Polyamory'},
  {key: 'companionship', value: 'Looking for Companionship'},
  {key: 'exploring', value: 'Exploring My Options'},
];

const StepThree = ({handleStep, storeVettingData, type = 'auth'}: Props) => {
  if (type === 'auth') {
    const {control, setValue, watch} = useForm<Inputs>();

    const [isDisabled, setIsDisabled] = useState(true);

    const relationshipStage = watch('relationshipStage');
    const relationshipAge = watch('relationshipAge');
    const relationshipDesire = watch('relationshipDesire');
    const relationshipLoveLanguage = watch('relationshipLoveLanguage');

    const updateVettingData = () => {
      storeVettingData({
        relationshipStage,
        relationshipDesire,
        relationshipDuration: relationshipAge,
        loveLanguage: relationshipLoveLanguage,
      });
    };

    useEffect(() => {
      // Check if all fields are filled
      const isFormValid =
        relationshipStage &&
        relationshipAge &&
        relationshipDesire &&
        relationshipLoveLanguage;

      setIsDisabled(!isFormValid);
    }, [
      relationshipStage,
      relationshipAge,
      relationshipDesire,
      relationshipLoveLanguage,
    ]);

    const handleValues = (key: keyof Inputs, value: string) => {
      setValue(key, value);
    };

    // Handles next step
    const handleNext = () => {
      if (!isDisabled) {
        // Updates Redux store
        updateVettingData();
        handleStep(3);
      }
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
          options={relationshipDesires}
          placeholder={'Relationship desire'}
          onSelect={(value: string) => {
            handleValues('relationshipDesire', value);
          }}
        />

        <View style={{height: sizeBlock.getHeightSize(20)}} />
        <DropdownComponent
          options={loveLanguages}
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
          disabled={isDisabled}
          onPress={() => {
            handleNext();
          }}
        />
      </>
    );
  }

  if (type === 'inApp') {
    const userData = useAppSelector(state => state.app.user?.userInfo);

    const {control, setValue, watch} = useForm<Inputs>({
      defaultValues: {
        relationshipAge: userData?.relationshipDuration,
        relationshipDesire: userData?.relationshipDesire,
        relationshipLoveLanguage: userData?.relationshipLoveLanguage,
        relationshipStage: userData?.relationshipStage,
      },
    });

    const watchedValues = useWatch({control});

    const handleValues = (key: keyof Inputs, value: string) => {
      setValue(key, value);
    };
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();

    const updateUserData = (payload: any) => {
      dispatch(updateUser(payload));
    };

    const {showToast} = useToast();

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

    const handleUpdate = () => {
      profileUpdateMutation.mutate(watchedValues);
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
          defaultOption={relationshipStages.find(
            rs => rs.value === userData?.relationshipStage,
          )}
        />

        <AppInput<Inputs>
          control={control}
          name="relationshipAge"
          placeholder="How old is your relationship?"
          animatedPlaceholder="How old is your relationship?"
          customStyle={{
            marginTop: sizeBlock.getHeightSize(20),
          }}
          inputProps={{
            defaultValue: userData?.relationshipDuration,
          }}
        />

        <View style={{height: sizeBlock.getHeightSize(10)}} />
        <DropdownComponent
          options={relationshipDesires}
          placeholder={'Relationship desire'}
          onSelect={(value: string) => {
            handleValues('relationshipDesire', value);
          }}
          defaultOption={relationshipDesires.find(
            rd => rd.value === userData?.relationshipDesire,
          )}
        />

        <View style={{height: sizeBlock.getHeightSize(20)}} />
        <DropdownComponent
          options={loveLanguages}
          placeholder={'Your love language'}
          onSelect={(value: string) => {
            handleValues('relationshipLoveLanguage', value);
          }}
          defaultOption={loveLanguages.find(
            ll => ll.value === userData?.loveLanguage,
          )}
        />

        <AppButton
          customViewStyle={{
            marginTop: '60%',
          }}
          title="Update"
          bgColor={appColors.green}
          loading={profileUpdateMutation.isPending}
          onPress={() => {
            handleUpdate();
          }}
        />
      </>
    );
  }
};

export default StepThree;
