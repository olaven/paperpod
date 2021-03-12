import {
  PollyClient,
  StartSpeechSynthesisTaskCommand,
} from "@aws-sdk/client-polly";
import {
  ComprehendClient,
  DetectDominantLanguageCommand,
} from "@aws-sdk/client-comprehend";

/**
 * Google Translate has an upper character limit of
 * 5000 characters. This function strips all characters
 * <= 1500 characters.
 * @param text
 */
export const limitCharLength = (text: string) =>
  text.length >= 1500 ? text.substring(0, 1500) : text;

const getLanguage = async (text: string) => {
  const client = new ComprehendClient({ region: "eu-west-1" });

  const command = new DetectDominantLanguageCommand({
    Text: limitCharLength(text),
  });
  const result = await client.send(command);

  const [language] = result.Languages;
  return language.LanguageCode;
};

/*
language codes: https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html
voices: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
*/
export const voiceFromLanguage = (code: string) =>
  ({
    en: "Joanna",
    no: "Liv",
    ar: "Zeina",
    zh: "Zhiyu",
    da: "Naja", //Mads
    nl: "Lotte", //Ruben
    fr: "Léa", //Céline/Celine, Mathieu
    de: "Marlene", //Vicki, Hans
    hi: "Aditi",
    is: "Dóra", // "Karl"
    it: "Carla", //"Bianca", "Giorgio"
    ja: "Mizuki", //"Takumi"
    ko: "Seoyeon",
    pl: "Ewa", // "Maja", "Jacek", "Jan"
    pt: "Camila", // "Vitória", "Ricardo"
    ro: "Carmen",
    ru: "Tatyana", // "Maxim"
    es: "Conchita", // "Lucia", "Enrique"
    sv: "Astrid",
    tr: "Filiz",
    cy: "Gwyneth",
  }[code] || "Joanna"); // defaulting to english

/**
 * Starts conversion to speech in S3
 * TODO: Rename
 * @param text
 */
export const textToAudio = async (text: string) => {
  const language = await getLanguage(text);

  console.log(`Detected language: ${language}`);

  const command = new StartSpeechSynthesisTaskCommand({
    Text: text,
    OutputFormat: "mp3",
    VoiceId: voiceFromLanguage(language),
    OutputS3BucketName: "paperpod",
  });

  const client = new PollyClient({ region: "eu-north-1" });
  const data = await client.send(command);
  return data.SynthesisTask.OutputUri;
};
