import { exchangesApiHelper } from '@/services/exchanges';
import { createSlice } from '@reduxjs/toolkit';

export interface Likes {
  LIKES: string[];
  COUNT: number;
}

export interface Tag {
  TAG_ID: number;
  NAME: string;
  DESCRIPTION: string;
}

export interface ExchangeItem {
  EXCHANGE_ITEM_ID: number;
  ITEM_NAME: string;
  DESCRIPTION: string;
  TAGS?: string[];
  ITEM_STATE: number;
  CREATED_BY: string;
  CREATED_AT: string;
  IMAGES: string[];
  AVATAR?: string;
  CONTACT_TYPE: string;
  CONTACT: string;
}

export interface ExchangesState {
  exchangeItems: ExchangeItem[];
  tags: Tag[];
}

const initialState: ExchangesState = {
  exchangeItems: [],
  tags: [],
};

const exchangeSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      exchangesApiHelper.endpoints.getExchangesItems.matchFulfilled,
      (state, { payload }) => {
        state.exchangeItems = payload;
      },
    );
  },
});

export const exchangesSelector = (state: { exchanges: ExchangesState }) =>
  state.exchanges;

export default exchangeSlice.reducer;
