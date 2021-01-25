import { PollyClient, SynthesizeSpeechCommand, DescribeVoicesCommand } from "@aws-sdk/client-polly";
import { ComprehendClient, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";


const getLanguage = async (text: string) => {


    const client = new ComprehendClient({ region: "eu-west-1" });

    const command = new DetectDominantLanguageCommand({
        Text: text
    });
    const result = await client.send(command);

    const [language] = result.Languages;
    return language.LanguageCode
}

const voiceFromLanguage = (code: string) => ({
    "en": "Joanna",
    "no": "Liv"
})[code]

/**
 * Converts given text to audio data of 
 * spoken text and returns a stream of audio data. 
 * @param text 
 */
export const textToAudio = async (text: string) => {

    const language = await getLanguage(text);

    console.log(`Detected language: ${language}`);

    const command = new SynthesizeSpeechCommand({
        Text: text,
        OutputFormat: "mp3",
        VoiceId: voiceFromLanguage(language)
    });

    const client = new PollyClient({ region: "eu-north-1" });


    const data = await client.send(command);
    return data.AudioStream
}