import { PollyClient, SynthesizeSpeechCommand, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";
import { ComprehendClient, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";
import { server } from "@paperpod/common";


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
 * Starts conversion to speech in S3
 * TODO: Rename 
 * @param text 
 */
export const textToAudio = async (text: string, keyName: string) => {

    const language = await getLanguage(text);

    console.log(`Detected language: ${language}`);

    const command = new StartSpeechSynthesisTaskCommand({
        Text: text,
        OutputFormat: "mp3",
        VoiceId: voiceFromLanguage(language),
        OutputS3BucketName: "paperpod",
        OutputS3KeyPrefix: keyName,
        //OutputS3KeyPrefix
    });

    const client = new PollyClient({ region: "eu-north-1" });
    const data = await client.send(command);
    return data.SynthesisTask.OutputUri
}