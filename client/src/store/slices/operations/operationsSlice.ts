import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOperationData } from '../../../features/operations/types/OperationData';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    operation: {
      name: '',
      description: '',
      marketer_id: 0,
      client_id: 0,
    },
    allOperations: [] as IOperationData[],
  },
  reducers: {
    addOperation: (state, action: PayloadAction<IOperationData>) => {      
      state.allOperations.push(action.payload);
    },

    removeOperation: (state, action: PayloadAction<IOperationData>) => {      
      state.allOperations = state.allOperations.filter(operation => operation.name !== action.payload.name);      
    },
  },
})


export const { addOperation, removeOperation } = operationsSlice.actions