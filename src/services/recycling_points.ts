import {
  WEB_API_PATH_GET_CITIES_INFO_LIST,
  WEB_API_PATH_GET_RECYCLING_POINTS,
  WEB_API_PATH_GET_RECYCLING_POINTS_BY_CITY,
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
    getRecyclingPointsByCity: build.query<RecyclingPoint[], string>({
      query: (city) => ({
        url: `${WEB_API_PATH_GET_RECYCLING_POINTS_BY_CITY}/${city}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetCitiesInfoListMutation,
  useGetRecyclingPointsMutation,
  useGetRecyclingPointsByCityQuery,
} = recyclingPointApiHelper
