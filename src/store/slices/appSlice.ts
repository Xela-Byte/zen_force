import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import validateObject from '../../hooks/helpers/useObjectValidation';

export interface AppUser {
  _id: string;
  email: string;
  accessToken: string;
  interests?: string[];
  profileStatus?: string;
  userId?: string;
  age?: number;
  fullName?: string;
  gender?: string;
  personalityInsight?: string;
  inviteCode?: string;
}

export interface UserProfile {
  _id: string;
  accessToken: string;
  userId?: string;
  email: string;
  userInfo: {
    _id: string;
    interests: string[];
    answeredQuestions: string[];
    profileStatus: string;
    userId: string;
    linkedPartner: string;
    inviteCode: string;
    createdAt: string;
    updatedAt: string;
    age: number;
    fullName: string;
    gender: string;
    personalityInsight: string;
    loveLanguage: string;
    relationshipDesire: string;
    relationshipDuration: string;
    relationshipGoal: string;
    relationshipStage: string;
    profileImage: string;
  };
}

export interface VettingData {
  fullName?: string;
  age?: number;
  gender?: string;
  personalityInsight?: string;
  interest?: string[];
  relationshipStage?: string;
  relationshipDuration?: string;
  relationshipDesire?: string;
  loveLanguage?: string;
  relationshipGoal?: string;
  hereWith?: 'with-partner' | 'by-myself' | string;
  profileImage?: any;
}

const stepOneFields: (keyof VettingData)[] = [
  'fullName',
  'age',
  'gender',
  'personalityInsight',
];

const stepTwoFields: (keyof VettingData)[] = ['interest'];

const stepThreeFields: (keyof VettingData)[] = [
  'relationshipStage',
  'relationshipDuration',
  'relationshipDesire',
  'loveLanguage',
];

const stepFourFields: (keyof VettingData)[] = ['relationshipGoal'];

const steps = [stepOneFields, stepTwoFields, stepThreeFields, stepFourFields];

export const useCurrentStep = (vettingData: VettingData | null): number => {
  if (!vettingData) return 0;

  for (let i = 0; i < steps.length; i++) {
    const isStepValid = validateObject(steps[i], vettingData);
    if (!isStepValid) return i;
  }

  return steps.length; // If all steps are complete, return the last step
};

export interface AppState {
  user: UserProfile | null;
  tempUser: AppUser | null;
  isNewInstall: boolean;
  isLoggedIn: boolean;
  vettingData: VettingData | null;
  currentVettingStep: number;
}

const initialState: AppState = {
  user: null,
  isNewInstall: true,
  isLoggedIn: false,
  tempUser: null,
  vettingData: null,
  currentVettingStep: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setTempUser: (state, action: PayloadAction<AppUser | null>) => {
      if (action.payload) {
        state.tempUser = {...state.tempUser, ...action.payload};
      } else {
        state.tempUser = null;
      }
    },
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
    },
    markInstalled: state => {
      state.isNewInstall = false;
    },
    setVettingData: (
      state,
      action: PayloadAction<Partial<VettingData> | null>,
    ) => {
      state.vettingData = {...state.vettingData, ...action.payload};
    },
    setCurrentVettingStep: (state, action) => {
      state.currentVettingStep = action.payload;
    },
    resetVetting: state => {
      state.currentVettingStep = 0;
      state.vettingData = null;
    },
  },
});

export const {
  setUser,
  setTempUser,
  logout,
  markInstalled,
  setVettingData,
  setCurrentVettingStep,
  resetVetting,
} = appSlice.actions;

export default appSlice.reducer;
