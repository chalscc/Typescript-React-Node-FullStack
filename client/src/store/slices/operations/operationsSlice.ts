import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OperationData } from '../../../features/operations/components/form/OperationData';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    operation: {
      name: '',
      description: '',
      isActive: false,
    },
    allOperations: [] as OperationData[],
  },
  reducers: {
    addOperation: (state, action: PayloadAction<OperationData>) => {
      
      state.allOperations.push(action.payload);

      console.log(state.allOperations)
    },
  },
})


export const { addOperation } = operationsSlice.actions