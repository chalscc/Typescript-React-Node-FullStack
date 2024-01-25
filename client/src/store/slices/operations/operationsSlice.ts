import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOperationData } from '../../../interfaces';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    operation: {
      name: '',
      description: '',
      marketer_id: 0,
      client_id: 0,
      type: 'compra',
      amount: 0,
      price: 0,
    } as IOperationData,
    allOperations: [] as IOperationData[],
  },
  reducers: {
    addOperation: (state, action: PayloadAction<IOperationData>) => {      
      state.allOperations.push(action.payload);
    },

    setOperations: (state, action: PayloadAction<IOperationData[]>) => {      
      state.allOperations = action.payload;
    },

    removeOperation: (state, action: PayloadAction<IOperationData>) => {      
      state.allOperations = state.allOperations.filter(operation => operation.name !== action.payload.name);      
    },
  },
})


export const { addOperation, removeOperation, setOperations } = operationsSlice.actions