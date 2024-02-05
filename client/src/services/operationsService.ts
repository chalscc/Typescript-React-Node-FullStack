import http from "../config/http-common";
import { IDeleteResponse, IOperationData } from "../interfaces";
import { AxiosResponse } from 'axios';


const getAll = async (): Promise<IOperationData[] | undefined> => {
  try {
    const response: AxiosResponse = await http.get('/operations');
    const responseData: IOperationData[] = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
};

const addOne = async (operation: IOperationData): Promise<IOperationData | undefined> => {
  try {
    const response: AxiosResponse = await http.post('/operations', operation);
    const responseData: IOperationData = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

const deleteOne = async (id: number): Promise<IDeleteResponse | undefined> => {
  try {
    const response: AxiosResponse = await http.delete(`/operations/${id}`);
    const responseData: IDeleteResponse = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export const OperationsService = {
  getAll,
  addOne,
  deleteOne
};