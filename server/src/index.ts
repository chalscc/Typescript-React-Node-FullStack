import { Express, Request, Response, NextFunction } from "express";
import * as express from "express"
import * as bodyParser from "body-parser"
import 'dotenv/config'

import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Marketers } from "./entity/Marketers"
import { Route } from "./interfaces/RouteData"

AppDataSource.initialize().then(async () => {

  // create express app
  const app: Express = express();
  const cors = require("cors");
  require('dotenv').config()

  app.use(bodyParser.json())
  app.use(cors());

  // register express routes from defined application routes
  Routes.forEach((route: Route) => {
    app[route.method as keyof Express](route.route, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ControllerClass = route.controller;
        const controllerInstance = new ControllerClass();

        const result = await controllerInstance[route.action](req, res, next);

        if (result !== null && result !== undefined) {
          if (result instanceof Promise) {
            res.send(await result);
          } else {
            res.json(result);
          }
        } else {
          next();
        }
      } catch (error) {
        next(error);
      }
    });
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
