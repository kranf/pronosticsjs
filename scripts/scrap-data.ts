import { MongoClient } from "mongodb";
import { PmuApiClient } from "../src/pmu-api.client.js";
import { ScrappedDataService } from "../src/scrapped-data.service.js";
import { setLogger } from "../src/set-logger.js";
import winston from "winston";
import pMap from "p-map";
import { DateIterable, NormalDate, toNormalDate } from '../src/date.utils.js';

setLogger();

const startDate = process.argv[2]
const endDate = process.argv[3] || toNormalDate(new Date());
const pmuClient = new PmuApiClient();

const dbUri = process.env['MONGODB_URI'] || ''
const dbName = process.env['DB_NAME'] || ''
const dbClient = new MongoClient(dbUri);
const db = dbClient.db(dbName);

const scrappedDataService = new ScrappedDataService(db)

async function scrapData() {
    let _startDate = startDate
    if(!startDate) {
        const latestScrapping = await scrappedDataService.getLatestScrappingDate()
        if (!latestScrapping) {
            winston.error('Latest scrapping date not found')
        }
        winston.debug(`Latest date ${latestScrapping}`)
        _startDate = latestScrapping!
    }
    const dateIterable = new DateIterable(_startDate, endDate)

    return pMap(dateIterable, (date) => scrapProgramOfDay(date), {concurrency: 4})
}

async function scrapProgramOfDay(normalDate: NormalDate) {
    winston.info(`Scrapping program ${normalDate}`)
    const program = await pmuClient.getProgramOfTheDay(normalDate)
    await scrappedDataService.saveProgram(program, normalDate);

    const everyRaces = program.reunions.flatMap((meeting) => meeting.courses)
    await pMap(everyRaces, async (race) => {
        const meetingId = race.numReunion;
        const raceId = race.numOrdre;
        winston.info(`${normalDate} - Meeting ${meetingId} - Race ${raceId} - ${race.libelle}`)
        const participants = pmuClient.getParticipants(normalDate, meetingId, raceId)
        await scrappedDataService.saveParticipants(participants, normalDate, meetingId, raceId)

        const participantsDetails = pmuClient.getDetailedPerf(normalDate, meetingId, raceId)
        await scrappedDataService.saveParticipantsDetailedPerf(participantsDetails, normalDate, meetingId, raceId)
    })
}

scrapData().then(() => process.exit()).catch((err) => {
    dbClient.close()
    winston.error(err);
})
