import {NavigationProp, RouteProp} from '@react-navigation/native';

export type CoupleStackParamList = {
  CoupleScreen: undefined;
  AICounselorScreen: undefined;
  QuestionRouletteScreen: undefined;
  CoupleChallengeScreen: undefined;
  MemoryLaneScreen: undefined;
  CoupleChallengeDetailScreen: {
    questionType: string;
  };
};

export type CoupleScreenProps = {
  navigation: NavigationProp<CoupleStackParamList, 'CoupleScreen'>;
};

export type AICounselorScreenProps = {
  navigation: NavigationProp<CoupleStackParamList, 'AICounselorScreen'>;
};

export type QuestionRouletteScreenProps = {
  navigation: NavigationProp<CoupleStackParamList, 'QuestionRouletteScreen'>;
};

export type CoupleChallengeScreenProps = {
  navigation: NavigationProp<CoupleStackParamList, 'CoupleChallengeScreen'>;
};

export type MemoryLaneScreenProps = {
  navigation: NavigationProp<CoupleStackParamList, 'MemoryLaneScreen'>;
};

export type CoupleChallengeDetailScreenProps = {
  navigation: NavigationProp<
    CoupleStackParamList,
    'CoupleChallengeDetailScreen'
  >;
  route: RouteProp<CoupleStackParamList, 'CoupleChallengeDetailScreen'>;
};
