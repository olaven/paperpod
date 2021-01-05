
import dotenv from "dotenv";
import { textToAudio } from "./audio";
import { upload } from "./upload";


dotenv.config();

/**
 * //TODO: implement 
 * Converts given text to audio, 
 * uploads it to storage and returns URL 
 * to its location. 
 */
export const convert = async (text: string) => {

    const audio = await textToAudio(text);
    const filename = upload(audio);
    console.log("UPLOADED: ", filename);
}


(async () => {

    const response = await convert(`
        De to siste tingene Magnus Carlsen gjorde i offentigheten i 2019, var først å gå ut på Twitter og kritisere at han ikke ble nominert til Årets navn på Idrettsgallaen, for så å reise til Moskva og vinne to VM-titler i lyn- og hurtigsjakk.
        Han smilte sannsynligvis like mye av det første som det siste. Det å bryte ut av rekkene og offentlig mene man fortjener en nominasjon til Idrettsgallaen mer enn andre tilsier jo at man enten har enorm selvtillit eller et særdeles dårlig taperhjerte. Eller i dette tilfellet sannsynligvis begge deler. Særlig når man vet at støyen det medfører er som pur stillhet å regne sammenlignet med hva som er i vente få dager senere.
        Forskjell på å bli satt i sjakk og i sjakk matt Magnus Carlsen liker åpenbart å være en del av folket, som er de som bestemmer hvem som blir Årets navn i norsk idrett. Så lenge folket er enige med ham. For det Carlsen gjør nå, ved å ha orkestrert avtalen mellom det svenske spillselskapet Kindred og sin egen sjakk-klubb, er å arrangere omkamp i sin strid med hele den norske idrettsmodellen.
    `);

})()