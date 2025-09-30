import React, {useEffect} from 'react';
import {subscribeToSubscriptionEvents} from '@/utils/sse';

export default function SubscriptionListener({token}: {token: string}) {
  useEffect(() => {
    if (!token) return;
    const unsubscribe = subscribeToSubscriptionEvents(token);
    return () => unsubscribe();
  }, [token]);

  return null;
}
