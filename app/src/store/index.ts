import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

const appSlice = createSlice({
  name: 'app',
  initialState: { ready: false as boolean },
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload
    },
  },
})

export const { setReady } = appSlice.actions

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
