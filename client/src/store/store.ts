import { configureStore } from '@reduxjs/toolkit'
import { operationsSlice } from './slices/operations/operationsSlice'

export const store = configureStore({
  reducer: {
    operations: operationsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch