import { boolean, int, mysqlTable, serial, tinyint, varchar } from 'drizzle-orm/mysql-core';

const BLINDERS_VALUE_MAX_LENGTH = 50;
const MUSIC_VALUE_MAX_LENGTH = 10;
const HORSE_DISTANCE_VALUE_MAX_LENGTH = 40;

export const participants = mysqlTable('participants', {
    id: serial('id').primaryKey(),
    // raceId:,
    // race:,
    rank: tinyint('rank'),
    // horseId:,
    // horse:,
    age: tinyint('age'),
    // driverName:,
    // driver:,
    driverChange: boolean('driverChange'),
    pmuId: int('pmuId'),
    disadvantageValue: int('disadvantageValue'), // handicapValeur
    disadvantageWeight: int('disadvantageWeight'), // handicapPoids
    disadvantageLength: int('disadvantageLength'), // handicapDistance
    blinders: varchar('blinders', { length: BLINDERS_VALUE_MAX_LENGTH }),
    laneId: tinyint('laneId'),
    music: varchar('music', { length: MUSIC_VALUE_MAX_LENGTH }),
    pregnent: boolean('pregnent'),
    weighedDurationKm: int('weighedDurationKm'),
    priorHorseDistance: varchar('priorHorseDistance', { length: HORSE_DISTANCE_VALUE_MAX_LENGTH }),
    speed: tinyint('speed'),
});

export type Participant = typeof participants.$inferSelect
export type ParticipantInsert = typeof participants.$inferInsert