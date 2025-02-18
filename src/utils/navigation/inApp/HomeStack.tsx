import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {useCallback} from 'react';
import HomeScreen from '../../../screens/inApp/home/HomeScreen';
import {HomeStackParamList} from '../../../types/navigation/HomeStackNavigationType';

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
      {/* <StatusBar
        backgroundColor={
          darkMode
            ? appColors['dark'].background
            : appColors['light'].background
        }
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      /> */}
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        initialRouteName={'HomeScreen'}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
