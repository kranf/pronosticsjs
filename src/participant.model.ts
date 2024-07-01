import { boolean, int, mysqlTable, serial, tinyint } from 'drizzle-orm/mysql-core';

export const participants = mysqlTable('participants', {
    id: serial("id").primaryKey(),
    raceId:,
    race:,
    rank: tinyint('rank'),
    horseId:,
    horse:,
    age: tinyint('age'),
    driverName:,
    driver:,
    driverChange: boolean('driverChange'),
    pmuId: int('pmuId'),
    disadvantageValue:,     // handicapValeur
    disadvantageWeight:,    // handicapPoids
    disadvantageLength:,    // handicapDistance
    blinders:,
    laneId:,
    music:,
    pregnent:,
    weighedDurationKm:,
    priorHorseDistance:,
    speed:,
})