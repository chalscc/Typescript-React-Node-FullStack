export interface IOperationData  {
  name: string,
  description: string,  
  marketer_id: number,
  client_id: number,  
  type: "compra" | "venta",
  amount: number,
  price: number,  
}