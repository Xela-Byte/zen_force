import {View, Text, ScrollView, StatusBar, Image} from 'react-native';
import React from 'react';
import {questionRouletteStyle} from '../../../styles/questionRouletteStyle';
import HeaderComponent from '../../../components/button/HeaderComponent';
import {QuestionRouletteScreenProps} from '../../../types/navigation/CoupleNavigationType';
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

const stages = [
  {
    title: 'Single & Dating',
    questions: 12,
    status: 'Free',
  },
  {
    title: 'Couple (Non married)',
    questions: 12,
    status: 'Free',
  },
  {
    title: 'Married Couples',
    questions: 12,
    status: 'Free',
  },
  {
    title: 'Newly wed',
    questions: 12,
    status: 'Free',
  },
  {
    title: 'Advance (Romance & Erotica)',
    questions: 12,
    status: 'Premium',
  },
];

const QuestionRouletteScreen = ({navigation}: QuestionRouletteScreenProps) => {
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
        <ScrollView
          contentContainerStyle={{
            paddingVertical: sizeBlock.getHeightSize(15),
          }}
          style={{
            height: screenHeight * 0.8,
          }}>
          {stages.map((stg, index) => {
            return (
              <View key={index} style={questionRouletteStyle.gameTab}>
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
                  <AppText
                    fontSize={fontSize.small - 3}
                    color={appColors.white}>
                    {stg.status}
                  </AppText>
                </LinearGradient>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default QuestionRouletteScreen;
