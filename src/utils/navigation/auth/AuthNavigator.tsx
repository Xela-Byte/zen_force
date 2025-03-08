import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AccountSetupScreen from '../../../screens/auth/AccountSetupScreen';
import CreateNewPasswordScreen from '../../../screens/auth/CreateNewPasswordScreen';
import DetailsScreen from '../../../screens/auth/DetailsScreen';
import ForgotPasswordScreen from '../../../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../../../screens/auth/LoginScreen';
import OnboardingScreen from '../../../screens/auth/OnboardingScreen';
import ProfileSummaryScreen from '../../../screens/auth/ProfileSummaryScreen';
import RegisterScreen from '../../../screens/auth/RegisterScreen';
import {RootState} from '../../../store';
import {AuthStackParamList} from '../../../types/navigation/AuthNavigationType';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../hooks/helpers/useRedux';
import {useEffect, useMemo} from 'react';
import {
  setCurrentVettingStep,
  useCurrentStep,
} from '../../../store/slices/appSlice';
import GoogleAuthScreen from '../../../screens/auth/GoogleAuthScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  const isNewInstall = useAppSelector(
    (state: RootState) => state.app.isNewInstall,
  );
  const isLoggedIn = useAppSelector((state: RootState) => state.app.isLoggedIn);
  const user = useAppSelector((state: RootState) => state.app.user);
  const tempUser = useAppSelector(state => state.app.tempUser);
  const vettingData = useAppSelector(state => state.app.vettingData);

  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const entitledRoute = (): keyof AuthStackParamList => {
    if (isNewInstall) {
      return 'OnboardingScreen'; // First-time users go to onboarding
    }
    if (!user) {
      return 'RegisterScreen';
    }
    if (!isLoggedIn) {
      return 'LoginScreen'; // If not logged in, send to login
    }

    return 'LoginScreen';
  };

  // const isVettingValid =
  //   vettingData &&
  //   Object.values(vettingData).every(value => {
  //     if (value === null || value === undefined || value === '') return false;
  //     if (Array.isArray(value) && value?.length === 0) return false;
  //     if (typeof value === 'object' && Object.keys(value)?.length === 0)
  //       return false;
  //     return true;
  //   });

  const currentStep = useCurrentStep(vettingData);
  const memoizedCurrentStep = useMemo(() => {
    return currentStep ?? 0;
  }, [vettingData]);

  const handleAuthFlow = () => {
    if (!tempUser) return;

    if (vettingData?.hereWith) {
      dispatch(setCurrentVettingStep(memoizedCurrentStep));
      navigation.navigate('DetailsScreen');
      return; // Prevent further navigation
    }

    // if (isVettingValid) {
    //   navigation.navigate('ProfileSummaryScreen');
    //   return;
    // }

    navigation.navigate('AccountSetupScreen');
  };

  useEffect(() => {
    handleAuthFlow();
  }, [tempUser, vettingData]);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={entitledRoute()}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="GoogleAuthScreen" component={GoogleAuthScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="CreateNewPasswordScreen"
          component={CreateNewPasswordScreen}
        />
        <Stack.Screen
          name="AccountSetupScreen"
          component={AccountSetupScreen}
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen
          name="ProfileSummaryScreen"
          component={ProfileSummaryScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
