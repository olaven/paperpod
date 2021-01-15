import { models } from "@paperpod/common";
import { textToAudio } from "./audio";
import { upload } from "./upload";


/**
 * @requires process.env.GOOGLE_APPLICATION_CREDENTIALS to be defined
 * Converts given text to audio, 
 * uploads it to storage and returns 
 * the updated article 
 */
export const convertToAudio =
    async (article: models.Article, user: models.User): Promise<models.Article> => {

        const audio = await textToAudio(article.text);

        const google_cloud_path = `${user._id}/${article.original_url}`
        await upload(audio, "paperpod-articles", google_cloud_path);

        console.log("Did this work", google_cloud_path)

        return {
            ...article,
            google_cloud_path
        }
    }


//TODO: implement 
export const convertToText = 
    async (article: models.Article): Promise<models.Article> => 
        ({
            ...article, 
            text: "dette er en test-tekst fordi jeg ikke har implementert funksjonaliteten"
        })