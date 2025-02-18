import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../inApp/HomeStack';
import BottomTabComponent from '../../../components/bottomTab/BottomTabComponent';
import CoupleStack from '../inApp/CoupleStack';
import ProfileStack from '../inApp/ProfileStack';
import ExploreStack from '../inApp/ExploreStack';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={props => <BottomTabComponent {...props} />}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Couple" component={CoupleStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
