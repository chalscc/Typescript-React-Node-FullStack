import http from "../config/http-common";
import { IMarketersData } from "../features/marketers/types/MarketersData";
import { AxiosResponse } from 'axios';


const getAll = async () => {
  try {
    const response: AxiosResponse = await http.get('/marketers');
    const responseData: IMarketersData[] = response.data;

    return responseData;
  } catch (error) {
    console.error(error);
  }
};

const MarketersService = {
  getAll,
};

export default MarketersService;