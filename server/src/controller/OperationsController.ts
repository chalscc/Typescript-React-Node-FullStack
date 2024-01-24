import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Operations } from "../entity/Operations"

export class OperationsController {

  private operationsRepository = AppDataSource.getRepository(Operations)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.operationsRepository.find()
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { type, amount, price, marketer_id, client_id } = request.body;

    const operation = Object.assign(new Operations(), {
      type, amount, price, marketer_id, client_id
    })

    return this.operationsRepository.save(operation)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)

    let operationToRemove = await this.operationsRepository.findOneBy({ id })

    if (!operationToRemove) {
      return "this operation does not exist"
    }

    await this.operationsRepository.remove(operationToRemove)

    return "operation has been removed"
  }

}