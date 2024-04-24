export type NormalDate = string;

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
