import dotenv from "dotenv";
import { models } from "common";
import { textToAudio } from "./audio";
import { upload } from "./upload";


dotenv.config();

/**
 * Converts given text to audio, 
 * uploads it to storage and returns 
 * the updated article 
 */
export const convert =
    async (article: models.Article, user: models.User): Promise<models.Article> => {

        const audio = await textToAudio(article.text);

        const google_cloud_path = `${user._id}/${article.original_url}`
        await upload(audio, "instapod-articles", google_cloud_path);


        return {
            ...article,
            google_cloud_path
        }
    }


(async () => {

    await convert(
        {
            original_url: "https://nrk.no/test",
            text: 'dette er litt tekst som jeg har skrevet som en test heisann.',
        },
        {
            _id: "test-id",
            email: "test@mail.com",
            password_hash: "passord test does not matte here"
        }
    )
})()