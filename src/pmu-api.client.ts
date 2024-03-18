import { Program } from "./data-scrapping/program.model"

const BASE_URL = 'https://online.turfinfo.api.pmu.fr/rest/client'

export class PmuApiClient {
    /**
     * 
     * @param normalDate format expected to be ddMMyyyy
     * e.g. 3112020 => 31st december 2020
    */
    public async getProgramOfTheDay(normalDate: string): Promise<Program> {
        const url = `${BASE_URL}/1/programme/${normalDate}?meteo=true&specialisation=INTERNET`
        return (await this.fetchBodyAsJson<{programme: Program}>(url)).programme; 
    }

    /**
     * Retreives participants of a race identified by 
     * @param normalDate as ddMMyyyy, a @param meetingId and a @param raceId 
     */
    public async getParticipants(normalDate: string,  meetingId: string, raceId: string) {
        const url = `${BASE_URL}/1/programme/${normalDate}/R${meetingId}/C${raceId}/participants?specialisation=INTERNET`
        return this.fetchBodyAsJson<{programme: unknown}>(url); 
    }

    /**
     * Retreives participant last performance including the driver details of a race identified by 
     * @param normalDate as ddMMyyyy, a @param meetingId and a @param raceId 
     */
    public async getDetailedPerf(normalDate: string,  meetingId: string, raceId: string) {
        const url = `${BASE_URL}/2/programme/${normalDate}/R${meetingId}/C${raceId}/performances-detaillees/pretty`
        return this.fetchBodyAsJson<{programme: unknown}>(url); 
    }

    private fetchBodyAsJson<T>(url: string): Promise<T> {
        return fetch(url).then((response) => response.json())
    }
}
