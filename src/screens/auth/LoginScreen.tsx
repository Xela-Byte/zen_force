import {loginFn} from '@/api/auth/login';
import {googleAuthFn} from '@/api/google';
import {appleAuthFn} from '@/api/apple';
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
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import appleAuth from '@invertase/react-native-apple-authentication';

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
          '989411520729-nbdmg5svp7vrok54c6ajdga4psa0ch6s.apps.googleusercontent.com', // required for getting the idToken on Android
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
      // console.log('====================================');
      // console.log(result.data);
      // console.log('====================================');
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

  const appleAuthMutation = useMutation({
    mutationFn: appleAuthFn,
    onSuccess: result => {
      console.log('====================================');
      console.log('Apple auth result:', result);
      console.log('====================================');
      showToast({
        text1: `Welcome back to Zen Force!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });
      storeUser(result.data);
    },
    onError: (error: any) => {
      console.error('Apple auth error:', error);
      showToast({
        text1: 'Error with Apple authentication.',
        type: 'error',
        text2: error.message || 'Apple authentication failed',
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
      console.log('🚀 Starting Google Sign-In process...');

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
        console.log('🔄 Sending token to backend...');
        await googleAuthMutation.mutateAsync({
          idToken: tokens.idToken,
        });
      } else {
        throw new Error('No ID token received from Google');
      }
    } catch (error: any) {
      console.error('❌ Google Sign-In error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('ℹ️ User cancelled sign in');
        showToast({
          text1: 'Sign in cancelled',
          type: 'info',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('ℹ️ Sign in already in progress');
        showToast({
          text1: 'Sign in already in progress',
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
        console.error('❌ Unknown Google Sign-In error:', {
          code: error.code,
          message: error.message,
          error: error,
        });
        showToast({
          text1: 'Google Sign-In failed',
          type: 'error',
          text2: error.message || 'Unknown error occurred',
        });
      }
    }
  };

  const appleSignIn = async () => {
    try {
      console.log('🍎 Starting Apple Sign-In process...');

      // Check if Apple Authentication is available
      if (!appleAuth.isSupported) {
        showToast({
          text1: 'Apple Sign-In not supported',
          type: 'error',
          text2: 'This device does not support Apple Sign-In',
        });
        return;
      }

      // Perform the request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('✅ Apple Sign-In response received:', {
        user: appleAuthRequestResponse.user,
        email: appleAuthRequestResponse.email,
        fullName: appleAuthRequestResponse.fullName,
        identityToken: appleAuthRequestResponse.identityToken
          ? 'Present'
          : 'Missing',
      });

      // Get the credential state
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log('✅ Apple credential authorized');

        if (appleAuthRequestResponse.identityToken) {
          console.log('🔄 Sending Apple token to backend...');

          await appleAuthMutation.mutateAsync({
            identityToken: appleAuthRequestResponse.identityToken,
            user: appleAuthRequestResponse.user,
            email: appleAuthRequestResponse.email,
            fullName: appleAuthRequestResponse.fullName,
          });
        } else {
          throw new Error('No identity token received from Apple');
        }
      } else {
        throw new Error('Apple credential not authorized');
      }
    } catch (error: any) {
      console.error('❌ Apple Sign-In error:', error);

      if (error.code === appleAuth.Error.CANCELED) {
        console.log('ℹ️ User cancelled Apple sign in');
        showToast({
          text1: 'Apple Sign-In cancelled',
          type: 'info',
        });
      } else if (error.code === appleAuth.Error.FAILED) {
        console.error('❌ Apple Sign-In failed');
        showToast({
          text1: 'Apple Sign-In failed',
          type: 'error',
          text2: 'Authentication request failed',
        });
      } else if (error.code === appleAuth.Error.INVALID_RESPONSE) {
        console.error('❌ Apple Sign-In invalid response');
        showToast({
          text1: 'Apple Sign-In failed',
          type: 'error',
          text2: 'Invalid response from Apple',
        });
      } else if (error.code === appleAuth.Error.NOT_HANDLED) {
        console.error('❌ Apple Sign-In not handled');
        showToast({
          text1: 'Apple Sign-In failed',
          type: 'error',
          text2: 'Request not handled',
        });
      } else if (error.code === appleAuth.Error.UNKNOWN) {
        console.error('❌ Unknown Apple Sign-In error');
        showToast({
          text1: 'Apple Sign-In failed',
          type: 'error',
          text2: 'Unknown error occurred',
        });
      } else {
        console.error('❌ Unknown Apple Sign-In error:', {
          code: error.code,
          message: error.message,
          error: error,
        });
        showToast({
          text1: 'Apple Sign-In failed',
          type: 'error',
          text2: error.message || 'Unknown error occurred',
        });
      }
    }
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

          {Platform.OS === 'android' && (
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
          )}

          {Platform.OS === 'ios' && (
            <AppButton
              buttonType="outlined"
              iconName="apple"
              textColor={appColors.text}
              title="Sign in with Apple"
              bgColor={appColors.green}
              onPress={appleSignIn}
              loading={appleAuthMutation.isPending}
              customViewStyle={{
                marginBottom: sizeBlock.getHeightSize(10),
              }}
            />
          )}
          {/*  */}
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
    </SafeAreaView>
  );
};

export default LoginScreen;
