export type NormalDate = `${number}`

export function toNormalString(date: Date): NormalDate {
    return `${date.getMonth()}`
}

export function fromNormalString(str: string): Date {
    const search = new RegExp(/(?<day>\d\d)(?<month>\d\d)(?<year>\d\d\d\d)/).exec(str);
    if (! search || search?.length === 0) {
        throw new Error(`${str} is not a well formatted date`)
    }

    const year = Number(search.groups?.year)
    const month = Number(search.groups?.month)-1
    const day = Number(search.groups?.day)

    return new Date(year, month, day) 
}

// export class DateIterator implements Iterator<NormalDate, NormalDate, NormalDate> {
//     private currentDate: Date;
//     constructor(private readonly startDate, private readonly endDate) {
//         this.currentDate = startDate;
//     }

//     next(): IteratorResult<NormalDate, NormalDate> {
//         return {
//             done: false,
//             value: this.currentDate,
//         }
//     }
// }