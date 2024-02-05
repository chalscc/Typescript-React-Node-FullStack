import { IMarketersData } from ".";

enum OperationType {
  compra = "compra",
  venta = "venta"
}

export interface IOperationData  {
  id: number,
  name: string,
  description: string,  
  marketer: IMarketersData,
  client: IMarketersData,  
  type: OperationType,
  amount: number,
  price: number,  
}