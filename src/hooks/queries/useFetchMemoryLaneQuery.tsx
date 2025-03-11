// useFetchMemoryLaneQuery;

import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';
import {fetchMemoryLaneFn} from '../../api/games';

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
> =>
  useQuery<MemoryLaneQResponse, Error>({
    queryKey: ['memoryLane'] as QueryKey,
    queryFn: () => fetchMemoryLaneFn(),
  });
