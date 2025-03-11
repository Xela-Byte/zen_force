import {AxiosResponse} from 'axios';
import ApiClient, {API_URL} from '..';

export const fetchUserChats = async () => {
  try {
    const response = await ApiClient.get(`${API_URL}/gemini`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response?.data?.message);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    throw new Error(error?.response?.data?.message || 'Fetching chats failed');
  }
};

interface SendMessagePayload {
  prompt: string;
}

interface SendMessageResponse {}

export async function sendMessageFn({
  prompt,
}: SendMessagePayload): Promise<SendMessageResponse> {
  try {
    const response: AxiosResponse<SendMessageResponse> = await ApiClient.post(
      `${API_URL}/gemini/generate`,
      {
        prompt,
      },
    );

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

    throw new Error(error?.response?.data?.message || 'Login failed');
  }
}
