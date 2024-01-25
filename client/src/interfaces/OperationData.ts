import { IMarketersData } from ".";

export interface IOperationData  {
  id: number,
  name: string,
  description: string,  
  marketer: IMarketersData,
  client: IMarketersData,  
  type: "compra" | "venta",
  amount: number,
  price: number,  
}