import { extractTextFromWeb } from "./web";
import { ArticleWithoutText } from "./ArticleWithoutText";

const looksLikePdf = (url: string) => false;

const convertPdf = (url: string) => { throw "NOT IMPLEMENTED" }

export const withTextualData = ({ original_url }: ArticleWithoutText) =>
    looksLikePdf(original_url) ?
        convertPdf(original_url) :
        extractTextFromWeb(original_url);
