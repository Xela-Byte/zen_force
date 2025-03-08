// https://zen-force-backend.up.railway.app/auth/profile/personal-info

import {AxiosResponse} from 'axios';
import ApiClient, {API_URL, ApiFileClient} from '..';
import {useMutation} from '@tanstack/react-query';

interface PInfoReponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    interests: string[];
    profileStatus: string;
    userId: string;
    age: number;
    fullName: string;
    gender: string;
    personalityInsight: string;
  };
}

interface PInfoPayload {
  fullName: string;
  age: number;
  gender: string;
  personalityInsight: string;
}

interface PInterestPayload {
  interest: string[];
}

interface PRInfoPayload {
  relationshipStage: string;
  relationshipDuration: string;
  relationshipDesire: string;
  loveLanguage: string;
  relationshipGoal: string;
}

export async function profileInfoUpdateFn(
  payload: PInfoPayload,
): Promise<PInfoReponse> {
  try {
    const response: AxiosResponse<PInfoReponse> = await ApiClient.patch(
      `${API_URL}/auth/profile/personal-info`,
      payload,
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

export async function profileInterestUpdateFn(payload: PInterestPayload) {
  try {
    const response = await ApiClient.patch(
      `${API_URL}/auth/profile/interest-info`,
      payload,
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

export async function profileRUpdateFn(payload: PRInfoPayload) {
  try {
    const response = await ApiClient.patch(
      `${API_URL}/auth/profile/relationship-info`,
      payload,
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

    throw new Error(error?.response?.data?.message || 'Profile update failed');
  }
}

export const uploadProfilePicture = async (file: File) => {
  if (!file) throw new Error('No file selected');

  const formData = new FormData();
  formData.append('profile picture', file);

  try {
    const response = await ApiClient.post(
      'https://zen-force-backend.up.railway.app/auth/profile/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
