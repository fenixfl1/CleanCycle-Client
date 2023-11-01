import { Format } from '@/constants/types'

export interface MetadataInterface {
  page: number
  page_size: number
  total: number
}

export interface ApiResponse<T> {
  response: {
    data: T
    message: string
    metadata: MetadataInterface
    error: unknown
    rowCount: number
  }
}

export interface Formatter {
  value: string
  format: Format
  prefix?: string
}

export interface ResponseInterface<T> {
  error: string
  message: string
  data: {
    response: {
      data: T
    }
  }
}
