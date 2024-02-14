import {
  WEB_API_PATH_FOLLOW_USER,
  WEB_API_PATH_GET_USER,
  WEB_API_PATH_LOGIN,
  WEB_API_PATH_REGISTER_USER,
  WEB_API_PATH_UNFOLLOW_USER,
  WEB_API_PATH_VALIDATE_EMAIL,
  WEB_API_PATH_VALIDATE_USERNAME,
} from '@/constants/routes';
import { ApiResponse } from '@/interfaces/general';
import { SessionPayload, User } from '@/redux/slices/userSlice';
import { api } from '@/services/api';

type LoginPayload = {
  username: string;
  password: string;
};

export const authApiHelper = api.injectEndpoints({
  endpoints: (build) => ({
    authenticate: build.mutation<SessionPayload, LoginPayload>({
      query: (payload) => ({
        url: WEB_API_PATH_LOGIN,
        method: 'POST',
        data: { ...payload },
      }),
      invalidatesTags: [{ type: 'user' as never, id: 'user' }],
    }),
    registerUser: build.mutation<SessionPayload, User>({
      query: (payload) => ({
        url: WEB_API_PATH_REGISTER_USER,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    validateEmail: build.mutation<string, { EMAIL: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_VALIDATE_EMAIL,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    validateUsername: build.mutation<string, { USERNAME: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_VALIDATE_USERNAME,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getUser: build.query<User, string>({
      query: (username) => ({
        url: `${WEB_API_PATH_GET_USER}/${username}`,
        method: 'GET',
      }),
    }),
    followUser: build.mutation<string, { USERNAME: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_FOLLOW_USER,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    unfollowUser: build.mutation<string, { USERNAME: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_UNFOLLOW_USER,
        method: 'POST',
        data: { ...payload },
      }),
    }),
  }),
});

export const {
  useAuthenticateMutation: useAuthenticateUser,
  useRegisterUserMutation: useRegisterUser,
  useValidateEmailMutation: useValidateEmail,
  useValidateUsernameMutation: useValidateUsername,
  useGetUserQuery: useGetUser,
} = authApiHelper;
