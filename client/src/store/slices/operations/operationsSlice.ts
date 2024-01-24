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
    },

    removeOperation: (state, action: PayloadAction<OperationData>) => {      
      state.allOperations = state.allOperations.filter(operation => operation.name !== action.payload.name);      
    },
  },
})


export const { addOperation, removeOperation } = operationsSlice.actions