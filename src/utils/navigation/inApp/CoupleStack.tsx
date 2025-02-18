import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {useCallback} from 'react';
import CoupleScreen from '../../../screens/inApp/couple/CoupleScreen';
import {CoupleStackParamList} from '../../../types/navigation/CoupleNavigationType';

const CoupleStack = () => {
  const Stack = createStackNavigator<CoupleStackParamList>();

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
        initialRouteName={'CoupleScreen'}>
        <Stack.Screen name="CoupleScreen" component={CoupleScreen} />
      </Stack.Navigator>
    </>
  );
};

export default CoupleStack;
