
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { ParticipantService } from '../src/participant.service.js';
import { setLogger } from '../src/set-logger.js';
import winston from 'winston';

setLogger()

const getDbConnection = async () => {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.DB_NAME,
    });
    return drizzle(connection);
}

async function main() {
    const db  = await getDbConnection();
    const service = new ParticipantService(db);
    const participant = await service.getParticipant('0')
    winston.info(participant)
}

main().catch((err) => {winston.error(err)})