import {loginFn} from '@/api/auth/login';
import {googleAuthFn} from '@/api/google';
import AppButton from '@/components/button/AppButton';
import AppPressable from '@/components/button/AppPressable';
import BackButton from '@/components/button/BackButton';
import AppInput from '@/components/input/AppInput';
import AppText from '@/components/text/AppText';
import {EMAIL_REGEX} from '@/hooks/helpers/Regex';
import useToast from '@/hooks/helpers/useToast';
import {AppDispatch} from '@/store/index';
import {setUser, UserProfile} from '@/store/slices/appSlice';
import {loginStyle} from '@/styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {
  AuthStackParamList,
  LoginScreenProps,
} from '@/types/navigation/AuthNavigationType';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useMutation} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, View} from 'react-native';
import {useDispatch} from 'react-redux';

interface Inputs {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {control, handleSubmit, setValue, watch} = useForm<Inputs>();
  const {showToast} = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const canGoBack = navigation.canGoBack();

  //   client id for android : 640380190205-r733gdlkak5ag3qqalp1tn0t0jlmk7pa.apps.googleusercontent.com
  // [11/08, 7:57 pm] Khalid: 640380190205-puskkrjs4jdlemeuld1t32n3vgutc464.apps.googleusercontent.com

  // Configure Google Sign-In
  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId:
          '640380190205-puskkrjs4jdlemeuld1t32n3vgutc464.apps.googleusercontent.com', // required for getting the idToken on Android
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below
      });
      console.log('✅ Google Sign-In configuration successful');
    } catch (error) {
      console.error('❌ Google Sign-In configuration failed:', error);
    }
  }, []);

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

  const googleAuthMutation = useMutation({
    mutationFn: googleAuthFn,
    onSuccess: result => {
      console.log('====================================');
      console.log('Google auth result:', result);
      console.log('====================================');
      showToast({
        text1: `Welcome back to Zen Force!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });

      storeUser(result.data);
    },
    onError: (error: any) => {
      console.error('Google auth error:', error);
      showToast({
        text1: 'Error with Google authentication.',
        type: 'error',
        text2: error.message || 'Google authentication failed',
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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In user info:', userInfo);

      // Get the ID token
      const tokens = await GoogleSignin.getTokens();
      if (tokens.accessToken) {
        await googleAuthMutation.mutateAsync({
          idToken: tokens.accessToken,
          platform: 'mobile',
        });
      } else {
        throw new Error('No access token received from Google');
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showToast({
          text1: 'Sign in cancelled',
          type: 'info',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showToast({
          text1: 'Sign in already in progress',
          type: 'info',
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showToast({
          text1: 'Play services not available',
          type: 'error',
        });
      } else {
        showToast({
          text1: 'Google Sign-In failed',
          type: 'error',
          text2: error.message || 'Unknown error occurred',
        });
      }
    }
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
            onSubmitEditing: e => {
              cleanValue(e.nativeEvent.text);
            },
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
          inputProps={{
            autoComplete: 'password',
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
          onPress={signIn}
          textColor={appColors.text}
          loading={googleAuthMutation.isPending}
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
