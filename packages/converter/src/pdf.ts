import { models } from '@paperpod/common';
import pdf from "pdf-parse";

export const pdfToArticle = async (stream: Buffer): Promise<models.Article> => {

    const data = await pdf(stream);
    //@ts-ignore FIXME: Return complete article
    return {
        text: data.text,
    }
}