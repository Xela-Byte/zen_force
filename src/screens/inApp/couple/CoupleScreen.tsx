import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import GraphIcon from '../../../assets/images/graph_icon.svg';
import ArrowLeft from '../../../assets/svgsComponents/ArrowLeft';
import AppText from '../../../components/text/AppText';
import {coupleStyle} from '../../../styles/coupleStyle';
import {appColors, fontSize, sizeBlock} from '../../../styles/universalStyle';
import AiGameIcon from '../../../assets/images/aiGame_icon.png';
import AppImage from '../../../components/image/AppImage';
import AppPressable from '../../../components/button/AppPressable';
import {
  CoupleScreenProps,
  CoupleStackParamList,
} from '../../../types/navigation/CoupleNavigationType';

interface Game {
  title: string;
  description: string;
  screen?: keyof CoupleStackParamList;
}

const coupleGames: Game[] = [
  {
    title: 'AI Counselor',
    description: '',
    screen: 'AICounselorScreen',
  },
  {
    title: 'Question Roulette',
    description: '5 Stages/Levels',
    screen: 'QuestionRouletteScreen',
  },
  {
    title: 'Couple Challenge',
    description: 'Couple’s Game • 12 Questions',
    screen: 'CoupleChallengeScreen',
  },
  {
    title: 'Memory Lane',
    description: 'Couple’s Game • 12 Questions',
    screen: 'MemoryLaneScreen',
  },
  {
    title: 'Progress Tracking',
    description: '',
  },
];

const CoupleScreen = ({navigation}: CoupleScreenProps) => {
  const navigateTo = <T extends keyof CoupleStackParamList>(
    route: T,
    params?: CoupleStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };
  return (
    <ScrollView style={coupleStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <AppText
        customStyle={{
          textAlign: 'center',
          marginTop: sizeBlock.getHeightSize(30),
        }}
        fontType="semiBold"
        fontSize={fontSize.small + 5}
        color={appColors.white}>
        Couple
      </AppText>
      <View style={coupleStyle.container}>
        <View style={coupleStyle.coupleSectionTabWrapper}>
          {coupleGames.map((cog, index) => {
            return (
              <AppPressable
                key={index}
                onPress={() => {
                  cog.screen && navigateTo(cog.screen);
                }}>
                <View style={coupleStyle.coupleSectionTab}>
                  {index === 0 ? (
                    <AppImage
                      source={AiGameIcon}
                      style={{
                        width: sizeBlock.getWidthSize(60),
                        height: sizeBlock.getWidthSize(60),
                      }}
                    />
                  ) : (
                    <GraphIcon />
                  )}
                  <View
                    style={{width: '65%', rowGap: sizeBlock.getHeightSize(5)}}>
                    <AppText fontType="medium" fontSize={fontSize.small + 1}>
                      {cog.title}
                    </AppText>
                    {cog.description && (
                      <AppText
                        fontSize={fontSize.small - 3}
                        color={appColors.textGrey}>
                        {cog.description}
                      </AppText>
                    )}
                  </View>
                  <ArrowLeft
                    fill={appColors.green}
                    style={{
                      transform: [{rotate: '180deg'}, {scale: 1.3}],
                      marginRight: sizeBlock.getWidthSize(10),
                    }}
                  />
                </View>
              </AppPressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default CoupleScreen;
