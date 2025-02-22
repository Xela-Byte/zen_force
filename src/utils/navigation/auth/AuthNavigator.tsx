import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountSetupScreen from '../../../screens/auth/AccountSetupScreen';
import LoginScreen from '../../../screens/auth/LoginScreen';
import OnboardingScreen from '../../../screens/auth/OnboardingScreen';
import RegisterScreen from '../../../screens/auth/RegisterScreen';
import {AuthStackParamList} from '../../../types/navigation/AuthNavigationType';
import DetailsScreen from '../../../screens/auth/DetailsScreen';
import ProfileSummaryScreen from '../../../screens/auth/ProfileSummaryScreen';
import ForgotPasswordScreen from '../../../screens/auth/ForgotPasswordScreen';
import CreateNewPasswordScreen from '../../../screens/auth/CreateNewPasswordScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  const entitledRoute = (): keyof AuthStackParamList => {
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
