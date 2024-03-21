import { api } from '@/services/api';
import { AnyAction, configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer, { UserState } from './slices/userSlice';
import exchangeReducer, { ExchangesState } from './slices/exchangesSlice';

export interface StoreState {
  user: UserState;
  exchanges: ExchangesState;
}

const createStore = (): ToolkitStore<
  StoreState,
  AnyAction,
  MiddlewareArray<any>
> => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      user: userReducer,
      exchanges: exchangeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  }) as never;
};

const store = createStore();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
