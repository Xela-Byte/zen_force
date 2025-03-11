import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import {questionRouletteStyle} from '../../../styles/questionRouletteStyle';
import HeaderComponent from '../../../components/button/HeaderComponent';
import {
  CoupleStackParamList,
  QuestionRouletteScreenProps,
} from '../../../types/navigation/CoupleNavigationType';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  sizeBlock,
} from '../../../styles/universalStyle';
import AppText from '../../../components/text/AppText';
import CoupleImage from '../../../assets/images/couple.jpg';
import AppImage from '../../../components/image/AppImage';
import LinearGradient from 'react-native-linear-gradient';
import AppPressable from '../../../components/button/AppPressable';
import {QuestionType} from '../../../api/games';

interface Stage {
  title: string;
  questions: number;
  status: string;
  questionType: QuestionType;
}

const stages: Stage[] = [
  {
    title: 'Single & Dating',
    questions: 12,
    status: 'Free',
    questionType: 'single-dating',
  },
  {
    title: 'Couple (Non married)',
    questions: 12,
    status: 'Free',
    questionType: 'couple-unmarried',
  },
  {
    title: 'Married Couples',
    questions: 12,
    status: 'Free',
    questionType: 'married-couples',
  },
  {
    title: 'Newly wed',
    questions: 12,
    status: 'Free',
    questionType: 'newly-wed',
  },
  {
    title: 'Advance (Romance & Erotica)',
    questions: 12,
    status: 'Premium',
    questionType: 'advance-romance-erotica',
  },
];

const QuestionRouletteScreen = ({navigation}: QuestionRouletteScreenProps) => {
  const navigateTo = <T extends keyof CoupleStackParamList>(
    route: T,
    params?: CoupleStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const StageButton = memo(({stg}: {stg: Stage}) => {
    const handlePress = useCallback(() => {
      navigateTo('QuestionRouletteDetailScreen', {
        stageType: stg.title,
        questionType: stg.questionType,
      });
    }, [stg.title]);

    return (
      <AppPressable onPress={handlePress}>
        <View style={questionRouletteStyle.gameTab}>
          <AppImage
            source={CoupleImage}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: sizeBlock.getWidthSize(360),
              borderRadius: borderRadius.medium + 5,
            }}
            resizeMode="cover"
          />

          <View style={questionRouletteStyle.gameTabCard}>
            <AppText fontType="medium">{stg.title}</AppText>
            <AppText fontSize={fontSize.small - 3}>
              {stg.questions} Questions
            </AppText>
          </View>

          {/* Price tag */}
          <LinearGradient
            style={questionRouletteStyle.gameTabTag}
            colors={['#3BA700', '#6FCB03']}>
            <AppText fontSize={fontSize.small - 3} color={appColors.white}>
              {stg.status}
            </AppText>
          </LinearGradient>
        </View>
      </AppPressable>
    );
  });

  return (
    <View style={questionRouletteStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title="Question Roulette"
        navigation={navigation}
        theme="light"
      />
      <View style={questionRouletteStyle.container}>
        <AppText fontSize={fontSize.small + 1} fontType="semiBold">
          Select Stage/Level
        </AppText>
        <FlatList
          contentContainerStyle={{
            paddingVertical: sizeBlock.getHeightSize(15),
          }}
          style={{
            height: screenHeight * 0.8,
          }}
          data={stages}
          renderItem={({item}) => {
            return <StageButton stg={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default QuestionRouletteScreen;
