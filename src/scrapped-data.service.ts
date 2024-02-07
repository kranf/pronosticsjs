import { Db, Document, ObjectId } from "mongodb";

const PROGRAM_COLLECTION_NAME = 'program';

export class ScrappedDataService {
    private readonly programCollection;
    constructor(private readonly db: Db) {
        this.programCollection = db.collection(PROGRAM_COLLECTION_NAME);
    }

    public async saveProgram(programDoc: Document, programNormalDate: string): Promise<ObjectId> {
        programDoc.normalDate = programNormalDate;
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
}