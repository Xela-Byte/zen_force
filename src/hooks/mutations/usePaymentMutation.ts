import {useMutation} from '@tanstack/react-query';
import {initiateSubscriptionFn} from '@/api/payment';

interface InitiateSubscriptionPayload {
  planType: 'basic' | 'premium';
}

interface InitiateSubscriptionResponse {
  clientSecret: string;
}

export const useInitiateSubscriptionMutation = () => {
  return useMutation<
    InitiateSubscriptionResponse,
    Error,
    InitiateSubscriptionPayload
  >({
    mutationFn: initiateSubscriptionFn,
  });
};
