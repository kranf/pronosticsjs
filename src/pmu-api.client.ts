const BASE_URL = 'https://online.turfinfo.api.pmu.fr/rest/client'
const PROGRM_URL = 'https://online.turfinfo.api.pmu.fr/rest/client/1/programme/{}?meteo=true&specialisation=INTERNET'
const PARTICIPANT_URL = 'https://online.turfinfo.api.pmu.fr/rest/client/1/programme/{}/R{}/C{}/participants?specialisation=INTERNET'
const DETAILED_PERF_URL = 'https://online.turfinfo.api.pmu.fr/rest/client/2/programme/{}/R{}/C{}/performances-detaillees/pretty'

export class PmuApiClient {
    /**
     * 
     * @param date format expected to be ddMMyyyy
     * e.g. 3112020 => 31st december 2020
    */
    public async getProgramOfTheDay(date: string) {
        const url = `${BASE_URL}/1/programme/${date}?meteo=true&specialisation=INTERNET`
        return (await this.fetchBodyAsJson<{programme: unknown}>(url)).programme; 
    }

    private fetchBodyAsJson<T>(url: string): Promise<T> {
        return fetch(url).then((response) => response.json())
    }
}
    