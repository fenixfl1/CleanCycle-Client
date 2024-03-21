import {
  WEB_API_PATH_ADD_COMMENT_TO_EXCHANGE_ITEM,
  WEB_API_PATH_ADD_EXCHANGE_ITEM_PROPOSAL,
  WEB_API_PATH_CREATE_EXCHANGE_ITEM,
  WEB_API_PATH_CREATE_TAGS,
  WEB_API_PATH_EXCHANGE_ITEM_LIKES,
  WEB_API_PATH_GET_EXCHANGE_ITEM,
  WEB_API_PATH_GET_EXCHANGE_ITEM_COMMENTS,
  WEB_API_PATH_GET_EXCHANGE_ITEM_PROPOSALS,
  WEB_API_PATH_GET_EXCHANGES_ITEMS,
  WEB_API_PATH_GET_TAGS,
  WEB_API_PATH_LIKE_EXCHANGE_ITEM,
  WEB_API_PATH_UPDATE_EXCHANGE_ITEM,
} from '@/constants/routes';
import { api } from './api';
import { ExchangeItem, Likes, Tag } from '@/redux/slices/exchangesSlice';
import { Condition } from '@/interfaces/general';
import { Comment } from '@/redux/slices/postsSlice';

interface LikeExchangeItemPayload {
  EXCHANGE_ITEM_ID: number;
  USERNAME: string;
}

interface AddExchangeItemCommentPayload {
  EXCHANGE_ITEM_ID: number;
  COMMENT: string;
  USERNAME: string;
}

interface ProposalPayload {
  ITEM_ID: number;
  PROPOSAL_ITEM_ID: number;
}

export const exchangesApiHelper = api.injectEndpoints({
  endpoints: (build) => ({
    getExchangeItem: build.query<ExchangeItem, string>({
      query: (payload) => ({
        url: `${WEB_API_PATH_GET_EXCHANGE_ITEM}/${payload}`,
        method: 'GET',
      }),
    }),
    getExchangesItems: build.mutation<ExchangeItem[], Condition<ExchangeItem>>({
      query: (payload) => ({
        url: WEB_API_PATH_GET_EXCHANGES_ITEMS,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    createExchangeItem: build.mutation<ExchangeItem, ExchangeItem>({
      query: (payload) => ({
        url: WEB_API_PATH_CREATE_EXCHANGE_ITEM,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    updateExchangeItem: build.mutation<ExchangeItem, ExchangeItem>({
      query: (payload) => ({
        url: WEB_API_PATH_UPDATE_EXCHANGE_ITEM,
        method: 'PUT',
        data: { ...payload },
      }),
    }),
    getTags: build.query<Tag[], string>({
      query: () => ({
        url: WEB_API_PATH_GET_TAGS,
        method: 'GET',
      }),
    }),
    createTags: build.mutation<string[], string[]>({
      query: (payload) => ({
        url: WEB_API_PATH_CREATE_TAGS,
        method: 'POST',
        data: payload,
      }),
    }),
    addExchangeItemProposal: build.mutation<string, ProposalPayload>({
      query: (payload) => ({
        url: WEB_API_PATH_ADD_EXCHANGE_ITEM_PROPOSAL,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getExchangeItemProposals: build.query<ExchangeItem[], string>({
      query: (payload) => ({
        url: `${WEB_API_PATH_GET_EXCHANGE_ITEM_PROPOSALS}/${payload}`,
        method: 'GET',
      }),
    }),
    updateExchangeItemProposal: build.mutation<
      string,
      { EXCHANGE_ITEM_ID: number }
    >({
      query: (payload) => ({
        url: WEB_API_PATH_ADD_EXCHANGE_ITEM_PROPOSAL,
        method: 'PUT',
        data: { ...payload },
      }),
    }),
    addCommentToExchangeItem: build.mutation<
      string,
      AddExchangeItemCommentPayload
    >({
      query: (payload) => ({
        url: WEB_API_PATH_ADD_COMMENT_TO_EXCHANGE_ITEM,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getExchangeItemComments: build.query<Comment[], string>({
      query: (item_id) => ({
        url: `${WEB_API_PATH_GET_EXCHANGE_ITEM_COMMENTS}/${item_id}`,
        method: 'GET',
      }),
    }),
    likeExchangeItem: build.mutation<string, LikeExchangeItemPayload>({
      query: (payload) => ({
        url: WEB_API_PATH_LIKE_EXCHANGE_ITEM,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getExchangeItemLikes: build.query<Likes, number>({
      query: (item_id) => ({
        url: `${WEB_API_PATH_EXCHANGE_ITEM_LIKES}/${item_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetExchangeItemQuery,
  useGetExchangesItemsMutation,
  useCreateExchangeItemMutation,
  useUpdateExchangeItemMutation,
  useGetTagsQuery,
  useCreateTagsMutation,
  useAddExchangeItemProposalMutation,
  useGetExchangeItemProposalsQuery,
  useUpdateExchangeItemProposalMutation,
  useAddCommentToExchangeItemMutation,
  useGetExchangeItemCommentsQuery,
  useLikeExchangeItemMutation,
  useGetExchangeItemLikesQuery,
} = exchangesApiHelper;
