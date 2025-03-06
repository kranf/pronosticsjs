import { z } from 'zod';

const raceSchema = z.object({
    numReunion: z.number(),
    numOrdre: z.number(),
    heureDepart: z.number(),
    timezoneOffset: z.number(),
});

export type RawRace = z.infer<typeof raceSchema>;
export function sanitizeRace(document: unknown): RawRace {
    return raceSchema.parse(document);
}
