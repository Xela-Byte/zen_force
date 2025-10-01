import ApiClient, {API_URL} from '../apiCliente';

export type QuestionType =
  | 'single-dating'
  | 'couple-unmarried'
  | 'married-couples'
  | 'newly-wed'
  | 'advance-romance-erotica';

export const fetchQuestionRouletteFn = async ({
  questionType,
  personalityTypes,
}: {
  questionType: QuestionType;
  personalityTypes?: string;
}) => {
  try {
    const url = new URL(`${API_URL}/games/question/roulette/${questionType}`);
    if (personalityTypes && personalityTypes.trim().length > 0) {
      url.searchParams.set('personalityTypes', personalityTypes);
    }

    const response = await ApiClient.get(url.toString());

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
      error?.response?.data?.message ||
        `Fetching ${questionType} questions failed`,
    );
  }
};

export const fetchMemoryLaneFn = async (personalityTypes?: string) => {
  try {
    const url = new URL(`${API_URL}/games/memory/lane`);
    if (personalityTypes && personalityTypes.trim().length > 0) {
      url.searchParams.set('personalityTypes', personalityTypes);
    }

    const response = await ApiClient.get(url.toString());

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
      error?.response?.data?.message ||
        `Fetching memeory lane questions failed`,
    );
  }
};

export type ChallengeType =
  | 'conversation-starters'
  | 'who-knows-who-best'
  | 'roleplay-scenarios'
  | 'intimacy-tips-tricks';

export const fetchCoupleChallengeFn = async ({
  challengeType,
}: {
  challengeType: ChallengeType;
}) => {
  try {
    const response = await ApiClient.get(
      `${API_URL}/games/question/couple/challenge/${challengeType}`,
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);

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
      error?.response?.data?.message ||
        `Fetching couple challenge questions failed`,
    );
  }
};
