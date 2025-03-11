// useFetchCoupleChallengeQuery

import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';
import {ChallengeType, fetchCoupleChallengeFn} from '../../api/games';

interface ChallengeParams {
  challengeType: ChallengeType;
}

interface Question {
  _id: string;
  text: string;
  options: string[];
  questionType: string;
}

interface ChallengeResponse {
  questionsLength: number;
  questions: Question[];
  answeredQuestions: string[];
}

export const useFetchCoupleChallengeQuery = ({
  challengeType,
}: ChallengeParams): UseQueryResult<ChallengeResponse, Error> =>
  useQuery<ChallengeResponse, Error>({
    queryKey: ['challenges', challengeType] as QueryKey,
    queryFn: () => fetchCoupleChallengeFn({challengeType: challengeType}),
  });
