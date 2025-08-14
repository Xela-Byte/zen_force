import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, View, SafeAreaView} from 'react-native';

import {registerFn} from '@/api/auth/register';
import AppButton from '@/components/button/AppButton';
import AppPressable from '@/components/button/AppPressable';
import BackButton from '@/components/button/BackButton';
import AppInput from '@/components/input/AppInput';
import AppText from '@/components/text/AppText';
import {EMAIL_REGEX, PASSWORD_REGEX} from '@/hooks/helpers/Regex';
import {useAppDispatch} from '@/hooks/helpers/useRedux';
import useToast from '@/hooks/helpers/useToast';
import {AppUser, resetVetting, setTempUser} from '@/store/slices/appSlice';
import {loginStyle} from '@/styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {
  AuthStackParamList,
  RegisterScreenProps,
} from '@/types/navigation/AuthNavigationType';

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const {showToast} = useToast();

  const canGoBack = navigation.canGoBack();

  const dispatch = useAppDispatch();

  const storeTempUser = (user: AppUser) => {
    dispatch(setTempUser(user));
    dispatch(resetVetting());
  };

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: result => {
      showToast({
        text1: `Welcome to Zen Force!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });

      storeTempUser(result.data);
      navigateTo('AccountSetupScreen');
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
      showToast({
        text1: `Error signing up`,
        text2: error.message || 'Signup failed',
        type: 'error',
      });
    },
  });

  const navigateTo = (route: keyof AuthStackParamList) => {
    // @ts-ignore
    navigation.navigate(route);
  };

  const cleanValue = (string: string = '') => {
    return string.toLowerCase().trim();
  };

  const onSubmit = async (data: Inputs) => {
    if (data.password !== data.confirmPassword) {
      showToast({
        text1: `Error signing up`,
        text2: 'Passwords do not match.',
        type: 'error',
      });
      return;
    }

    await registerMutation.mutateAsync({
      email: cleanValue(data.email),
      password: data.password.trim(),
    });
  };

  return (
    <SafeAreaView style={loginStyle.wrapper}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView style={loginStyle.wrapper}>
        {canGoBack ? (
          <BackButton navigation={navigation} />
        ) : (
          <View
            style={{
              height: sizeBlock.getWidthSize(45),
            }}
          />
        )}
        <View style={loginStyle.container}>
          <AppText fontSize={fontSize.medium} fontType="medium">
            Create Account
          </AppText>
          <AppText
            color={appColors.textGrey}
            customStyle={{marginTop: sizeBlock.getHeightSize(10)}}>
            Sign up to get started
          </AppText>

          {/* Email Input */}
          <AppInput<Inputs>
            control={control}
            name="email"
            placeholder="Enter your email"
            animatedPlaceholder="Email"
            rules={{
              setValueAs: (value: any) => value.trim().toLowerCase(),
              required: 'Please enter an email',
              pattern: {value: EMAIL_REGEX, message: 'Invalid email format'},
            }}
            customStyle={{marginTop: sizeBlock.getHeightSize(50)}}
            inputProps={{
              autoComplete: 'email',
              keyboardType: 'email-address',
              textContentType: 'emailAddress',
            }}
          />

          {/* Password Input */}
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

          <View style={{marginVertical: sizeBlock.getHeightSize(10)}} />

          {/* Signup Button */}
          <AppButton
            title="Sign up"
            bgColor={appColors.green}
            onPress={handleSubmit(onSubmit)}
            loading={registerMutation.isPending}
          />

          {/* Other Sign-up Methods */}
          <AppText
            color={appColors.textGrey}
            customStyle={{
              textAlign: 'center',
              marginVertical: sizeBlock.getHeightSize(25),
            }}>
            or sign up with
          </AppText>

          <AppButton
            buttonType="outlined"
            title="Sign up with Google"
            iconName="google"
            disabled
            bgColor={appColors.green}
            onPress={() => {
              navigateTo('GoogleAuthScreen');
            }}
            textColor={appColors.text}
            customViewStyle={{marginBottom: sizeBlock.getHeightSize(10)}}
          />

          <AppButton
            buttonType="outlined"
            iconName="apple"
            textColor={appColors.text}
            title="Sign up with Apple"
            bgColor={appColors.green}
            disabled
            onPress={() => {}}
          />

          {/* Already Have an Account? */}
          <AppPressable onPress={() => navigateTo('LoginScreen')}>
            <AppText
              fontType="medium"
              customStyle={{
                textAlign: 'center',
                marginTop: sizeBlock.getHeightSize(20),
              }}>
              Already have an account?{'  '}
              <AppText fontType="medium" color={appColors.green}>
                Login
              </AppText>
            </AppText>
          </AppPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
