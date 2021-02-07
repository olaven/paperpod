import { extractTextFromWeb } from "./web";
import { models } from "@paperpod/common";

const looksLikePdf = (url: string) => false;

const convertPdf = (url: string) => { throw "NOT IMPLEMENTED" }

export const withTextualData = ({ original_url }: models.ArticleWithoutTextualData) =>
    looksLikePdf(original_url) ?
        convertPdf(original_url) :
        extractTextFromWeb(original_url);
