import { MarketersController } from "./controller/MarketersController"
import { OperationsController } from "./controller/OperationsController"

export const Routes = [{
  method: "get",
  route: "/operations",
  controller: OperationsController,
  action: "all"
}, {
  method: "post",
  route: "/operations",
  controller: OperationsController,
  action: "save"
}, {
  method: "delete",
  route: "/operations/:id",
  controller: OperationsController,
  action: "remove"
}, {
  method: "get",
  route: "/marketers",
  controller: MarketersController,
  action: "all"
},
]