import {useQuery, QueryKey, UseQueryResult} from '@tanstack/react-query';
import {fetchQuestionRouletteFn, QuestionType} from '../../api/games';

interface QuestionParams {
  questionType: QuestionType;
}

interface QuestionResponse {
  _id: string;
  text: string;
  options: string[];
  questionType: string;
}

export const useFetchQuestionRouletteQuery = ({
  questionType,
}: QuestionParams): UseQueryResult<QuestionResponse[], Error> =>
  useQuery<QuestionResponse[], Error>({
    queryKey: ['questionRoulette', questionType] as QueryKey,
    queryFn: () => fetchQuestionRouletteFn({questionType}),
  });
