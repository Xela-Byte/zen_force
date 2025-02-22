import {NavigationProp, RouteProp} from '@react-navigation/native';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  ProfileSummaryScreen: undefined;
  ChoosePlanScreen: {
    plan: any;
  };
};

export type ProfileScreenProps = {
  navigation: NavigationProp<ProfileStackParamList, 'ProfileScreen'>;
};

export type ProfileSummaryScreenProps = {
  navigation: NavigationProp<ProfileStackParamList, 'ProfileSummaryScreen'>;
};

export type ChoosePlanScreenProps = {
  navigation: NavigationProp<ProfileStackParamList, 'ChoosePlanScreen'>;
  route: RouteProp<ProfileStackParamList, 'ChoosePlanScreen'>;
};
