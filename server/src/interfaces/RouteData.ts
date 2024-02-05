export interface Route {
  method: string,
  route: string,
  controller: { new(): any },
  action: string
}