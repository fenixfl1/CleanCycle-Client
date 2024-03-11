import {
  WEB_API_PATH_CHANGE_PASSWORD,
  WEB_API_PATH_FOLLOW_USER,
  WEB_API_PATH_GET_BLOCKED_USERS,
  WEB_API_PATH_GET_FOLLOW,
  WEB_API_PATH_GET_USER,
  WEB_API_PATH_LOGIN,
  WEB_API_PATH_REGISTER_USER,
  WEB_API_PATH_UNBLOCK_USERS,
  WEB_API_PATH_UNFOLLOW_USER,
  WEB_API_PATH_UPDATE_USER,
  WEB_API_PATH_VALIDATE_EMAIL,
  WEB_API_PATH_VALIDATE_USERNAME,
} from '@/constants/routes';
import { ApiResponse } from '@/interfaces/general';
import { Follow, SessionPayload, User } from '@/redux/slices/userSlice';
import { api } from '@/services/api';

type LoginPayload = {
  username: string;
  password: string;
};

interface ChangePasswordPayload {
  OLD_PASSWORD: string;
  NEW_PASSWORD: string;
}

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
    updateUser: build.mutation<User, Partial<User>>({
      query: (payload) => ({
        url: WEB_API_PATH_UPDATE_USER,
        method: 'PUT',
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
    getFollowers: build.query<Follow, string>({
      query: (username) => ({
        url: `${WEB_API_PATH_GET_FOLLOW}/${username}`,
        method: 'GET',
      }),
    }),
    getBlockedUsers: build.query<User[], string>({
      query: () => ({
        url: WEB_API_PATH_GET_BLOCKED_USERS,
        method: 'GET',
      }),
    }),
    unblockUser: build.mutation<string, { USERNAME: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_UNBLOCK_USERS,
        method: 'PUT',
        data: { ...payload },
      }),
    }),
    changePassword: build.mutation<string, ChangePasswordPayload>({
      query: (payload) => ({
        url: WEB_API_PATH_CHANGE_PASSWORD,
        method: 'PUT',
        data: { ...payload },
      }),
    }),
  }),
});

export const {
  useAuthenticateMutation: useAuthenticateUser,
  useRegisterUserMutation: useRegisterUser,
  useUpdateUserMutation: useUpdateUser,
  useValidateEmailMutation: useValidateEmail,
  useValidateUsernameMutation: useValidateUsername,
  useGetUserQuery: useGetUser,
  useFollowUserMutation: useFollowUser,
  useGetFollowersQuery: useGetFollowers,
  useGetBlockedUsersQuery: useGetBlockedUsers,
  useUnblockUserMutation: useUnblockUser,
  useChangePasswordMutation: useChangePassword,
} = authApiHelper;
