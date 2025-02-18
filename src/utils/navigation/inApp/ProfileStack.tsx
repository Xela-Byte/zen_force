import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {useCallback} from 'react';
import ProfileScreen from '../../../screens/inApp/profile/ProfileScreen';
import {ProfileStackParamList} from '../../../types/navigation/ProfileNavigationType';

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
      </Stack.Navigator>
    </>
  );
};

export default ProfileStack;
