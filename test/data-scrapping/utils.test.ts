import { describe, it } from 'node:test';
import { toPmuId } from '../../src/data-scrapping/utils.js';
import assert from 'node:assert';

describe('toPmuId', () => {
    it('should format the proper string', () => {
        const race = { heureDepart: 1234, numOrdre: 3, numReunion: 5, timezoneOffset: 1 };
        const normalDate = '12052022';
        const pmuId = toPmuId(race, normalDate);
        assert.strictEqual(pmuId, `${normalDate}R${race.numReunion}C${race.numOrdre}`)
    });
});