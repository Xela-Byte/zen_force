import {profileInterestUpdateFn, profileUpdateFn} from '@/api/profile';
import {
  ArtIcon,
  CookingIcon,
  DrinkingIcon,
  FitnessIcon,
  GameIcon,
  MicIcon,
  MusicIcon,
  PaintIcon,
  PhotographyIcon,
  RunningIcon,
  ShoppingIcon,
  SightIcon,
  SwimmingIcon,
  TravelIcon,
} from '@/assets/interestIcons';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import useToast from '@/hooks/helpers/useToast';
import {updateUser, VettingData} from '@/store/slices/appSlice';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {useMutation} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import AppButton from '../button/AppButton';
import AppPressable from '../button/AppPressable';
import AppText from '../text/AppText';
import {useNavigation} from '@react-navigation/native';

interface Props {
  handleStep: (value: number) => void;
  storeVettingData: (payload: Partial<VettingData>) => void;
  type?: 'auth' | 'inApp';
}

interface Option {
  label: string;
  value: string;
  icon: React.FC<SvgProps>;
}

export const personalityInterests: Option[] = [
  {label: 'Photography', value: 'photography', icon: PhotographyIcon},
  {label: 'Video Games', value: 'video_games', icon: GameIcon},
  {label: 'Cooking', value: 'cooking', icon: CookingIcon},
  {label: 'Fitness', value: 'fitness', icon: FitnessIcon},
  {label: 'Music', value: 'music', icon: MusicIcon},
  {label: 'Travelling', value: 'travelling', icon: TravelIcon},
  {label: 'Extreme Sports', value: 'extreme_sports', icon: RunningIcon},
  {label: 'Speeches', value: 'speeches', icon: MicIcon},
  {label: 'Shopping', value: 'shopping', icon: ShoppingIcon},
  {label: 'Swimming', value: 'swimming', icon: SwimmingIcon},
  {label: 'Art', value: 'art', icon: ArtIcon},
  {label: 'Drinking', value: 'drinking', icon: DrinkingIcon},
  {label: 'Art & Crafts', value: 'art_and_crafts', icon: PaintIcon},
  {label: 'Astrology', value: 'astrology', icon: SightIcon},
];

// A0-53-4E-F9

const StepTwo = ({handleStep, storeVettingData, type = 'auth'}: Props) => {
  if (type === 'auth') {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const isSelected = (item: Option) => {
      return !!selectedOptions.find(opt => opt.value === item.value);
    };

    const handleOptions = (value: Option) => {
      setSelectedOptions(prev => {
        if (prev.find(opt => opt.value === value.value)) {
          return prev.filter(opt => opt.value !== value.value);
        } else {
          return [...prev, value];
        }
      });
    };

    const {showToast} = useToast();

    const labels = selectedOptions.map(option => option.label);

    const profileInterestUpdateMutation = useMutation({
      mutationFn: profileInterestUpdateFn,
      onSuccess: result => {
        showToast({
          text1: `Profile updated!`,
          text2: `Let's go 🚀`,
          type: 'success',
        });
        storeVettingData({interest: labels});
        handleStep(2);
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
      profileInterestUpdateMutation.mutate({interest: labels});
    };

    return (
      <>
        <AppText fontSize={fontSize.medium} fontType="medium">
          Pick your interests...
        </AppText>

        <View
          style={{
            ...universalStyle.flexWrap,
            paddingVertical: sizeBlock.getHeightSize(30),
            gap: sizeBlock.getWidthSize(10),
          }}>
          {personalityInterests.map(interest => {
            return (
              <AppPressable
                key={interest.value}
                onPress={() => {
                  handleOptions(interest);
                }}>
                <View
                  style={{
                    ...universalStyle.verticalCentering,
                    paddingVertical: sizeBlock.getHeightSize(10),
                    paddingHorizontal: sizeBlock.getWidthSize(15),
                    borderWidth: 1,
                    borderRadius: borderRadius.full,
                    columnGap: sizeBlock.getWidthSize(10),
                    borderColor: isSelected(interest)
                      ? appColors.green
                      : appColors.border,
                  }}>
                  <interest.icon />

                  <AppText
                    color={
                      isSelected(interest) ? appColors.green : appColors.text
                    }>
                    {interest.label}
                  </AppText>
                </View>
              </AppPressable>
            );
          })}
        </View>

        <AppButton
          customViewStyle={{
            marginTop: '10%',
          }}
          title="Next"
          bgColor={appColors.green}
          disabled={selectedOptions.length === 0}
          loading={profileInterestUpdateMutation.isPending}
          onPress={() => {
            handleNext();
          }}
        />
      </>
    );
  }
  if (type === 'inApp') {
    const userData = useAppSelector(state => state.app.user?.userInfo);

    const selectedInterests = useMemo(() => {
      if (!userData?.interests) return [];
      if (userData?.interests.length === 0) return [];

      let filteredInterests = personalityInterests.filter(({label}) =>
        userData?.interests.some((term: string) =>
          label.toLowerCase().includes(term.toLowerCase()),
        ),
      );

      return filteredInterests || [];
    }, [userData?.interests]);

    const [selectedOptions, setSelectedOptions] =
      useState<Option[]>(selectedInterests);

    const isSelected = (item: Option) => {
      return !!selectedOptions.find(opt => opt.value === item.value);
    };

    const handleOptions = (value: Option) => {
      setSelectedOptions(prev => {
        if (prev.find(opt => opt.value === value.value)) {
          return prev.filter(opt => opt.value !== value.value);
        } else {
          return [...prev, value];
        }
      });
    };

    const {showToast} = useToast();

    const labels = selectedOptions.map(option => option.label);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();

    const updateUserData = (payload: any) => {
      dispatch(updateUser(payload));
    };

    const profileUpdateMutation = useMutation({
      mutationFn: profileUpdateFn,
      onSuccess: result => {
        console.log(result.data);

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
      profileUpdateMutation.mutate({interests: labels});
    };

    return (
      <>
        <AppText fontSize={fontSize.medium} fontType="medium">
          Pick your interests...
        </AppText>

        <View
          style={{
            ...universalStyle.flexWrap,
            paddingVertical: sizeBlock.getHeightSize(30),
            gap: sizeBlock.getWidthSize(10),
          }}>
          {personalityInterests.map(interest => {
            return (
              <AppPressable
                key={interest.value}
                onPress={() => {
                  handleOptions(interest);
                }}>
                <View
                  style={{
                    ...universalStyle.verticalCentering,
                    paddingVertical: sizeBlock.getHeightSize(10),
                    paddingHorizontal: sizeBlock.getWidthSize(15),
                    borderWidth: 1,
                    borderRadius: borderRadius.full,
                    columnGap: sizeBlock.getWidthSize(10),
                    borderColor: isSelected(interest)
                      ? appColors.green
                      : appColors.border,
                  }}>
                  <interest.icon />

                  <AppText
                    color={
                      isSelected(interest) ? appColors.green : appColors.text
                    }>
                    {interest.label}
                  </AppText>
                </View>
              </AppPressable>
            );
          })}
        </View>

        <AppButton
          customViewStyle={{
            marginTop: '10%',
          }}
          title="Update"
          bgColor={appColors.green}
          disabled={selectedOptions.length === 0}
          loading={profileUpdateMutation.isPending}
          onPress={() => {
            handleUpdate();
          }}
        />
      </>
    );
  }
};

export default StepTwo;
