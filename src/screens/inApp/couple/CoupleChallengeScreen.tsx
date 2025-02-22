import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {coupleChallengeStyle} from '../../../styles/coupleChallengeStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '../../../styles/universalStyle';
import {
  CoupleChallengeScreenProps,
  CoupleStackParamList,
} from '../../../types/navigation/CoupleNavigationType';
import HeaderComponent from '../../../components/button/HeaderComponent';
import MeshIcon from '../../../assets/images/mesh.svg';
import WhirlIcon from '../../../assets/images/whirl.svg';
import StarIcon from '../../../assets/images/star.svg';
import ZigzagIcon from '../../../assets/images/zigzag.svg';
import AppText from '../../../components/text/AppText';
import CardIcon from '../../../assets/images/card.svg';
import {SvgProps} from 'react-native-svg';
import ArrowLeft from '../../../assets/svgsComponents/ArrowLeft';
import AppPressable from '../../../components/button/AppPressable';

interface Challenge {
  title: string;
  icon: React.FC<SvgProps>;
  bgColor: string;
}

const challenges: Challenge[] = [
  {
    title: 'Conversation Starters',
    icon: MeshIcon,
    bgColor: '#368C76',
  },
  {
    title: 'Who Knows Who Best?',
    icon: WhirlIcon,
    bgColor: '#D28134',
  },
  {
    title: 'Roleplay Scenarios',
    icon: StarIcon,
    bgColor: '#D46FAA',
  },
  {
    title: 'Intimacy Tips & Tricks',
    icon: ZigzagIcon,
    bgColor: '#5A79D5',
  },
];

const CoupleChallengeScreen = ({navigation}: CoupleChallengeScreenProps) => {
  const navigateTo = <T extends keyof CoupleStackParamList>(
    route: T,
    params?: CoupleStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };
  return (
    <View style={coupleChallengeStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title="Couple challenge"
        navigation={navigation}
        theme="light"
      />
      <ScrollView style={coupleChallengeStyle.container}>
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            rowGap: sizeBlock.getWidthSize(20),
          }}
          columnWrapperStyle={{
            columnGap: sizeBlock.getWidthSize(20),
          }}
          data={challenges}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigateTo('CoupleChallengeDetailScreen', {
                    questionType: item.title,
                  });
                }}
                style={[
                  coupleChallengeStyle.challengeTab,
                  {backgroundColor: item.bgColor},
                ]}>
                <item.icon
                  style={{
                    position: 'absolute',
                  }}
                />
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
                    <AppText
                      color={appColors.white}
                      fontSize={fontSize.small - 3}>
                      1 of 100
                    </AppText>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />

        <View style={coupleChallengeStyle.adButton}>
          <View
            style={{
              rowGap: sizeBlock.getHeightSize(5),
            }}>
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
      </ScrollView>
    </View>
  );
};

export default CoupleChallengeScreen;
