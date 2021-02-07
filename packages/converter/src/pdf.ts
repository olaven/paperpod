import { models } from '@paperpod/common';
import pdf from "pdf-parse";

export const pdfToArticle = async (stream: Buffer): Promise<Partial<models.Article>> => {

    const data = await pdf(stream);
    const metadata = data.metadata._metadata;
    const { text } = data;

    const title = metadata["dc:title"];
    const author = metadata["dc:creator"];
    const publication_timestamp = new Date(
        metadata["xmp:createdate"]
    ).getTime();

    return {
        text,
        title,
        author,
        publication_timestamp,
    };
}