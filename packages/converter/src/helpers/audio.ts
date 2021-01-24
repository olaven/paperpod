import textToSpeech from "@google-cloud/text-to-speech";
const { Translate } = require('@google-cloud/translate').v2;
import { PollyClient, SynthesizeSpeechCommand, SynthesizeSpeechOutput } from "@aws-sdk/client-polly";

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

export const awsTextToAudio = async (text: string) => {

    const command = new SynthesizeSpeechCommand({
        Text: text,
        OutputFormat: "mp3",
        VoiceId: "Joanna"
    });

    const client = new PollyClient({ region: "eu-north-1" });
    const data = await client.send(command);
    return data.AudioStream
}