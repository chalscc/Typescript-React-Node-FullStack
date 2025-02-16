import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Operations } from "../entity/Operations"
import { Worker } from "worker_threads"

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

    const worker = new Worker("./src/heavyProcess.ts", {
      workerData: 10000
    });

    worker.unref(); // El worker se ejecuta en segundo plano

    worker.on("message", (msg) => {
      console.log("Worker finalizado:", msg);
      // Must save on db that job has finished and then apply polling or websocket on front
      worker.terminate();
    });

    worker.on("error", (err) => console.error("Error en el worker:", err));

    // Luego la busco por que quiero sus relaciones
    return this.operationsRepository.findOne({ where:  {id} , relations: ["marketer", "client"]});
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)

    let operationToRemove = await this.operationsRepository.findOneBy({ id })

    console.log('_______ REMOVING OPERATION _________')

    if (!operationToRemove) {
      return { msg: "this operation does not exist", success: false, id }
    }

    await this.operationsRepository.remove(operationToRemove)

    return { msg: "operation has been removed", success: true, id }
  }

}
