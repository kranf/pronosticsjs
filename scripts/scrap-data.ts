import { MongoClient } from "mongodb";
import { PmuApiClient } from "../src/pmu-api.client";
import { ScrappedDataService } from "../src/scrapped-data.service";
import { setLogger } from "../src/set-logger";
import winston from "winston";
import pMap from "p-map";

setLogger();

const startDate = process.argv[2]
const pmuClient = new PmuApiClient();

const dbUri = process.env['MONGODB_URI'] || ''
const dbName = process.env['DB_NAME'] || ''
const dbClient = new MongoClient(dbUri);
const db = dbClient.db(dbName);

const scrappedDataService = new ScrappedDataService(db)

async function scrapData() {
    winston.info(`Scrapping program ${startDate}`)
    const program = await pmuClient.getProgramOfTheDay(startDate)
    await scrappedDataService.saveProgram(program, startDate);

    const everyRaces = program.reunions.flatMap((meeting) => meeting.courses)
    pMap(everyRaces, async (race) => {
        const meetingId = race.numReunion;
        const raceId = race.numOrdre;
        winston.info(`${startDate} - Meeting ${meetingId} - Race ${raceId} - ${race.libelle}`)
        const participants = pmuClient.getParticipants(startDate, meetingId, raceId)
        await scrappedDataService.saveParticipants(participants, startDate, meetingId, raceId)

        const participantsDetails = pmuClient.getDetailedPerf(startDate, meetingId, raceId)
        await scrappedDataService.saveParticipantsDetailedPerf(participantsDetails, startDate, meetingId, raceId)
    })
    // await pmuClient.getParticipants(startDate)
    winston.info(await scrappedDataService.getProgram(startDate));
}

scrapData().then(() => process.exit()).catch((err) => {
    winston.error(err);
})
