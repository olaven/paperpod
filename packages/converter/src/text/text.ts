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

    const response = await filterResponse(get(article.original_url));

    //FIXME: fugly
    const pdfHeader =
        response.headers.get("Content-Type") === "application/pdf" ||
        response.headers.get("content-type") === "application/pdf" ||
        response.headers.get("content-type")?.includes("application/pdf") ||
        response.headers.get("Content-Type")?.includes("application/pdf");

    return pdfHeader;
}


/**
 * Finds textual data for the given article and 
 * converts a complete article with textual data 
 * applied. 
 * 
 * @param article article without textual data 
 * @returns the article, with textual data
 */
export const withTextualData = async (article: models.ArticleWithoutTextualData) =>
    (await looksLikePdf(article)) ?
        extractTextFromPDF(article) :
        extractTextFromWeb(article);
