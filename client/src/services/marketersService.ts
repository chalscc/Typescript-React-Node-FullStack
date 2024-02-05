import http from "../config/http-common";
import { IMarketersData } from "../interfaces";
import { AxiosResponse } from 'axios';


const getAll = async (): Promise<IMarketersData[] | undefined> => {
  try {
    const response: AxiosResponse = await http.get('/marketers');
    const responseData: IMarketersData[] = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const MarketersService = {
  getAll,
};