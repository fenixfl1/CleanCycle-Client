import { createAction, createSlice } from '@reduxjs/toolkit'
import RecyclingPoint from '../../pages/recycling_points/[point_id]'

export interface City {
  CANT_RECYCLING_POINTS: number
  CITY_ID: string
  LAT: string
  LNT: string
  NAME: string
}

export interface RecyclingPoint {
  CITY: City
  DESCRIPTION: string
  LATITUDE: string
  LOCATION_ADDRESS: string
  LOCATION_NAME: string
  LONGITUDE: string
  RECYCLE_POINT_ID: number
  STATE: boolean
}

export interface RecyclingPointsState {
  cities: City[]
  recyclingPoints: RecyclingPoint[]
}

const initialState: RecyclingPointsState = {
  cities: [],
  recyclingPoints: [],
}

const recyclingPointsSlice = createSlice({
  name: 'recyclingPoints',
  initialState,
  reducers: {},
})

export const recyclingPointsSelector = (state: {
  recyclingPoints: RecyclingPointsState
}) => state.recyclingPoints
export default recyclingPointsSlice.reducer
