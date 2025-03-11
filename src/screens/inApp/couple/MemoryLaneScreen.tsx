import {View, Text, StatusBar, ScrollView, FlatList} from 'react-native';
import {memoryLaneStyle} from '../../../styles/memoryLaneStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../../styles/universalStyle';
import HeaderComponent from '../../../components/button/HeaderComponent';
import {MemoryLaneScreenProps} from '../../../types/navigation/CoupleNavigationType';
import PulseIcon from '../../../assets/images/pulse.svg';
import AppText from '../../../components/text/AppText';
import {memo, useCallback, useMemo, useRef, useState} from 'react';
import CardIcon from '../../../assets/images/card_grey.svg';
import SkeletionPlaceholder from 'react-native-skeleton-placeholder';
import {useFetchMemoryLaneQuery} from '../../../hooks/queries/useFetchMemoryLaneQuery';

// const questions = [
//   'What was your first thought when you saw me for the first time?',
//   'What’s one thing about me that always makes you smile?',
//   'When did you realize you had feelings for me?',
//   'If we could relive one moment together, which would it be and why?',
//   'What’s something I do that you find irresistible?',
//   'What song reminds you of us and why?',
//   'If you had to describe our relationship in three words, what would they be?',
//   'What’s a small habit of mine that you secretly love?',
//   'What’s one thing you want us to do together that we haven’t done yet?',
//   'If we wrote a book about our love story, what would the title be?',
// ];

const MemoryLaneScreen = ({navigation}: MemoryLaneScreenProps) => {
  // Fetching questions from hook
  const {isLoading, isSuccess, isError, data, error} =
    useFetchMemoryLaneQuery();

  // Memoize questions to prevent unnecessary re-renders
  const memoizedQuestions = useMemo(
    () => data?.questions ?? [],
    [data?.questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // Callback to track visible items
  const onViewableItemsChanged = useRef<any>(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const LoadingComponent = () => {
    return (
      <>
        <SkeletionPlaceholder>
          <SkeletionPlaceholder.Item
            width={screenWidth * 0.75}
            height={sizeBlock.getHeightSize(375)}
            borderRadius={borderRadius.medium * 2}
          />
        </SkeletionPlaceholder>

        {/* Counter */}
        <View style={memoryLaneStyle.counterCard}>
          <CardIcon stroke={appColors.textGrey} />
          <AppText color={appColors.textGrey}>- of -</AppText>
        </View>
      </>
    );
  };

  const ErrorComponent = () => {
    return (
      <>
        <View
          style={{
            width: screenWidth * 0.75,
            height: sizeBlock.getHeightSize(375),
            borderRadius: borderRadius.medium * 2,
            ...universalStyle.centering,
          }}>
          <AppText>{error?.message || 'Error fetching questions.'}</AppText>
        </View>

        {/* Counter */}
        <View style={memoryLaneStyle.counterCard}>
          <CardIcon stroke={appColors.textGrey} />
          <AppText color={appColors.textGrey}>- of -</AppText>
        </View>
      </>
    );
  };

  const EmptyStateComponent = () => {
    return (
      <>
        <View
          style={{
            width: screenWidth * 0.75,
            height: sizeBlock.getHeightSize(375),
            borderRadius: borderRadius.medium * 2,
            ...universalStyle.centering,
          }}>
          <AppText>{'No memory lane questions yet.'}</AppText>
        </View>

        {/* Counter */}
        <View style={memoryLaneStyle.counterCard}>
          <CardIcon stroke={appColors.textGrey} />
          <AppText color={appColors.textGrey}>- of -</AppText>
        </View>
      </>
    );
  };

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
              <AppText
                customStyle={{
                  textAlign: 'center',
                }}
                fontSize={fontSize.medium}
                color={appColors.white}>
                {card}
              </AppText>
            </View>
          </View>
        );
      },
      [data?.questions],
    ),
  );

  return (
    <View style={memoryLaneStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title="Memory Lane"
        navigation={navigation}
        theme="light"
      />
      <ScrollView style={memoryLaneStyle.container}>
        {isLoading && <LoadingComponent />}
        {isError && <ErrorComponent />}
        {isSuccess && (
          <>
            <FlatList
              data={memoizedQuestions}
              horizontal
              contentContainerStyle={{
                gap: sizeBlock.getWidthSize(20),
              }}
              renderItem={({item, index}) => {
                return <GameCard card={item.text} index={index} />;
              }}
              keyExtractor={(item, index) => index.toString()}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{viewAreaCoveragePercentThreshold: 75}}
              ListEmptyComponent={() => {
                return <EmptyStateComponent />;
              }}
            />
            <View style={memoryLaneStyle.counterCard}>
              <CardIcon stroke={appColors.textGrey} />
              <AppText color={appColors.textGrey}>
                {currentIndex + 1} of {memoizedQuestions.length}
              </AppText>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MemoryLaneScreen;
