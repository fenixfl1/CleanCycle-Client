import {
  WEB_API_PATH_GET_CITIES_INFO_LIST,
  WEB_API_PATH_GET_RECYCLING_POINTS,
} from '@/constants/routes'
import { Condition } from '@/interfaces/general'
import { City, RecyclingPoint } from '@/redux/slices/recyclingPointsSlice'
import { api } from '@/services/api'

export const recyclingPointApiHelper = api.injectEndpoints({
  endpoints: (build) => ({
    getCitiesInfoList: build.mutation<City[], { CITY: string }>({
      query: (payload) => ({
        url: WEB_API_PATH_GET_CITIES_INFO_LIST,
        method: 'POST',
        data: { ...payload },
      }),
    }),
    getRecyclingPoints: build.mutation<
      RecyclingPoint[],
      Condition<RecyclingPoint>
    >({
      query: (payload) => ({
        url: WEB_API_PATH_GET_RECYCLING_POINTS,
        method: 'POST',
        data: { ...payload },
      }),
    }),
  }),
})

export const { useGetCitiesInfoListMutation, useGetRecyclingPointsMutation } =
  recyclingPointApiHelper
