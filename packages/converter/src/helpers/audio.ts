import textToSpeech from "@google-cloud/text-to-speech";
//import * as Translate from "@google-cloud/translate"
const { Translate } = require('@google-cloud/translate').v2;

/**
 * Google Translate has an upper character limit of 
 * 5000 characters. This function strips all characters
 * <= 1500 characters. 
 * @param text 
 */
export const applyTranslateLimit = (text: string) =>
    text.length >= 1500 ?
        text.substring(0, 1500) :
        text;

const getLanguage = async (text: string) => {

    console.log("Getting language from text with length", text.length);
    const [detected] = await new Translate()
        .detect(
            applyTranslateLimit(text)
        )
    return detected.language;
}

/**
 * Converts given text to audio data of 
 * spoken text. 
 * @param text 
 */
export const textToAudio = async (text: string) => {

    const client = new textToSpeech.TextToSpeechClient();
    const language = await getLanguage(text);

    console.log(`going forwards with full text of length ${text.length}`);
    const [response] = await client.synthesizeSpeech({
        //        input: { ssml: text },
        input: { text },
        voice: { languageCode: language, ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "MP3", speakingRate: 0.90 },
    });

    return response.audioContent as Uint8Array;
}