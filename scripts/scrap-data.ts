import { PmuApiClient } from "../src/pmu-api.client";

const startDate = process.argv[3]
const pmuClient = new PmuApiClient();

pmuClient.getProgramOfTheDay(startDate).then((program) => {
    console.log(program);
})
