import {AxiosResponse} from 'axios';
import ApiClient, {API_URL} from '../../apiCliente';
import {UserProfile} from '@/store/slices/appSlice';

interface LoginResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

interface LoginPayload {
  email: string;
  password: string;
}

export async function loginFn({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await ApiClient.post(
      `${API_URL}/auth/signin`,
      {
        email,
        password,
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
