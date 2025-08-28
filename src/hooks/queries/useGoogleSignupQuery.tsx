import {useMutation} from '@tanstack/react-query';
import {googleSignupFn} from '@/api/google';

export const useGoogleSignupMutation = () =>
  useMutation({
    mutationFn: googleSignupFn,
  });
