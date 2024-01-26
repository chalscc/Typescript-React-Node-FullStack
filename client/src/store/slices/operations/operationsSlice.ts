import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMarketersData, IOperationData } from '../../../interfaces';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    operation: {
      id: 0,
      name: '',
      description: '',
      marketer: {
        id: 0,
        name: '',
      } as IMarketersData,
      client: {
        id: 0,
        name: '',
      } as IMarketersData,
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

    removeOperation: (state, action: PayloadAction<number>) => {
      state.allOperations = state.allOperations.filter(operation => operation.id !== action.payload);
    },
  },
})


export const { addOperation, removeOperation, setOperations } = operationsSlice.actions