/**
 * This should probably not have its own docker service. 
 * It should be used as a library, and called on article creation. 
 */


import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import dotenv from "dotenv";

dotenv.config();


// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {

    const text = `
        De to siste tingene Magnus Carlsen gjorde i offentigheten i 2019, var først å gå ut på Twitter og kritisere at han ikke ble nominert til Årets navn på Idrettsgallaen, for så å reise til Moskva og vinne to VM-titler i lyn- og hurtigsjakk.
        Han smilte sannsynligvis like mye av det første som det siste. Det å bryte ut av rekkene og offentlig mene man fortjener en nominasjon til Idrettsgallaen mer enn andre tilsier jo at man enten har enorm selvtillit eller et særdeles dårlig taperhjerte. Eller i dette tilfellet sannsynligvis begge deler. Særlig når man vet at støyen det medfører er som pur stillhet å regne sammenlignet med hva som er i vente få dager senere.
        Forskjell på å bli satt i sjakk og i sjakk matt Magnus Carlsen liker åpenbart å være en del av folket, som er de som bestemmer hvem som blir Årets navn i norsk idrett. Så lenge folket er enige med ham. For det Carlsen gjør nå, ved å ha orkestrert avtalen mellom det svenske spillselskapet Kindred og sin egen sjakk-klubb, er å arrangere omkamp i sin strid med hele den norske idrettsmodellen.
    `;

    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'nb-NO', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };


    //@ts-ignore
    const [response] = await client.synthesizeSpeech(request);

    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
}
quickStart();