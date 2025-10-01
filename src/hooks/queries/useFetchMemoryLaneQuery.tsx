// useFetchMemoryLaneQuery;

import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';
import {fetchMemoryLaneFn} from '@/api/games';
import {useAppSelector} from '@/hooks/helpers/useRedux';

interface Question {
  _id: string;
  text: string;
}

interface MemoryLaneQResponse {
  questionsLength: number;
  questions: Question[];
  answeredQuestions: string[];
}

export const useFetchMemoryLaneQuery = (): UseQueryResult<
  MemoryLaneQResponse,
  Error
> => {
  const personalityInsight = useAppSelector(
    state => state.app.user?.userInfo?.personalityInsight,
  );

  return useQuery<MemoryLaneQResponse, Error>({
    queryKey: ['memoryLane', personalityInsight] as QueryKey,
    queryFn: () => fetchMemoryLaneFn(personalityInsight || undefined),
  });
};
