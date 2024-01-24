import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMarketersData } from '../../../interfaces';

export const marketersSlice = createSlice({
  name: 'operations',
  initialState: {
    allMarketers: [] as IMarketersData[],
  },
  reducers: {
    setMarketers: (state, action: PayloadAction<IMarketersData[]>) => {      
      state.allMarketers = action.payload;
    },
  },
})


export const { setMarketers } = marketersSlice.actions