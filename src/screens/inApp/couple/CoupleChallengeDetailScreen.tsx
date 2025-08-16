import CardIcon from '@/assets/images/card_grey.svg';
import PulseIcon from '@/assets/images/pulse.svg';
import HeaderComponent from '@/components/button/HeaderComponent';
import AppText from '@/components/text/AppText';
import {useFetchCoupleChallengeQuery} from '@/hooks/queries/useFetchCoupleChallengeQuery';
import {memoryLaneStyle} from '@/styles/memoryLaneStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {CoupleChallengeDetailScreenProps} from '@/types/navigation/CoupleNavigationType';
import {memo, useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import SkeletionPlaceholder from 'react-native-skeleton-placeholder';

const CoupleChallengeDetailScreen = ({
  navigation,
  route,
}: CoupleChallengeDetailScreenProps) => {
  const {params} = route;
  const {challengeType, questionType} = params;

  // Fetching questions from hook
  const {isLoading, isSuccess, isError, data, error} =
    useFetchCoupleChallengeQuery({challengeType});

  // Memoize questions to prevent unnecessary re-renders
  const memoizedQuestions = useMemo(() => {
    return data?.questions ?? [];
  }, [data?.questions]);

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
        <FlatList
          data={Array.from({length: 10})}
          horizontal
          contentContainerStyle={{
            gap: sizeBlock.getWidthSize(20),
          }}
          renderItem={({item, index}) => {
            return (
              <SkeletionPlaceholder key={index}>
                <SkeletionPlaceholder.Item
                  width={screenWidth * 0.75}
                  height={sizeBlock.getHeightSize(375)}
                  borderRadius={borderRadius.medium * 2}
                />
              </SkeletionPlaceholder>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 75}}
        />

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
            width: '100%',
            height: sizeBlock.getHeightSize(375),
            borderRadius: borderRadius.medium * 2,
            ...universalStyle.centering,
          }}>
          <AppText customStyle={{textAlign: 'center'}}>
            {`No ${questionType} questions yet.`}
          </AppText>
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
                customStyle={{textAlign: 'center'}}
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
    <SafeAreaView style={memoryLaneStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title={questionType}
        navigation={navigation}
        theme="light"
      />
      <ScrollView style={memoryLaneStyle.container}>
        {isLoading && <LoadingComponent />}
        {isError && <ErrorComponent />}
        {isSuccess && memoizedQuestions.length === 0 && <EmptyStateComponent />}
        {isSuccess && memoizedQuestions.length > 0 && (
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
    </SafeAreaView>
  );
};

export default CoupleChallengeDetailScreen;
