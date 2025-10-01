import {useQuery, QueryKey, UseQueryResult} from '@tanstack/react-query';
import {fetchQuestionRouletteFn, QuestionType} from '@/api/games';
import {useAppSelector} from '@/hooks/helpers/useRedux';

interface QuestionParams {
  questionType: QuestionType;
}

interface Question {
  _id: string;
  text: string;
  options: string[];
  questionType: string;
}

interface QuestionResponse {
  questionsLength: number;
  questions: Question[];
}

export const useFetchQuestionRouletteQuery = ({
  questionType,
}: QuestionParams): UseQueryResult<QuestionResponse, Error> => {
  const personalityInsight = useAppSelector(
    state => state.app.user?.userInfo?.personalityInsight,
  );

  return useQuery<QuestionResponse, Error>({
    queryKey: [
      'questionRoulette',
      questionType,
      personalityInsight,
    ] as QueryKey,
    queryFn: () =>
      fetchQuestionRouletteFn({
        questionType,
        personalityTypes: personalityInsight,
      }),
  });
};
