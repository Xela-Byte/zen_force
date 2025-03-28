import ApiClient, {API_URL} from '@/api/apiCliente';
import {AxiosResponse} from 'axios';

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    _id: string;
    __v: number;
    accessToken: string;
  };
}

interface RegisterPayload {
  email: string;
  password: string;
}

export async function registerFn({
  email,
  password,
}: RegisterPayload): Promise<RegisterResponse> {
  try {
    const response: AxiosResponse<RegisterResponse> = await ApiClient.post(
      `${API_URL}/auth/signup`,
      {
        email,
        password,
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the range 2xx
      console.error('Error response:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something else caused the error
      console.error('Error message:', error.message);
    }

    throw new Error(error?.response?.data?.message || 'Signup failed');
  }
}
