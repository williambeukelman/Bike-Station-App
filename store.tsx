import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const StationData = createSlice({
  name: 'Station',
  initialState: {
    value: {}
  },
  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  }
})

const RegionData = createSlice({
  name: 'RegionData',
  initialState: {
    value: {}
  },
  reducers: {
    setRegion: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  }
})

export const { set } = StationData.actions
export const { setRegion } = RegionData.actions

export const store = configureStore({
  reducer: {
    Data: StationData.reducer,
    RegionData: RegionData.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

