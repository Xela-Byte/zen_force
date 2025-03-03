import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView, StatusBar, View} from 'react-native';
import {registerFn} from '../../api/register';
import AppButton from '../../components/button/AppButton';
import AppPressable from '../../components/button/AppPressable';
import BackButton from '../../components/button/BackButton';
import AppInput from '../../components/input/AppInput';
import AppText from '../../components/text/AppText';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../hooks/Regex';
import {loginStyle} from '../../styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '../../styles/universalStyle';
import {
  AuthStackParamList,
  RegisterScreenProps,
} from '../../types/navigation/AuthNavigationType';
import {API_URL} from '../../api';
import useToast from '../../hooks/useToast';
import {useAppDispatch} from '../../hooks/useRedux';
import {AppDispatch} from '../../store';
import {AppUser, setUser} from '../../store/slices/appSlice';

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

  const dispatch = useAppDispatch();

  const storeUser = (user: AppUser) => {
    dispatch(setUser(user));
  };

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: result => {
      showToast({
        text1: `Welcome to Zen Force!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });
      storeUser(result.data);
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
      showToast({
        text1: `Error siging up`,
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
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    registerMutation.mutateAsync({
      email: cleanValue(data.email),
      password: data.password.trim(),
    });
  };

  return (
    <ScrollView style={loginStyle.wrapper}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <BackButton navigation={navigation} />
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
            required: 'Please enter an email',
            pattern: {value: EMAIL_REGEX, message: 'Invalid email format'},
          }}
          customStyle={{marginTop: sizeBlock.getHeightSize(50)}}
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
          bgColor={appColors.green}
          onPress={() => {}}
          textColor={appColors.text}
          customViewStyle={{marginBottom: sizeBlock.getHeightSize(10)}}
        />

        <AppButton
          buttonType="outlined"
          iconName="apple"
          textColor={appColors.text}
          title="Sign up with Apple"
          bgColor={appColors.green}
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
  );
};

export default RegisterScreen;
