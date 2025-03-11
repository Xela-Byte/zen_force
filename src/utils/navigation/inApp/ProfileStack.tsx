import {useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../../screens/inApp/profile/ProfileScreen';
import ProfileSummaryScreen from '../../../screens/inApp/profile/ProfileSummaryScreen';
import {ProfileStackParamList} from '../../../types/navigation/ProfileNavigationType';
import ChoosePlanScreen from '../../../screens/inApp/profile/ChoosePlanScreen';

const ProfileStack = () => {
  const Stack = createStackNavigator<ProfileStackParamList>();

  const navigation = useNavigation<any>();

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'ProfileScreen'}],
  //       });
  //     };
  //   }, []),
  // );

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName={'ProfileScreen'}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="ProfileSummaryScreen"
          component={ProfileSummaryScreen}
        />
        <Stack.Screen name="ChoosePlanScreen" component={ChoosePlanScreen} />
      </Stack.Navigator>
    </>
  );
};

export default ProfileStack;
