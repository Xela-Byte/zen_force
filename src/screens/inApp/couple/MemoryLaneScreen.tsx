import {View, Text, StatusBar, ScrollView, FlatList} from 'react-native';
import {memoryLaneStyle} from '../../../styles/memoryLaneStyle';
import {appColors, fontSize, sizeBlock} from '../../../styles/universalStyle';
import HeaderComponent from '../../../components/button/HeaderComponent';
import {MemoryLaneScreenProps} from '../../../types/navigation/CoupleNavigationType';
import PulseIcon from '../../../assets/images/pulse.svg';
import AppText from '../../../components/text/AppText';
import {memo, useCallback, useRef, useState} from 'react';
import CardIcon from '../../../assets/images/card_grey.svg';

const questions = [
  'What was your first thought when you saw me for the first time?',
  'What’s one thing about me that always makes you smile?',
  'When did you realize you had feelings for me?',
  'If we could relive one moment together, which would it be and why?',
  'What’s something I do that you find irresistible?',
  'What song reminds you of us and why?',
  'If you had to describe our relationship in three words, what would they be?',
  'What’s a small habit of mine that you secretly love?',
  'What’s one thing you want us to do together that we haven’t done yet?',
  'If we wrote a book about our love story, what would the title be?',
];

const MemoryLaneScreen = ({navigation}: MemoryLaneScreenProps) => {
  const GameCard = memo(
    useCallback(
      ({card, index}: {card: string; index: number}) => {
        return (
          <View
            style={[
              memoryLaneStyle.gameCard,
              {
                backgroundColor:
                  index % 2 === 0 ? appColors.limeGreen : '#A9D280',
              },
            ]}>
            <PulseIcon
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: [{rotate: '180deg'}],
              }}
            />
            <PulseIcon style={{position: 'absolute', bottom: 0, left: 0}} />

            <View style={memoryLaneStyle.gameText}>
              <AppText fontSize={fontSize.medium} color={appColors.white}>
                {card}
              </AppText>
            </View>
          </View>
        );
      },
      [questions],
    ),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // Callback to track visible items
  const onViewableItemsChanged = useRef<any>(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={memoryLaneStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title="Memory Lane"
        navigation={navigation}
        theme="light"
      />
      <ScrollView style={memoryLaneStyle.container}>
        <FlatList
          data={questions}
          horizontal
          contentContainerStyle={{
            gap: sizeBlock.getWidthSize(20),
          }}
          renderItem={({item, index}) => {
            return <GameCard card={item} index={index} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 75}}
        />
        <View style={memoryLaneStyle.counterCard}>
          <CardIcon stroke={appColors.textGrey} />
          <AppText color={appColors.textGrey}>
            {currentIndex + 1} of {questions.length}
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
};

export default MemoryLaneScreen;
