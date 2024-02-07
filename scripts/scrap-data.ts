import { MongoClient } from "mongodb";
import { PmuApiClient } from "../src/pmu-api.client";
import { ScrappedDataService } from "../src/scrapped-data.service";

const startDate = process.argv[2]
const pmuClient = new PmuApiClient();

const dbUri = process.env['MONGODB_URI'] || ''
const dbName = process.env['DB_NAME'] || ''
const dbClient = new MongoClient(dbUri);
const db = dbClient.db(dbName);

const scrappedDataService = new ScrappedDataService(db)

pmuClient.getProgramOfTheDay(startDate).then((program) => {
    scrappedDataService.saveProgram(program, startDate);
    console.log(scrappedDataService.getProgram(startDate));
    process.exit()
})
