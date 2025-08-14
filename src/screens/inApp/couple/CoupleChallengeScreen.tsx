import React, {useMemo} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {ChallengeType} from '@/api/games';
import CardIcon from '@/assets/images/card.svg';
import MeshIcon from '@/assets/images/mesh.svg';
import StarIcon from '@/assets/images/star.svg';
import WhirlIcon from '@/assets/images/whirl.svg';
import ZigzagIcon from '@/assets/images/zigzag.svg';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import AppPressable from '@/components/button/AppPressable';
import HeaderComponent from '@/components/button/HeaderComponent';
import AppText from '@/components/text/AppText';
import {coupleChallengeStyle} from '@/styles/coupleChallengeStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {
  CoupleChallengeScreenProps,
  CoupleStackParamList,
} from '@/types/navigation/CoupleNavigationType';
import {useFetchCoupleChallengeQuery} from '@/hooks/queries/useFetchCoupleChallengeQuery';

interface Challenge {
  title: string;
  icon: React.FC<SvgProps>;
  bgColor: string;
  challengeType: ChallengeType;
}

const challenges: Challenge[] = [
  {
    title: 'Conversation Starters',
    icon: MeshIcon,
    bgColor: '#368C76',
    challengeType: 'conversation-starters',
  },
  {
    title: 'Who Knows Who Best?',
    icon: WhirlIcon,
    bgColor: '#D28134',
    challengeType: 'who-knows-who-best',
  },
  {
    title: 'Roleplay Scenarios',
    icon: StarIcon,
    bgColor: '#D46FAA',
    challengeType: 'roleplay-scenarios',
  },
  {
    title: 'Intimacy Tips & Tricks',
    icon: ZigzagIcon,
    bgColor: '#5A79D5',
    challengeType: 'intimacy-tips-tricks',
  },
];

// ChallengeCard Component
const ChallengeCard: React.FC<{item: Challenge; onPress: () => void}> = ({
  item,
  onPress,
}) => {
  const {data, isPending, isError} = useFetchCoupleChallengeQuery({
    challengeType: item.challengeType,
  });

  const memoizedQuestions = useMemo(
    () => data?.questions ?? [],
    [data?.questions],
  );

  return (
    <Pressable
      onPress={onPress}
      style={[
        coupleChallengeStyle.challengeTab,
        {backgroundColor: item.bgColor},
      ]}>
      <item.icon style={{position: 'absolute'}} />
      <View style={coupleChallengeStyle.challengeCard}>
        <AppText
          fontSize={fontSize.small + 5}
          fontType="medium"
          color={appColors.white}>
          {item.title}
        </AppText>

        <View
          style={{
            paddingTop: sizeBlock.getHeightSize(10),
            ...universalStyle.verticalCentering,
            columnGap: sizeBlock.getWidthSize(5),
          }}>
          <CardIcon />
          <AppText color={appColors.white} fontSize={fontSize.small - 3}>
            {isPending || isError
              ? '- of -'
              : `1 of ${memoizedQuestions.length}`}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

const CoupleChallengeScreen = ({navigation}: CoupleChallengeScreenProps) => {
  const navigateTo = <T extends keyof CoupleStackParamList>(
    route: T,
    params?: CoupleStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const renderChallengeCard = ({item}: {item: Challenge}) => {
    return (
      <ChallengeCard
        item={item}
        onPress={() => {
          navigateTo('CoupleChallengeDetailScreen', {
            questionType: item.title,
            challengeType: item.challengeType,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={coupleChallengeStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title="Couple challenge"
        navigation={navigation}
        theme="light"
      />
      <View style={coupleChallengeStyle.container}>
        <ScrollView>
          <FlatList
            numColumns={2}
            data={challenges}
            renderItem={renderChallengeCard}
            keyExtractor={item => item.challengeType} // Assuming challengeType is unique
            contentContainerStyle={{rowGap: sizeBlock.getWidthSize(20)}}
            columnWrapperStyle={{columnGap: sizeBlock.getWidthSize(20)}}
            scrollEnabled={false}
          />

          <AppPressable onPress={() => navigateTo('AICounselorScreen')}>
            <View style={coupleChallengeStyle.adButton}>
              <View style={{rowGap: sizeBlock.getHeightSize(5)}}>
                <AppText
                  fontType="medium"
                  fontSize={fontSize.small + 5}
                  color={appColors.white}>
                  Try the Date Conscious
                </AppText>
                <AppText fontSize={fontSize.small + 5} fontType="medium">
                  AI Counselor
                </AppText>
              </View>
              <View
                style={{
                  ...universalStyle.centering,
                  backgroundColor: appColors.white,
                  padding: sizeBlock.getWidthSize(20),
                  borderRadius: borderRadius.full,
                  width: sizeBlock.getWidthSize(30),
                  height: sizeBlock.getWidthSize(30),
                }}>
                <ArrowLeft style={{transform: [{rotate: '180deg'}]}} />
              </View>
            </View>
          </AppPressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CoupleChallengeScreen;
