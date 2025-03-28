import {NavigationProp} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeScreen: undefined;
  AddPartnerScreen: undefined;
  ViewPartnerScreen: undefined;
};

export type HomeScreenProps = {
  navigation: NavigationProp<HomeStackParamList, 'HomeScreen'>;
};

export type AddPartnerScreenProps = {
  navigation: NavigationProp<HomeStackParamList, 'AddPartnerScreen'>;
};

export type ViewPartnerScreenProps = {
  navigation: NavigationProp<HomeStackParamList, 'ViewPartnerScreen'>;
};
