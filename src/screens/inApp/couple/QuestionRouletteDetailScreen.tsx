import React, {useMemo, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import PulseIcon from '@/assets/images/pulse.svg';
import AppButton from '@/components/button/AppButton';
import HeaderComponent from '@/components/button/HeaderComponent';
import QuestionCheckbox from '@/components/checkbox/QuestionCheckbox';
import PopupComponent from '@/components/popup/PopupComponent';
import AppText from '@/components/text/AppText';
import {questionRouletteStyle} from '@/styles/questionRouletteStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {QuestionRouletteDetailScreenProps} from '@/types/navigation/CoupleNavigationType';
import {useFetchQuestionRouletteQuery} from '@/hooks/queries/useFetchQuestionRouletteQuery';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {QuestionType} from '@/api/games';
import {useDispatch} from 'react-redux';
import {markQuestionRouletteCompleted} from '@/store/slices/progressSlice';

// const questions = [
//   {
//     question: 'Madelyn, are you a shopaholic?',
//     options: ['Yes, absolutely!', 'Sometimes', 'Rarely'],
//   },
//   {
//     question: 'Do you believe in love at first sight?',
//     options: ['Yes', 'No', 'Maybe', 'Only in movies'],
//   },
//   {
//     question: 'What’s your ideal first date?',
//     options: ['Fancy dinner', 'Movie night', 'Outdoor adventure'],
//   },
//   {
//     question: 'Have you ever sent a risky text?',
//     options: [
//       'Yes, and I regretted it',
//       'Yes, and it went well',
//       'No, I play it safe',
//       'I don’t text first',
//     ],
//   },
//   {
//     question: 'What’s the most spontaneous thing you’ve ever done for love?',
//     options: [
//       'Planned a surprise trip',
//       'Sent a heartfelt letter',
//       'Confessed my feelings suddenly',
//     ],
//   },
//   {
//     question:
//       'If you could describe your dating life in one word, what would it be?',
//     options: ['Adventurous', 'Chaotic', 'Predictable', 'Non-existent'],
//   },
//   {
//     question: 'Do you prefer deep conversations or playful banter?',
//     options: ['Deep conversations', 'Playful banter', 'A mix of both'],
//   },
//   {
//     question: 'What’s a relationship red flag for you?',
//     options: [
//       'Lack of communication',
//       'Being too clingy',
//       'Dishonesty',
//       'All of the above',
//     ],
//   },
//   {
//     question: 'How do you usually show affection?',
//     options: ['Giving gifts', 'Words of affirmation', 'Physical touch'],
//   },
//   {
//     question:
//       'What’s the biggest lesson you’ve learned from past relationships?',
//     options: [
//       'Communication is key',
//       'Love alone isn’t enough',
//       'Trust takes time',
//       'Never date a Scorpio 😆',
//     ],
//   },
//   {
//     question:
//       'Do you think opposites attract, or do you prefer someone similar?',
//     options: [
//       'Opposites attract',
//       'Similar people vibe better',
//       'It depends on personality',
//     ],
//   },
//   {
//     question: 'What’s your ultimate deal-breaker in dating?',
//     options: [
//       'Bad hygiene',
//       'Dishonesty',
//       'Lack of ambition',
//       'All of the above',
//     ],
//   },
// ];

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1, // Ensures it takes full height
        paddingHorizontal: sizeBlock.getWidthSize(15), // Prevents cutoff due to screen edges
        paddingTop: sizeBlock.getHeightSize(20), // Adds spacing at the top
      }}>
      {/* Small Text Placeholder */}
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={100} height={20} borderRadius={8} />
      </SkeletonPlaceholder>

      {/* Large Block Placeholder */}
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={sizeBlock.getHeightSize(175)}
          borderRadius={borderRadius.medium * 2}
          marginTop={sizeBlock.getHeightSize(15)}
        />
      </SkeletonPlaceholder>

      {/* Multiple Rows Placeholder */}
      <View
        style={{
          marginVertical: sizeBlock.getHeightSize(50),
        }}>
        {Array.from({length: 3}).map((_, index) => (
          <SkeletonPlaceholder key={index}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={sizeBlock.getHeightSize(60)}
              borderRadius={borderRadius.medium}
              marginVertical={sizeBlock.getHeightSize(5)}
            />
          </SkeletonPlaceholder>
        ))}
      </View>

      {/* Final Row Placeholder */}
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={sizeBlock.getHeightSize(59)}
          borderRadius={borderRadius.medium}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

