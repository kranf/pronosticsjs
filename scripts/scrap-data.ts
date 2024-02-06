import { MongoClient } from "mongodb";
import { PmuApiClient } from "../src/pmu-api.client";

const startDate = process.argv[3]
const pmuClient = new PmuApiClient();

const dbUri = process.env['MONGODB_URI'] || ''
const dbName = process.env['DB_NAME'] || ''
const dbClient = new MongoClient(dbUri);
const db = dbClient.db(dbName);

pmuClient.getProgramOfTheDay(startDate).then((program) => {
    console.log(program);
})
