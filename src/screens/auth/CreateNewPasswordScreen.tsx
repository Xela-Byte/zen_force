import {changePasswordFn} from '@/api/auth/password';
import AppButton from '@/components/button/AppButton';
import BackButton from '@/components/button/BackButton';
import AppInput from '@/components/input/AppInput';
import PopupComponent from '@/components/popup/PopupComponent';
import AppText from '@/components/text/AppText';
import {PASSWORD_REGEX} from '@/hooks/helpers/Regex';
import useToast from '@/hooks/helpers/useToast';
import {loginStyle} from '@/styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {
  AuthStackParamList,
  CreateNewPasswordScreenProps,
} from '@/types/navigation/AuthNavigationType';
import {useMutation} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {ScrollView, StatusBar, View, SafeAreaView} from 'react-native';

interface Inputs {
  password: string;
  confirmPassword: string;
}

const CreateNewPasswordScreen = ({
  navigation,
}: CreateNewPasswordScreenProps) => {
  const {control, handleSubmit, watch} = useForm<Inputs>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  });

  // 🟢 Watch all form values to check if all fields are filled
  const watchedValues = useWatch({control});

  const isValidSubmit = useMemo(() => {
    return Object.entries(watchedValues).every(([_, value]) => {
      return Boolean(value); // Check other fields
    });
  }, [watchedValues]);

  const navigateTo = (route: keyof AuthStackParamList) => {
    // @ts-ignore
    navigation.navigate(route);
  };

  const [showPopup, setShowPopup] = useState(false);

  const {showToast} = useToast();

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordFn,
    onSuccess: result => {
      setShowPopup(true);
    },
    onError: (error: any) => {
      showToast({
        text1: 'Error changing password.',
        type: 'error',
        text2: 'Password change failed',
      });
    },
  });

  async function onSubmit(payload: Inputs) {
    await changePasswordMutation.mutateAsync(payload);
  }
  return (
    <>
      {showPopup && (
        <PopupComponent
          content="You have successfully updated your password."
          onDone={() => {
            setShowPopup(false);
            navigation.goBack();
          }}
          title="Great Job"
        />
      )}
      <SafeAreaView style={loginStyle.wrapper}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <ScrollView style={loginStyle.wrapper}>
          <BackButton navigation={navigation} />
          <View style={loginStyle.container}>
            <AppText fontSize={fontSize.medium} fontType="medium">
              Create New Password
            </AppText>
            <AppText
              color={appColors.textGrey}
              customStyle={{
                marginTop: sizeBlock.getHeightSize(10),
                marginBottom: sizeBlock.getHeightSize(20),
              }}>
              Fantastic! Let’s get you a new password.
            </AppText>

            <AppInput<Inputs>
              control={control}
              name="password"
              placeholder="Enter your password"
              animatedPlaceholder="Password"
              password
              rules={{
                required: 'Please enter a password',
                pattern: {
                  value: PASSWORD_REGEX,
                  message:
                    'Password must contain at least one uppercase, one lowercase, one numeric, and one special character.',
                },
              }}
              customStyle={{marginTop: sizeBlock.getHeightSize(10)}}
              inputProps={{
                autoComplete: 'new-password',
              }}
            />

            {/* Confirm Password Input */}
            <AppInput<Inputs>
              control={control}
              name="confirmPassword"
              placeholder="Confirm your password"
              animatedPlaceholder="Confirm Password"
              password
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watch('password') || 'Passwords do not match',
              }}
              customStyle={{marginTop: sizeBlock.getHeightSize(10)}}
              inputProps={{
                autoComplete: 'new-password',
              }}
            />
            <View
              style={{
                marginVertical: sizeBlock.getHeightSize(10),
              }}
            />

            <AppButton
              title="Create New Password"
              bgColor={appColors.green}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValidSubmit}
              loading={changePasswordMutation.isPending}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreateNewPasswordScreen;
