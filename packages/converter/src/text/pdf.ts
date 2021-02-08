import { models } from '@paperpod/common';
import pdf from "pdf-parse";

export const extractTextFromPDF =
    async (article: models.ArticleWithoutTextualData): Promise<models.Article> => {

        const buffer = null; //TODO :Get buffer 
        const textualData = await getTextFromPdfStream(buffer);
        return {
            ...article,
            ...textualData,
        };
    }


type TextualData = {
    text: string,
    publication_timestamp: number,
    title: string,
    author: string,
}
export const getTextFromPdfStream = async (stream: Buffer): Promise<TextualData> => {

    const data = await pdf(stream);

    const { Title, CreationDate, Author } = data.info;
    const { text } = data;


    const publication_timestamp = parseDate(CreationDate);

    return {
        text,
        publication_timestamp,
        title: Title,
        author: Author,
    };
}

//NOTE: adapted from: https://github.com/mozilla/pdf.js/blob/1de1ae0be6849911430e087decb744936ac56366/src/scripting_api/doc.js#L150-L175
export const parseDate = (date: string) => {

    date = date.substring(2);
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(8, 10);
    const minute = date.substring(10, 12);
    const o = date.charAt(12);

    let second, offsetPos;

    if (o === "Z" || o === "+" || o === "-") {
        second = "00";
        offsetPos = 12;
    } else {
        second = date.substring(12, 14);
        offsetPos = 14;
    }
    //@ts-ignore
    const offset = date.substring(offsetPos).replace(/'/g, "");
    return new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`
    ).getTime();
}