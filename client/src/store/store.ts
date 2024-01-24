import { configureStore } from '@reduxjs/toolkit'
import { operationsSlice } from './slices/operations/operationsSlice'
import { marketersSlice } from './slices/marketers/marketersSlice'

export const store = configureStore({
  reducer: {
    operations: operationsSlice.reducer,
    marketers: marketersSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch