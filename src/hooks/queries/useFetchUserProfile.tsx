// useFetchUserProfileQuery

import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';
import {fetchUserProfile} from '@/api/profile';
import {UserProfile} from '@/store/slices/appSlice';

interface PResponse {
  success: boolean;
  message: string;
  data: UserProfile['userInfo'];
}

export const useFetchUserProfileQuery = (): UseQueryResult<PResponse, Error> =>
  useQuery<PResponse, Error>({
    queryKey: ['userProfile'] as QueryKey,
    queryFn: () => fetchUserProfile(),
  });
