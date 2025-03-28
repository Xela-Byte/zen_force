import AddPartnerScreen from '@/screens/inApp/home/AddPartnerScreen';
import HomeScreen from '@/screens/inApp/home/HomeScreen';
import ViewPartnerScreen from '@/screens/inApp/home/ViewPartnerScreen';
import {HomeStackParamList} from '@/types/navigation/HomeStackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

const HomeStack = () => {
  const Stack = createStackNavigator<HomeStackParamList>();

  const navigation = useNavigation<any>();

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'HomeScreen'}],
  //       });
  //     };
  //   }, []),
  // );

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        initialRouteName={'HomeScreen'}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddPartnerScreen" component={AddPartnerScreen} />
        <Stack.Screen name="ViewPartnerScreen" component={ViewPartnerScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
