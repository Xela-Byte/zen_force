import {QueryKey, useQuery} from '@tanstack/react-query';
import {googleSignupFn} from '@/api/google';

export const useGoogleSignupQuery = () =>
  useQuery({
    queryKey: ['googleSignup'] as QueryKey,
    queryFn: () => googleSignupFn(),
  });
