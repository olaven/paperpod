import stream from "stream";
import faker from "faker";
import { models } from "@paperpod/common";
import { getRSSFeed as _getRSSFeed } from "@paperpod/converter";

export const withStorageUri = async (
  article: models.Article
): Promise<models.Article> => ({
  ...article,
  storage_uri: faker.internet.url(),
});

export const getAudioStream = async () => stream.Readable.from([]);

export const withTextualData = async (
  article: models.Article
): Promise<models.Article> => {
  return {
    ...article,
    text: faker.lorem.paragraphs(),
  };
};

//NOTE: not mocking, as this does not call any external API's
export const getRSSFeed = _getRSSFeed;