const ErrorComponent = ({errorMessage}: {errorMessage: string}) => {
  return (
    <View
      style={{
        width: '100%',
        height: sizeBlock.getHeightSize(175),
        borderRadius: borderRadius.medium * 2,
        marginTop: sizeBlock.getHeightSize(15),
        ...universalStyle.centering,
        backgroundColor: appColors.grey,
      }}>
      <AppText>{errorMessage}</AppText>
    </View>
  );
};

const EmptyStateComponent = ({questionType}: {questionType: string}) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          height: sizeBlock.getHeightSize(375),
          borderRadius: borderRadius.medium * 2,
          ...universalStyle.centering,
        }}>
        <AppText
          customStyle={{
            textAlign: 'center',
          }}>{`No ${questionType} questions yet.`}</AppText>
      </View>
    </>
  );
};

const QuestionRouletteDetailScreen = ({
  navigation,
  route,
}: QuestionRouletteDetailScreenProps) => {
  const dispatch = useDispatch();
  const {
    params: {stageType, questionType},
  } = route;

  // Fetch questions from hook
  const {data, isSuccess, isLoading, isError, error} =
    useFetchQuestionRouletteQuery({
      questionType,
    });

  const memoizedQuestions = useMemo(() => {
    return data?.questions ?? [];
  }, [data?.questions]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentQuestionIndex < memoizedQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null); // Reset selection for the next question
      }, 300);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  return (
    <SafeAreaView style={questionRouletteStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <HeaderComponent
        title={stageType}
        navigation={navigation}
        theme="light"
      />

      {quizCompleted && (
        <PopupComponent
          title="Completed"
          onDone={() => {
            dispatch(markQuestionRouletteCompleted(questionType));
            resetState();
            navigation.goBack();
          }}
          content="Level completed successfully. Proceed to the next level"
          confirmBtnTitle="Okay"
          showConfetti={true}
        />
      )}

      <ScrollView style={questionRouletteStyle.container}>
        {isError && (
          <ErrorComponent
            errorMessage={error?.message || 'Error fetching questions.'}
          />
        )}
        {isLoading && <LoadingComponent />}
        {isSuccess && memoizedQuestions.length === 0 && (
          <EmptyStateComponent questionType={stageType} />
        )}
        {isSuccess && memoizedQuestions.length > 0 && (
          <>
            <AppText fontSize={fontSize.small + 1} fontType="semiBold">
              Question {currentQuestionIndex + 1}/{memoizedQuestions.length}
            </AppText>

            <View style={questionRouletteStyle.questionCard}>
              <PulseIcon
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  transform: [{rotate: '180deg'}],
                }}
              />
              <PulseIcon
                style={{
                  position: 'absolute',
                  bottom: -sizeBlock.getHeightSize(25),
                  left: sizeBlock.getWidthSize(15),
                  transform: [{rotate: '-35deg'}],
                }}
              />
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  ...universalStyle.centering,
                  padding: sizeBlock.getWidthSize(25),
                }}>
                <AppText
                  color={appColors.white}
                  fontType="medium"
                  customStyle={{textAlign: 'center'}}
                  fontSize={fontSize.small + 5}>
                  {memoizedQuestions[currentQuestionIndex].text}
                </AppText>
              </View>
            </View>

            <View>
              {memoizedQuestions[currentQuestionIndex].options.map(
                (label, index) => {
                  const optionKey = String.fromCharCode(65 + index); // Convert index to A, B, C, D dynamically

                  return (
                    <QuestionCheckbox
                      key={optionKey}
                      optionKey={optionKey}
                      label={label}
                      selected={selectedOption === optionKey}
                      onPress={() => handleSelect(optionKey)}
                    />
                  );
                },
              )}
            </View>

            <AppButton
              bgColor={appColors.green}
              customViewStyle={{marginVertical: sizeBlock.getHeightSize(50)}}
              title={
                currentQuestionIndex === memoizedQuestions.length - 1
                  ? 'Finish'
                  : 'Next'
              }
              onPress={handleNext}
              disabled={!selectedOption} // Disable button if no option is selected
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuestionRouletteDetailScreen;
