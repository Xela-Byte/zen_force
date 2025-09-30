import {useMutation} from '@tanstack/react-query';
import {cancelSubscription} from '@/api/subscription/cancel';
import {useAppDispatch} from '@/hooks/helpers/useRedux';
import {setUser} from '@/store/slices/appSlice';
import useToast from '@/hooks/helpers/useToast';
import {store} from '@/store/index';

export const useCancelSubscriptionMutation = () => {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: data => {
      console.log('Cancel subscription success:', data);

      // Update user data in Redux store with the new subscription status
      if (data.success && data.data.subscription) {
        // Get current user from store
        const currentUser = store.getState().app.user;
        console.log('Current user before update:', currentUser);

        if (currentUser) {
          // Update only the subscription data in userInfo
          const updatedSubscription = {
            tier: data.data.subscription.subscriptionTier,
            status: data.data.subscription.subscriptionStatus,
            isSubscribed: data.data.subscription.isSubscribed,
            expired: data.data.subscription.subscriptionExpiryDate
              ? new Date(data.data.subscription.subscriptionExpiryDate) <
                new Date()
              : true,
            expiryDate: data.data.subscription.subscriptionExpiryDate,
          };

          const updatedUser = {
            ...currentUser,
            userInfo: {
              ...currentUser.userInfo,
              subscription: updatedSubscription,
            },
          };

          console.log('Updated subscription only:', updatedSubscription);
          console.log('Updated user (preserving all other data):', updatedUser);

          // Update the user in the store
          dispatch(setUser(updatedUser));
        }

        // Show success toast
        showToast({
          text1: 'Subscription Cancelled',
          text2: 'Your subscription has been cancelled successfully.',
          type: 'success',
        });
      }
    },
    onError: (error: any) => {
      console.error('Cancel subscription failed:', error);

      // Show error toast
      showToast({
        text1: 'Cancellation Failed',
        text2:
          error.message || 'Failed to cancel subscription. Please try again.',
        type: 'error',
      });
    },
  });
};
