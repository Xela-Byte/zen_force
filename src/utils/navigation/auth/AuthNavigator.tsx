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

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  const isNewInstall = useSelector(
    (state: RootState) => state.app.isNewInstall,
  );
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const user = useSelector((state: RootState) => state.app.user);

  const entitledRoute = (): keyof AuthStackParamList => {
    if (isNewInstall) {
      return 'OnboardingScreen'; // First-time users go to onboarding
    }
    if (!isLoggedIn) {
      return 'LoginScreen'; // If not logged in, send to login
    }
    if (!user) {
      return 'RegisterScreen';
    }

    return 'OnboardingScreen';
  };

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
