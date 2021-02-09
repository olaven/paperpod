import "node-fetch";
import { filterResponse, get } from "node-kall";
import { models } from "@paperpod/common";
import { extractTextFromWeb } from "./web";
import { extractTextFromPDF } from "./pdf";

/**
 * Checks if the article looks like a PDF file. 
 * Checks the ending of URL. 
 * 
 * TODO: check the content-type returned by the server as well. 
 * @param article 
 * @returns true if it looks likd PDF, false if not.
 */
const looksLikePdf = async (article: models.ArticleWithoutTextualData) => {

    const endsWithPdf = article.original_url
        .toLowerCase()
        .endsWith(".pdf");

    if (endsWithPdf)
        return true;

    const { headers } = await filterResponse(get(article.original_url));
    return headers.get("Content-Type") === "application/pdf";
}


/**
 * Finds textual data for the given article and 
 * converts a complete article with textual data 
 * applied. 
 * 
 * @param article article without textual data 
 * @returns the article, with textual data
 */
export const withTextualData = (article: models.ArticleWithoutTextualData) =>
    looksLikePdf(article) ?
        extractTextFromPDF(article) :
        extractTextFromWeb(article);
