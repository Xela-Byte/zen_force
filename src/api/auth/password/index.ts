// https://zen-force-backend.up.railway.app/auth/profile/new-password

import ApiClient, {API_URL} from '@/api/apiCliente';
import {AxiosResponse} from 'axios';

interface CHangePasswordResponse {
  success: boolean;
  message: string;
}

interface ChangePasswordPayload {
  password: string;
}

export async function changePasswordFn(
  payload: ChangePasswordPayload,
): Promise<CHangePasswordResponse> {
  try {
    const response: AxiosResponse<CHangePasswordResponse> =
      await ApiClient.patch(`${API_URL}/auth/profile/new-password`, payload);

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

    throw new Error(error?.response?.data?.message || 'Change password failed');
  }
}
