import { NormalDate } from '../date.utils.js';
import { RacePmuId } from '../type.js';
import { RawRace } from './data.sanitizer.js';

export function toPmuId(race: RawRace, normalDate: NormalDate): RacePmuId {
    return `${normalDate}R${race.numReunion}C${race.numOrdre}` as RacePmuId
}