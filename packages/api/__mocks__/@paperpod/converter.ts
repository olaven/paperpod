import faker from "faker"
import { models } from "@paperpod/common";
import { convertToRSS as _convertToRSS } from "@paperpod/converter";


export const triggerSpeechConversion =
    async (article: models.Article): Promise<models.Article> => ({
        ...article,
        storage_uri: faker.internet.url()
    })

export const getAudioStream =
    async () => new ReadableStream()

export const convertToText =
    async (article: models.Article): Promise<models.Article> => {

        return ({
            ...article,
            text: faker.lorem.paragraphs()
        })
    }

//NOTE: not mocking, as this does not call any external API's 
export const convertToRSS = _convertToRSS; 