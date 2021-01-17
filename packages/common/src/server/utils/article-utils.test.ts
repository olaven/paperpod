import { test } from "../.."
import { getFilename, parseFilename } from "./article-utils"

describe("Article utils", () => {

    describe("parsing of filename", () => {

        const getArticleAndUser = () => {

            const user = test.mocks.user();
            const article = {
                ...test.mocks.article(),
                owner_id: user._id
            }

            return { user, article }
        }

        it("Does not throw", () => {

            expect(() => {
                parseFilename("somefilename", test.mocks.user())
            }).not.toThrow();
        });

        it("Does return correct article url and user id", async () => {

            const { article, user } = getArticleAndUser();
            const { original_url, owner_id } = parseFilename(
                getFilename(article),
                user
            );

            expect(original_url).toEqual(article.original_url);
            expect(owner_id).toEqual(user._id);
            expect(owner_id).toEqual(article.owner_id);
        });
    });
});