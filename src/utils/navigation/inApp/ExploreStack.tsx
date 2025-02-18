import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {useCallback} from 'react';
import ExploreScreen from '../../../screens/inApp/explore/ExploreScreen';
import {ExploreStackParamList} from '../../../types/navigation/ExploreStackNavigationType';

const ExploreStack = () => {
  const Stack = createStackNavigator<ExploreStackParamList>();

  const navigation = useNavigation<any>();

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'ExploreScreen'}],
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
        initialRouteName={'ExploreScreen'}>
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      </Stack.Navigator>
    </>
  );
};

export default ExploreStack;
