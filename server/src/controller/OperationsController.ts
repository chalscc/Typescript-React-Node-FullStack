import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Operations } from "../entity/Operations"

export class OperationsController {

  private operationsRepository = AppDataSource.getRepository(Operations)

  async all(request: Request, response: Response, next: NextFunction) {
    
    return this.operationsRepository.find({ relations: ["marketer", "client"] });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { type, amount, price, marketer, client, name, description } = request.body;

    const operation = Object.assign(new Operations(), {
      type, amount, price, marketer: marketer.id, client: client.id, name, description
    })
    
    // Primero la inserto
    const { id } = await this.operationsRepository.save(operation);

    // Luego la busco por que quiero sus relaciones
    return this.operationsRepository.findOne({ where:  {id} , relations: ["marketer", "client"]});
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)

    let operationToRemove = await this.operationsRepository.findOneBy({ id })

    if (!operationToRemove) {
      return { msg: "this operation does not exist", success: false, id }
    }

    await this.operationsRepository.remove(operationToRemove)

    return { msg: "operation has been removed", success: true, id }
  }

}