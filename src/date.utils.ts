export type NormalDate = string;
const ONE_DAY_IN_MS = 86400000; // 24*60*60*1000
export function toNormalDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getFullYear()}`
}

export function fromNormalDate(str: string): Date {
    const search = new RegExp(/(?<day>\d\d)(?<month>\d\d)(?<year>\d\d\d\d)/).exec(str);
    if (! search || search?.length === 0) {
        throw new Error(`${str} is not a well formatted date`)
    }   

    const year = Number(search.groups?.year)
    const month = Number(search.groups?.month)-1
    const day = Number(search.groups?.day)

    return new Date(year, month, day) 
}

export function addOneDay(date: Date): Date {
    return new Date(Date.parse(date.toISOString()) + ONE_DAY_IN_MS)
}

export class DateIterable implements Iterable<NormalDate> {
    constructor(private readonly startDate: NormalDate, private readonly endDate: NormalDate) { }
        [Symbol.iterator]() {
        return new DateIterator(this.startDate, this.endDate);
    }
}

class DateIterator implements Iterator<NormalDate, undefined> {
    private currentDate: Date;
    private readonly endDate: Date;
    constructor(_startDate: NormalDate, _endDate: NormalDate) {
        this.currentDate = fromNormalDate(_startDate);
        this.endDate = fromNormalDate(_endDate);
    }

    next() {
        const done = this.currentDate > this.endDate;
        if (done) {
            return { done, value: undefined }
        }
        const ret = {
            done,
            value: toNormalDate(this.currentDate),
        }
        this.currentDate = addOneDay(this.currentDate);
        return ret;
    }
}