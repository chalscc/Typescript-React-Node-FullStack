import http from "../config/http-common";
import { IOperationData } from "../interfaces";
import { AxiosResponse } from 'axios';


const getAll = async () => {
  try {
    const response: AxiosResponse = await http.get('/operations');
    const responseData: IOperationData[] = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
};

const addOne = async (operation: IOperationData) => {
  try {
    const response: AxiosResponse = await http.post('/operations', operation);
    const responseData: IOperationData = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

const MarketersService = {
  getAll,
  addOne
};

export default MarketersService;