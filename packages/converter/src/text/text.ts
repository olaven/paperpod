import { models } from "@paperpod/common";
import { extractTextFromWeb } from "./web";
import { extractTextFromPDF } from "./pdf";

const looksLikePdf = (article: models.ArticleWithoutTextualData) =>
    article.original_url.endsWith(".pdf");

export const withTextualData = (article: models.ArticleWithoutTextualData) =>
    looksLikePdf(article) ?
        extractTextFromPDF(article) :
        extractTextFromWeb(article);
