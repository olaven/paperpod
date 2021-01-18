import faker from "faker"
import { models } from "@paperpod/common";



export const convertToAudio =
    async (article: models.Article): Promise<models.Article> => {

        console.log("INSIDE convert to audio mock");
        return article
    }

export const convertToText =
    async (article: models.Article): Promise<models.Article> => {

        console.log("INSIDE convert to text mock");
        return ({
            ...article,
            text: faker.lorem.paragraphs()
        })
    }