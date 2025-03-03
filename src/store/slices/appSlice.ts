import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppUser {
  _id: string;
  email: string;
  accessToken: string;
}

interface AppState {
  user: AppUser | null;
  isNewInstall: boolean;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  user: null,
  isNewInstall: true,
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
    },
    markInstalled: state => {
      state.isNewInstall = false;
    },
  },
});

export const {setUser, logout, markInstalled} = appSlice.actions;
export default appSlice.reducer;
