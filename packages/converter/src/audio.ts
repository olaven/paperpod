import textToSpeech from "@google-cloud/text-to-speech";
import * as Translate from "@google-cloud/translate"

const getLanguage = async (text: string) => {

    const [detected] = await new Translate.v2.Translate().detect(
        text
    );

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
        audioConfig: { audioEncoding: "LINEAR16", speakingRate: 0.95 }
    });

    return response.audioContent as Uint8Array;
}