// useFetchMemoryLaneQuery;

import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';
import {fetchMemoryLaneFn} from '../../api/games';

interface MemoryLaneQResponse {
  _id: string;
  text: string;
}

export const useFetchMemoryLaneQuery = (): UseQueryResult<
  MemoryLaneQResponse[],
  Error
> =>
  useQuery<MemoryLaneQResponse[], Error>({
    queryKey: ['memoryLane'] as QueryKey,
    queryFn: () => fetchMemoryLaneFn(),
  });
