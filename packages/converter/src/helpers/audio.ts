import { PollyClient, SynthesizeSpeechCommand, SynthesizeSpeechOutput } from "@aws-sdk/client-polly";

const getLanguage = async (text: string) => {


    //FIXME: RETURN LANGUAGE WITH AWS COMPREHEND
    return ""
}

/**
 * Converts given text to audio data of 
 * spoken text and returns a stream of audio data. 
 * @param text 
 */
export const textToAudio = async (text: string) => {

    const language = await getLanguage(text);

    const command = new SynthesizeSpeechCommand({
        Text: text,
        OutputFormat: "mp3",
        VoiceId: "Joanna" //TODO: choose voice depending on language
    });

    const client = new PollyClient({ region: "eu-north-1" });
    const data = await client.send(command);
    return data.AudioStream
}