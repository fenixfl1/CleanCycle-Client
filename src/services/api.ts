import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { BASE_WEB_API_URL } from '@/constants/routes'
import { ApiResponse, ResponseInterface } from '@/interfaces/general'
import assert from '@/helpers/assert'

interface BaseQueryWithRetryArgs {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}

export const axiosApi = axios.create({
  baseURL: BASE_WEB_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosBaseQuery =
  (): BaseQueryFn<BaseQueryWithRetryArgs> =>
  async ({ url, method, data, params }) => {
    try {
      const {
        data: { response, metadata },
      } = await axiosApi.request({ url, method, data, params })

      return { data: { response, metadata } } as any
    } catch (error) {
      assert<AxiosError>(error)
      return {
        error: {
          status: error?.response?.status,
          data: error?.response?.data ?? error.message,
        },
      }
    }
  }

export const api = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'api',
  refetchOnFocus: true,
  keepUnusedDataFor: 60 * 60 * 1000,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === 'REHYDRATE') {
      return action.payload[reducerPath]
    }
  },
})

export const enhancedApi = api.enhanceEndpoints({})

export async function postRequest<RType, PType = any>(
  url: string,
  data: PType,
  config?: AxiosRequestConfig,
): Promise<ResponseInterface<RType>> {
  return axiosApi.post(url, data, { ...config })
}

export async function getRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return axiosApi.get(url, { ...config })
}

export async function putRequest<RType, PType = any>(
  url: string,
  data: PType,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<RType>> {
  return axiosApi.put(url, data, { ...config })
}
