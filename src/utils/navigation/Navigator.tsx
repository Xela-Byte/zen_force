import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AuthNavigator from './auth/AuthNavigator';
import BottomTabNavigator from './bottomTab/BottomTabNavigator';

type Props = {};

const Navigator = (props: Props) => {
  return (
    <NavigationContainer>
      <StatusBar />
      <AuthNavigator />
      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
};

export const previousRouteName = (navigation: any) => {
  let navRoutes = navigation.dangerouslyGetParent().state.routes;
  if (navRoutes.length >= 2) {
    return navRoutes[navRoutes.length - 2].routeName;
  }
  return navigation.state.routeName;
};

export default Navigator;
