import AICounselorScreen from '@/screens/inApp/couple/AICounselorScreen';
import CoupleChallengeDetailScreen from '@/screens/inApp/couple/CoupleChallengeDetailScreen';
import CoupleChallengeScreen from '@/screens/inApp/couple/CoupleChallengeScreen';
import CoupleScreen from '@/screens/inApp/couple/CoupleScreen';
import MemoryLaneScreen from '@/screens/inApp/couple/MemoryLaneScreen';
import ProgressTrackingScreen from '@/screens/inApp/couple/ProgressTrackingScreen';
import QuestionRouletteDetailScreen from '@/screens/inApp/couple/QuestionRouletteDetailScreen';
import QuestionRouletteScreen from '@/screens/inApp/couple/QuestionRouletteScreen';
import {CoupleStackParamList} from '@/types/navigation/CoupleNavigationType';
import {useNavigation} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

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
        <Stack.Screen name="AICounselorScreen" component={AICounselorScreen} />
        <Stack.Screen
          name="QuestionRouletteScreen"
          component={QuestionRouletteScreen}
        />
        <Stack.Screen
          name="QuestionRouletteDetailScreen"
          component={QuestionRouletteDetailScreen}
        />
        <Stack.Screen
          name="CoupleChallengeScreen"
          component={CoupleChallengeScreen}
        />
        <Stack.Screen
          name="CoupleChallengeDetailScreen"
          component={CoupleChallengeDetailScreen}
        />

        <Stack.Screen name="MemoryLaneScreen" component={MemoryLaneScreen} />
        <Stack.Screen
          name="ProgressTrackingScreen"
          component={ProgressTrackingScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default CoupleStack;
