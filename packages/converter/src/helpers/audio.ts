import textToSpeech from "@google-cloud/text-to-speech";
//import * as Translate from "@google-cloud/translate"
const { Translate } = require('@google-cloud/translate').v2;

const getLanguage = async (text: string) => {


    const [detected] = await new Translate().detect(text)
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

    const [response] = await client.synthesizeSpeech({
        input: { text },
        voice: { languageCode: language, ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "LINEAR16", speakingRate: 0.90 }
    });

    return response.audioContent as Uint8Array;
}