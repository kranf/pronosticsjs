import test, { describe, it } from "node:test";
import { DateIterable, fromNormalDate, toNormalDate } from '../src/date.utils.js';
import assert from 'node:assert';

describe('date.utils', () => {
    describe('toNormalString', () => {
        it('should convert date to ddMMyyyy as pmu format', () => {
            const year = '2022';
            const month = '04';
            const monthIndex = Number(month) - 1;
            const dateDay = '02';
            const date = new Date(Number(year), monthIndex, Number(dateDay))
            const normalDate = toNormalDate(date);
            assert.strictEqual(year, normalDate.substring(4))
            assert.strictEqual(month, normalDate.substring(2,4))
            assert.strictEqual(dateDay, normalDate.substring(0,2))
        })
    })

    describe('fromNormalString', () => {
        it('should convert ddMMyyyy to Date', () => {
            const year = 2022;
            const month = 4;
            const monthIndex = Number(month) - 1;
            const dateDay = 2;
            const date = fromNormalDate(`0${dateDay}0${month}${year}`);
            assert.strictEqual(year, date.getFullYear());
            assert.strictEqual(month, date.getMonth()+1);
            assert.strictEqual(dateDay, date.getDate());
        })
    })

    test('fromNormalDate and toNormalDate should be a null operation', () => {
        const normalDate = '23112000';
        const backAndForthDate = toNormalDate(fromNormalDate(normalDate));
        assert.equal(backAndForthDate, normalDate)
    })
    
    describe('DateIterable', () => {
        it('should be iterable through ellipsis operator', () => {
            const startDate = '03032020';
            const endDate = '05032020';
            const dateIterator = new DateIterable(startDate, endDate)
            
            const results = [...dateIterator];
            assert.equal(results[0], startDate)
            assert.equal(results[results.length - 1], endDate)
        });
    })
})