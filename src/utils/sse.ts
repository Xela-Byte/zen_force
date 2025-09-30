import EventSource from 'react-native-sse';
import {API_URL} from '@/api/apiCliente';

export type SubscriptionEventType =
  | 'subscription_created'
  | 'subscription_activated'
  | 'subscription_updated'
  | 'subscription_deleted'
  | 'invoice_payment_succeeded'
  | 'checkout.session.completed';

type BaseEvent = {
  event: SubscriptionEventType;
};

export function subscribeToSubscriptionEvents(token: string) {
  const baseUrl = API_URL;
  if (!baseUrl) {
    console.warn('SSE: Missing API_URL');
    return () => {};
  }

  const es = new EventSource(`${baseUrl}/subscriptions/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  es.addEventListener('open', () => {
    console.log('SSE connection opened');
  });

  es.addEventListener('error', (event: any) => {
    console.warn('SSE error', event?.message || event);
  });

  es.addEventListener('message', (event: any) => {
    try {
      const payload = JSON.parse(event.data);
      console.log('SSE message', payload);
    } catch {
      console.log('SSE message', event.data);
    }
  });

  // Custom event type from server: "subscription" (cast to any to satisfy types)
  es.addEventListener('subscription' as any, (event: any) => {
    try {
      const data: BaseEvent & Record<string, any> = JSON.parse(event.data);
      console.log('SSE subscription event', data);
    } catch (e) {
      console.warn('SSE subscription parse error', e);
    }
  });

  // Directly listen for checkout.session.completed (cast to any to satisfy types)
  es.addEventListener('checkout.session.completed' as any, (event: any) => {
    try {
      const data: BaseEvent & Record<string, any> = JSON.parse(event.data);
      console.log('SSE checkout.session.completed', data);
    } catch (e) {
      console.warn('SSE checkout.session.completed parse error', e);
    }
  });

  return () => {
    es.close();
  };
}
