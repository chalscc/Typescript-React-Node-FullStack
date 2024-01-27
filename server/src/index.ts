import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Marketers } from "./entity/Marketers"
import 'dotenv/config'

AppDataSource.initialize().then(async () => {

  // create express app
  const app = express()
  const cors = require("cors");
  require('dotenv').config()

  app.use(bodyParser.json())

  app.use(cors());

  // register express routes from defined application routes
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next)
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    })
  })

  const port = process.env.PORT || 3000;
  app.listen(port)

  // Inserto datos de ejemplo
  const marketers = ['Naturgy', 'Endesa', 'Repsol', 'Iberdrola', 'Axpo', 'Cepsa']

  AppDataSource.getRepository(Marketers).count().then(async c => {
    if (c > 0) return;
    console.log('Markers database is empty, inserting data...')
    await AppDataSource.manager.save(
      marketers.map(name => {
        return AppDataSource.manager.create(Marketers, {
          name,
        })
      })
    )

  });

  console.log(`Express server has started on port ${port}. Open http://localhost:3000/api/marketers to see results`)

}).catch(error => console.log(error))
