import { createSession, removeSession } from '@/lib/session';
import { authApiHelper } from '@/services/user';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface Follow {
  FOLLOWERS: User[];
  FOLLOWINGS: User[];
}

export interface User {
  USER_ID: number;
  USERNAME: string;
  EMAIL: string;
  AVATAR: string;
  IS_SUPERUSER: boolean;
  FULL_NAME: string;
  ABOUT: string;
  CREATED_AT: string;
  POSTS: string[];
  FOLLOWERS: string[];
  FOLLOWING: string[];
  PASSWORD?: string;
}

export interface SessionPayload extends User {
  SESSION_COOKIE: {
    TOKEN: string;
    EXPIRES_IN: string;
  };
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {} as User,
  isAuthenticated: false,
};

export const logout = createAction('auth/logout', function prepare() {
  removeSession();
  return {
    payload: initialState,
  };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.isAuthenticated = false;
      state.user = {} as SessionPayload;
    });
    builder.addMatcher(
      authApiHelper.endpoints.authenticate.matchFulfilled,
      (state, action) => {
        createSession(action.payload);
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    );
    builder.addMatcher(
      authApiHelper.endpoints.registerUser.matchFulfilled,
      (state, action) => {
        createSession(action.payload);
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    );
  },
});

export const userSelector = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
