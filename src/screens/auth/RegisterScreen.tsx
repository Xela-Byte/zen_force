import {useMutation} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';

import {registerFn} from '@/api/auth/register';
import {googleSignupFn} from '@/api/google';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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

  // Configure Google Sign-In
  useEffect(() => {
    // Only configure Google Sign-In on Android devices
    if (Platform.OS === 'android') {
      try {
        GoogleSignin.configure({
          webClientId:
            '989411520729-nbdmg5svp7vrok54c6ajdga4psa0ch6s.apps.googleusercontent.com', // required for getting the idToken on Android
          offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          hostedDomain: '', // specifies a hosted domain restriction
          forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below
        });

        GoogleSignin.signOut();
        console.log('✅ Google Sign-In configuration successful');
      } catch (error) {
        console.error('❌ Google Sign-In configuration failed:', error);
      }
    } else {
      console.log('ℹ️ Google Sign-In configuration skipped on iOS');
    }
  }, []);

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

  const googleSignupMutation = useMutation({
    mutationFn: googleSignupFn,
    onSuccess: result => {
      console.log('====================================');
      console.log('Google signup result:', result);
      console.log('====================================');
      showToast({
        text1: `Welcome to Zen Force!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });

      storeTempUser(result.data);
      navigateTo('AccountSetupScreen');
    },
    onError: (error: any) => {
      console.error('Google signup error:', error);
      showToast({
        text1: 'Error with Google sign up.',
        type: 'error',
        text2: error.message || 'Google sign up failed',
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

  const signUpWithGoogle = async () => {
    // Only allow Google Sign-Up on Android devices
    if (Platform.OS !== 'android') {
      showToast({
        text1: 'Google Sign-Up not available',
        text2: 'Google Sign-Up is only available on Android',
        type: 'info',
      });
      return;
    }

    try {
      console.log('🚀 Starting Google Sign-Up process...');

      // Check if Google Play Services is available
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      console.log('✅ Google Play Services available');

      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();
      console.log(
        '✅ Google Sign-In user info:',
        JSON.stringify(userInfo, null, 2),
      );

      // Get the tokens
      const tokens = await GoogleSignin.getTokens();
      console.log('✅ Tokens received:', {
        idToken: tokens.idToken ? 'Present' : 'Missing',
        accessToken: tokens.accessToken ? 'Present' : 'Missing',
      });

      if (tokens.idToken) {
        console.log('🔄 Sending token to backend for signup...');
        await googleSignupMutation.mutateAsync({
          idToken: tokens.idToken,
        });
      } else {
        throw new Error('No ID token received from Google');
      }
    } catch (error: any) {
      console.error('❌ Google Sign-Up error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('ℹ️ User cancelled sign up');
        showToast({
          text1: 'Sign up cancelled',
          type: 'info',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('ℹ️ Sign up already in progress');
        showToast({
          text1: 'Sign up already in progress',
          type: 'info',
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('❌ Play services not available');
        showToast({
          text1: 'Google Play Services not available',
          type: 'error',
          text2: 'Please update Google Play Services',
        });
      } else {
        console.error('❌ Unknown Google Sign-Up error:', {
          code: error.code,
          message: error.message,
          error: error,
        });
        showToast({
          text1: 'Google Sign-Up failed',
          type: 'error',
          text2: error.message || 'Unknown error occurred',
        });
      }
    }
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

          {Platform.OS === 'android' && (
            <AppButton
              buttonType="outlined"
              title="Sign up with Google"
              iconName="google"
              bgColor={appColors.green}
              onPress={signUpWithGoogle}
              loading={googleSignupMutation.isPending}
              textColor={appColors.text}
              customViewStyle={{marginBottom: sizeBlock.getHeightSize(10)}}
            />
          )}

          {Platform.OS === 'ios' && (
            <AppButton
              buttonType="outlined"
              iconName="apple"
              textColor={appColors.text}
              title="Sign up with Apple"
              bgColor={appColors.green}
              disabled
              onPress={() => {
                showToast({
                  text1: 'Coming Soon',
                  text2: 'Apple Sign-Up will be available soon',
                  type: 'info',
                });
              }}
              customViewStyle={{marginBottom: sizeBlock.getHeightSize(10)}}
            />
          )}

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
