import { extractTextFromWeb } from "./web";
import { models } from "@paperpod/common";

const looksLikePdf = (article: models.Article) => false;

const convertPdf = (article: models.Article) => { throw "NOT IMPLEMENTED" }

export const withTextualData = (article: models.ArticleWithoutTextualData) =>
    looksLikePdf(article) ?
        convertPdf(article) :
        extractTextFromWeb(article);
