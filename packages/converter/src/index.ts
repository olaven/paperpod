import { models, server } from "@paperpod/common";
import { textToAudio } from "./audio";
import { upload } from "./upload";


/**
 * @requires process.env.GOOGLE_APPLICATION_CREDENTIALS to be defined
 * Converts given text to audio, 
 * uploads it to storage and returns 
 * the updated article 
 */
export const convertToAudio =
    async (article: models.Article): Promise<models.Article> => {

        const audio = await textToAudio(article.text);

        const filename = server.utils.article.getFilename(article); 
        await upload(audio, "paperpod-articles", filename);

        return article 
    }


//TODO: implement 
export const convertToText = 
    async (article: models.Article): Promise<models.Article> => 
        ({
            ...article, 
            text: "dette er en test-tekst fordi jeg ikke har implementert funksjonaliteten"
        })