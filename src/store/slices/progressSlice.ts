import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ProgressState {
  questionRouletteCompleted: Record<string, boolean>; // key: questionType
  challengesCompleted: Record<string, boolean>; // key: challengeType
  aiSessionsCount: number;
}

const initialState: ProgressState = {
  questionRouletteCompleted: {},
  challengesCompleted: {},
  aiSessionsCount: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markQuestionRouletteCompleted: (state, action: PayloadAction<string>) => {
      state.questionRouletteCompleted[action.payload] = true;
    },
    markChallengeCompleted: (state, action: PayloadAction<string>) => {
      state.challengesCompleted[action.payload] = true;
    },
    incrementAISession: state => {
      state.aiSessionsCount += 1;
    },
    resetProgress: () => initialState,
  },
});

export const {
  markQuestionRouletteCompleted,
  markChallengeCompleted,
  incrementAISession,
  resetProgress,
} = progressSlice.actions;

export default progressSlice.reducer;
