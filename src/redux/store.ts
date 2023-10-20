import { api } from '@/services/api'
import { AnyAction, MiddlewareArray, configureStore } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

export interface StoreState {}

const createStore = (): ToolkitStore<
  StoreState,
  AnyAction,
  MiddlewareArray<any>
> => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  }) as never
}

const store = createStore()

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export default store
