import { createAction, createSlice } from '@reduxjs/toolkit'

export interface Comment {
  COMMENT_ID: number
  CONTENT: string
  USERNAME: string
  CREATED_AT: string
  AVATAR: string
}

export interface Post {
  AUTHOR: string
  AVATAR: string
  COMMENTS: number
  CONTENT: string
  CREATED_AT: string
  FRONT_PAGE: string
  LIKED_BY: string[]
  POST_ID: number
  STATE: string
  TITLE: string
}

export interface PostsState {
  posts: Post[]
  comments: Comment[]
}

const initialState: PostsState = {
  posts: [],
  comments: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})

export const postsSelector = (state: { posts: PostsState }) => state.posts

export default postsSlice.reducer
