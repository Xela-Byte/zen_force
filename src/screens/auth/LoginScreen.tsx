import {loginFn} from '@/api/auth/login';
import AppButton from '@/components/button/AppButton';
import AppPressable from '@/components/button/AppPressable';
import BackButton from '@/components/button/BackButton';
import AppInput from '@/components/input/AppInput';
import AppText from '@/components/text/AppText';
import {EMAIL_REGEX} from '@/hooks/helpers/Regex';
import useToast from '@/hooks/helpers/useToast';
import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {setUser, UserProfile} from '@/store/slices/appSlice';
import {loginStyle} from '@/styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {
  AuthStackParamList,
  LoginScreenProps,
} from '@/types/navigation/AuthNavigationType';
import {AppDispatch} from '@/store/index';

interface Inputs {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {control, handleSubmit, setValue, watch} = useForm<Inputs>();
  const {showToast} = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const canGoBack = navigation.canGoBack();

  const storeUser = (user: UserProfile) => {
    dispatch(setUser(user));
  };

  const navigateTo = <T extends keyof AuthStackParamList>(
    route: T,
    params?: AuthStackParamList[T], // params is optional and should match the screen's expected params
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: result => {
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      showToast({
        text1: `Welcome back to Zen Force!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });

      storeUser(result.data);
    },
    onError: (error: any) => {
      console.error('login error:', error);
      showToast({
        text1: 'Error logging in.',
        type: 'error',
        text2: error.message || 'Signup failed',
      });
    },
  });

  const cleanValue = (string: string = '') => {
    return string.toLowerCase().trim();
  };

  const onSubmit = async (data: Inputs) => {
    const updatedData = {
      email: cleanValue(data.email),
      password: data.password.trim(),
    };
    await loginMutation.mutateAsync(updatedData);
  };

  return (
    <ScrollView style={loginStyle.wrapper}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
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
          Welcome Back!
        </AppText>
        <AppText
          color={appColors.textGrey}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
          }}>
          We missed you, sign in to your account
        </AppText>

        <AppInput<Inputs>
          control={control}
          name="email"
          placeholder="Enter your email"
          animatedPlaceholder="Email"
          customStyle={{
            marginTop: sizeBlock.getHeightSize(50),
          }}
          rules={{
            required: 'Please enter an email',
            pattern: {value: EMAIL_REGEX, message: 'Invalid email format'},
          }}
          inputProps={{
            autoFocus: true,
            keyboardType: 'email-address',
            autoComplete: 'email',
          }}
        />

        <AppInput<Inputs>
          control={control}
          name="password"
          placeholder="Enter your password"
          animatedPlaceholder="Password"
          password
          rules={{
            required: 'Please enter a password',
          }}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
          }}
        />

        <AppPressable
          customViewStyle={{
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: sizeBlock.getHeightSize(5),
            marginBottom: sizeBlock.getHeightSize(25),
          }}
          onPress={() => {
            navigateTo('ForgotPasswordScreen');
          }}>
          <AppText color={appColors.textGrey} fontSize={fontSize.small - 1}>
            Forgot Password
          </AppText>
        </AppPressable>

        <AppButton
          title="Sign in"
          bgColor={appColors.green}
          onPress={handleSubmit(onSubmit)}
          loading={loginMutation.isPending}
        />

        <AppText
          color={appColors.textGrey}
          customStyle={{
            textAlign: 'center',
            marginVertical: sizeBlock.getHeightSize(25),
          }}>
          or sign in with
        </AppText>

        <AppButton
          buttonType="outlined"
          title="Sign in with Google"
          iconName="google"
          bgColor={appColors.green}
          onPress={() => {}}
          textColor={appColors.text}
          disabled
          customViewStyle={{
            marginBottom: sizeBlock.getHeightSize(10),
          }}
        />

        <AppButton
          buttonType="outlined"
          iconName="apple"
          textColor={appColors.text}
          title="Sign in with Apple"
          bgColor={appColors.green}
          disabled
          onPress={() => {}}
        />

        <AppPressable
          onPress={() => {
            navigateTo('RegisterScreen');
          }}>
          <AppText
            fontType="medium"
            customStyle={{
              textAlign: 'center',
              marginTop: sizeBlock.getHeightSize(20),
            }}>
            Don't have an account?{'  '}
            <AppText fontType="medium" color={appColors.green}>
              Sign up
            </AppText>
          </AppText>
        </AppPressable>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
