import {NavigationProp, RouteProp} from '@react-navigation/native';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

export type ProfileScreenProps = {
  navigation: NavigationProp<ProfileStackParamList, 'ProfileScreen'>;
};
