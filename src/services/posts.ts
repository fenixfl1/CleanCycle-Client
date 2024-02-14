import {
  WEB_API_PATH_GET_POST_LIST,
  WEB_API_PATH_GET_POST_BY_ID,
  WEB_API_PATH_COMMENT_POST,
  WEB_API_PATH_LIKE_POST,
  WEB_API_PATH_CREATE_POST,
  WEB_API_PATH_UPDATE_POST,
  WEB_API_PATH_GET_POSTS,
  WEB_API_PATH_GET_COMMENTS,
  WEB_API_PATH_GET_MY_POST,
  WEB_API_PATH_GET_SAVED_POST,
  WEB_API_PATH_SAVE_POST,
  WEB_API_PATH_BLOCK_AUTHOR,
} from '@/constants/routes';
import { ApiResponse } from '@/interfaces/general';
import { Comment, Post } from '@/redux/slices/postsSlice';
import { api } from '@/services/api';

interface LikePayload {
  POST_ID: string;
  USERNAME: string;
  OPTION: number;
}

export const postApiHelper = api.injectEndpoints({
  endpoints: (build) => ({
    getPostsList: build.query<Post[], string>({
      query: (username = '') => ({
        url: `${WEB_API_PATH_GET_POST_LIST}/${username}`,
        method: 'GET',
      }),
    }),
    getPostById: build.query<Post, number>({
      query: (payload) => ({
        url: `${WEB_API_PATH_GET_POST_BY_ID}/${payload}`,
        method: 'GET',
        data: payload,
      }),
    }),
    likePost: build.mutation<string[], LikePayload>({
      query: (payload) => ({
        url: WEB_API_PATH_LIKE_POST,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    commentPost: build.mutation<string, Partial<Comment>>({
      query: (payload) => ({
        url: WEB_API_PATH_COMMENT_POST,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    createPost: build.mutation<Post, Post>({
      query: (payload) => ({
        url: WEB_API_PATH_CREATE_POST,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    updatePost: build.mutation<Post, Post>({
      query: (payload) => ({
        url: WEB_API_PATH_UPDATE_POST,
        method: 'PUT',
        data: { ...payload },
      }),
    }),
    getPosts: build.mutation<Post[], Record<string, unknown>>({
      query: (payload) => ({
        url: WEB_API_PATH_GET_POSTS,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getPostComments: build.mutation<Comment[], Partial<Comment>>({
      query: (payload) => ({
        url: WEB_API_PATH_GET_COMMENTS,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getMyPosts: build.query<Post[], string>({
      query: () => ({
        url: WEB_API_PATH_GET_MY_POST,
        method: 'GET',
      }),
    }),
    getSavedPosts: build.query<Post[], string>({
      query: () => ({
        url: `${WEB_API_PATH_GET_SAVED_POST}`,
        method: 'GET',
      }),
    }),
    savePosts: build.mutation<string, { POST_ID: number; USERNAME: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_SAVE_POST,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    blockAuthor: build.mutation<
      string,
      { AUTHOR: string; USERNAME: string; REASON: string }
    >({
      query: (payload) => ({
        url: WEB_API_PATH_BLOCK_AUTHOR,
        method: 'POST',
        data: { ...payload },
      }),
    }),
  }),
});

export const {
  useGetPostsListQuery: useGetPostsList,
  useGetPostByIdQuery: useGetPostById,
  useLikePostMutation: useLikePost,
  useCommentPostMutation: useCommentPost,
  useCreatePostMutation: useCreatePost,
  useUpdatePostMutation: useUpdatePost,
  useGetPostsMutation: useGetPosts,
  useGetPostCommentsMutation: useGetPostComments,
  useGetMyPostsQuery: useGetMyPosts,
  useGetSavedPostsQuery: useGetSavedPosts,
  useSavePostsMutation: useSavePosts,
  useBlockAuthorMutation: useBlockAuthor,
} = postApiHelper;
