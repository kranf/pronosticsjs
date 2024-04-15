import { Db, Document, ObjectId } from "mongodb";

const LATEST_SCRAPPING_COLLECTION_NAME = 'latestScrapping'
const PROGRAM_COLLECTION_NAME = 'program';
const PARTICIPANTS_COLLECTION_NAME = 'participants';
const PARTICIPANTS_DETAILED_PERF_COLLECTION_NAME = 'detailed_perf';
const PROGRAM_NORMAL_DATE_PROP = 'normalDate';
const RACE_PMU_ID_PROP = 'racePmuId';

export class ScrappedDataService {
    private readonly latestScrappingCollection;
    private readonly programCollection;
    private readonly participantsCollection;
    private readonly participantsDetailedPerfCollection;

    constructor(private readonly db: Db) {
        this.programCollection = db.collection(PROGRAM_COLLECTION_NAME);
        this.programCollection.createIndex(PROGRAM_NORMAL_DATE_PROP)
        this.participantsCollection = db.collection(PARTICIPANTS_COLLECTION_NAME);
        this.participantsCollection.createIndex(RACE_PMU_ID_PROP)
        this.participantsDetailedPerfCollection = db.collection(PARTICIPANTS_DETAILED_PERF_COLLECTION_NAME);
        this.latestScrappingCollection = db.collection<{latest: string}>(LATEST_SCRAPPING_COLLECTION_NAME);
    }

    public async saveProgram(programDoc: Document, programNormalDate: string): Promise<ObjectId> {
        programDoc[PROGRAM_NORMAL_DATE_PROP] = programNormalDate;
        const result = await this.programCollection.insertOne(programDoc)
        if (result.acknowledged) {
            return result.insertedId
        }
        else {
            throw new Error(`Insert error for program at date ${programNormalDate}`)
        }
    }

    public async getProgram(normalDate: string) {
        return this.programCollection.findOne({normalDate: normalDate})
    }

    public async saveParticipants(participantsDoc: Document, normalDate: string, meetingId: string, raceId: string): Promise<ObjectId> {
        participantsDoc[RACE_PMU_ID_PROP] = buildPmuId(normalDate, meetingId, raceId);
        const result = await this.participantsCollection.insertOne(participantsDoc);
        if (result.acknowledged) {
            return result.insertedId
        }
        else {
            throw new Error(`Insert error for participants of race ${participantsDoc.racePmuId}`)
        }
    }
    
    public async getParticipantsForRace(racePmuId: string) {
        return this.participantsCollection.findOne({[RACE_PMU_ID_PROP]: racePmuId});
    }   

    public async saveParticipantsDetailedPerf(participantsDetailedPerfDoc: Document, normalDate: string, meetingId: string, raceId: string): Promise<ObjectId> {
        participantsDetailedPerfDoc[RACE_PMU_ID_PROP] = buildPmuId(normalDate, meetingId, raceId);
        const result = await this.participantsDetailedPerfCollection.insertOne(participantsDetailedPerfDoc);
        if (result.acknowledged) {
            return result.insertedId
        }
        else {
            throw new Error(`Insert error for participants detailed perf of race ${participantsDetailedPerfDoc.racePmuId}`)
        }
    }
    
    public async getParticipantsDetailedPerfForRace(racePmuId: string) {
        return this.participantsCollection.findOne({[RACE_PMU_ID_PROP]: racePmuId});
    }

    public async setLatestScrappingDate(date: Date) {
        const current = await this.getLatestScrappingDate()
        if(current && current >= date) {
            return;
        }
        return this.latestScrappingCollection.insertOne({latest: date.toISOString()})
    }

    public async getLatestScrappingDate(): Promise<Date|undefined> {
        const results = await this.latestScrappingCollection.find().toArray()
        if (results.length = 0) {
            return;
        }
        return new Date(results[0].latest);
    }
}

function buildPmuId(normalDate: string, meetingId: string, raceId: string): string {
    return `${normalDate}R${meetingId}C${raceId}`
}