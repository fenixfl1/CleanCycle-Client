import { createAction, createSlice } from '@reduxjs/toolkit';

export interface Comment {
  COMMENT_ID: number;
  COMMENT: string;
  USERNAME: string;
  CREATED_AT: string;
  AVATAR: string;
  POST_ID: number;
  USER_ID: number;
}

export interface Post {
  ABOUT_AUTHOR: string;
  AUTHOR: string;
  AVATAR: string;
  COMMENTS: number;
  CONTENT: string;
  CREATED_AT: string;
  FRONT_PAGE: string;
  LIKED_BY: string[];
  POST_ID: number;
  PREVIEW_TEXT: string;
  SAVED?: boolean;
  STATE: string;
  TITLE: string;
}

export interface PostsState {
  posts: Post[];
  comments: Comment[];
}

const initialState: PostsState = {
  posts: [],
  comments: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const postsSelector = (state: { posts: PostsState }) => state.posts;

export default postsSlice.reducer;
