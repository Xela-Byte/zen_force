// useFetchPartnerQuery;

import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';
import {getPartnerFn, PartnerResponse} from '@/api/profile';

export const useFetchPartnerQuery = (): UseQueryResult<
  PartnerResponse,
  Error
> =>
  useQuery<PartnerResponse, Error>({
    queryKey: ['partner'] as QueryKey,
    queryFn: () => getPartnerFn(),
  });
