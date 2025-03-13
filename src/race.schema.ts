import { date, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

const NAME_VALUE_MAX_LENGTH = 70;

export const race = mysqlTable('race', {
    id:serial('id').primaryKey(),
    meetingId: varchar('meetingId', {length: 2}),
    raceId: varchar('raceId', {length: 2}),
    date: date('date'),
    startDate: date('startDate'),
    name: varchar('name', {length:NAME_VALUE_MAX_LENGTH }),
})

export type Race = typeof race.$inferSelect;
export type RaceInsert = typeof race.$inferInsert;