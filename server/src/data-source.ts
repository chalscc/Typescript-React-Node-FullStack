import "reflect-metadata"
import { DataSource } from "typeorm"
import { Marketers } from "./entity/Marketers"
import { Operations } from "./entity/Operations"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "test",
    database: "sercomgas",
    synchronize: true,
    logging: false,
    entities: [Marketers, Operations],
    migrations: [],
    subscribers: [],
})
