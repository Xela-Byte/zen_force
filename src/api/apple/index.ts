import ApiClient, {API_URL} from '../apiCliente';

export interface AppleAuthPayload {
  identityToken: string;
  user: string;
  email?: string | null;
  fullName?: {
    familyName?: string | null;
    givenName?: string | null;
    middleName?: string | null;
    namePrefix?: string | null;
    nameSuffix?: string | null;
    nickname?: string | null;
  } | null;
}

export async function appleAuthFn(payload: AppleAuthPayload) {
  try {
    const response = await ApiClient.post(`${API_URL}/auth/apple`, payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the range 2xx
      console.error('Apple auth error response:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Apple auth error request:', error.request);
    } else {
      // Something else caused the error
      console.error('Apple auth error message:', error.message);
    }

    throw new Error(
      error?.response?.data?.message || 'Apple authentication failed',
    );
  }
}
