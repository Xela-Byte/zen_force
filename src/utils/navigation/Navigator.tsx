import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {useAppSelector} from '../../hooks/helpers/useRedux';
import AuthNavigator from './auth/AuthNavigator';
import BottomTabNavigator from './bottomTab/BottomTabNavigator';

type Props = {};

const Navigator = (props: Props) => {
  const user = useAppSelector(state => state.app.user);
  return (
    <NavigationContainer>
      <StatusBar />
      <AuthNavigator />
      {/* {!user ? <AuthNavigator /> : <BottomTabNavigator />} */}
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
