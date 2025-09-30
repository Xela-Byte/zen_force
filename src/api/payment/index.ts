import {AxiosResponse} from 'axios';
import ApiClient, {API_URL} from '../apiCliente';

interface InitiateSubscriptionResponse {
  clientSecret: string;
}

interface InitiateSubscriptionPayload {
  planType: 'standard' | 'premium' | 'elite';
}

export async function initiateSubscriptionFn({
  planType,
}: InitiateSubscriptionPayload): Promise<InitiateSubscriptionResponse> {
  try {
    const response: AxiosResponse<InitiateSubscriptionResponse> =
      await ApiClient.post(`${API_URL}/subscriptions/initiate`, {
        planType,
      });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the range 2xx
      console.error('Error response:', error.response?.data?.message);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something else caused the error
      console.error('Error message:', error.message);
    }

    throw new Error(
      error?.response?.data?.message || 'Subscription initiation failed',
    );
  }
}
