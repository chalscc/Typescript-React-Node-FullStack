import { MarketersController } from "./controller/MarketersController"
import { OperationsController } from "./controller/OperationsController"

export const Routes = [{
  method: "get",
  route: "/api/operations",
  controller: OperationsController,
  action: "all"
}, {
  method: "post",
  route: "/api/operations",
  controller: OperationsController,
  action: "save"
}, {
  method: "delete",
  route: "/api/operations/:id",
  controller: OperationsController,
  action: "remove"
}, {
  method: "get",
  route: "/api/marketers",
  controller: MarketersController,
  action: "all"
},
]