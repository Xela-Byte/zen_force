import {NavigationProp, RouteProp} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type HomeScreenProps = {
  navigation: NavigationProp<HomeStackParamList, 'HomeScreen'>;
};
