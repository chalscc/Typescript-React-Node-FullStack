import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Marketers } from "../entity/Marketers"

export class MarketersController {

  private marketersRepository = AppDataSource.getRepository(Marketers)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.marketersRepository.find()
  }

}