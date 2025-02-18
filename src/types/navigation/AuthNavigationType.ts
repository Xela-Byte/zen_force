import {NavigationProp, RouteProp} from '@react-navigation/native';

export type AuthStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  AccountSetupScreen: undefined;
  DetailsScreen: {
    companionPreference: 'with-partner' | 'by-myself' | string;
  };
  ProfileSummaryScreen: undefined;
  ForgotPasswordScreen: undefined;
  CreateNewPasswordScreen: undefined;
};

export type OnboardingScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'OnboardingScreen'>;
};

export type LoginScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'LoginScreen'>;
};

export type RegisterScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'RegisterScreen'>;
};

export type AccountSetupScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'AccountSetupScreen'>;
};

export type DetailsScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'DetailsScreen'>;
  route: RouteProp<AuthStackParamList, 'DetailsScreen'>;
};

export type ProfileSummaryScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'ProfileSummaryScreen'>;
};

export type ForgotPasswordScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'ForgotPasswordScreen'>;
};

export type CreateNewPasswordScreenProps = {
  navigation: NavigationProp<AuthStackParamList, 'CreateNewPasswordScreen'>;
};
