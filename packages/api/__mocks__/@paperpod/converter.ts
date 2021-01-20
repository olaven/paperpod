import faker from "faker"
import { models } from "@paperpod/common";
import { convertToRSS as _convertToRSS } from "@paperpod/converter";



export const convertToAudio =
    async (article: models.Article): Promise<models.Article> => {

        return article
    }

export const convertToText =
    async (article: models.Article): Promise<models.Article> => {

        return ({
            ...article,
            text: faker.lorem.paragraphs()
        })
    }

//NOTE: not mocking, as this does not call any external API's 
export const convertToRSS = _convertToRSS; 