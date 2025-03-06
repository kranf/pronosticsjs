import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { ParticipantService } from '../src/participant.service.js';
import { setLogger } from '../src/set-logger.js';
import winston from 'winston';
import { MongoClient } from 'mongodb';
import { ScrappedDataService } from '../src/scrapped-data.service.js';
import { sanitizeRace } from '../src/data-scrapping/data.sanitizer.js';
import { toPmuId } from '../src/data-scrapping/utils.js';

setLogger();

const dbUri = process.env['MONGODB_URI'] || '';
const dbName = process.env['DB_NAME'] || '';
const dbClient = new MongoClient(dbUri);
const db = dbClient.db(dbName);

const scrappedDataService = new ScrappedDataService(db);

const getDbConnection = async () => {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.DB_NAME,
    });
    return drizzle(connection);
};

const DATE = '27052020'
async function main() {
    // const db = await getDbConnection();
    // const service = new ParticipantService(db);
    const program = await scrappedDataService.getProgram(DATE);
    if(!program) {
        throw new Error('No program found');
    }
    program.reunions.flatMap((reunion) => reunion.courses).forEach((race) => {
        const sanitizedRace = sanitizeRace(race)
        winston.info(`Processing ${toPmuId(sanitizedRace, DATE)}`)
    })
}

main().then(() => {process.exit(0)}).catch((err) => {
    winston.error(err);
    process.exit(1)
});
