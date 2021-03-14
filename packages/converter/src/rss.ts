import { serialize, tag } from "serialize-xml";
import { models, constants } from "@paperpod/common";

export const convertToRSSFeed = (articles: models.Article[]) =>
  serialize(
    tag(
      "rss",
      [
        tag("channel", [
          tag("title", "Paperpod Feed"),
          tag("link", constants.APPLICATION_URL),
          tag("author", "Paperpod by Krets AS"),
          tag(
            "description",
            "This is your Paperpod Feed. Thanks for using Paperpod! Send articles, and they will appear here"
          ),
          tag("ttl", "60"), //60 minutes
          toImageTag(),
          ...articles.map(toItemTag),
        ]),
      ],
      [["version", "2.0"]]
    )
  );

export const toImageTag = () =>
  tag("image", [
    tag("url", `${constants.APPLICATION_URL}/logo.svg`), //TODO: image that's friendly for podcast players
    tag("link", constants.APPLICATION_URL),
    tag("title", "Paperpod Feed"),
  ]);

export const toItemTag = (article: models.Article) =>
  tag("item", [
    tag("title", `${article.title}`),
    tag("link", `${constants.APPLICATION_URL}/api/files/${article.id}`),
    tag("description", article.description || "TODO: default description"),
    tag("guid", `${article.id}`),
    tag("pubDate", new Date(article.added_timestamp).toUTCString()), //compatible with RFC822
    tag("author", article.author || "Unspecified Author"),
    tag("enclosure", "", [
      ["url", `${constants.APPLICATION_URL}/api/files/${article.id}`],
      ["length", "10"], //FIXME: actual length
      ["type", "audio/mpeg"],
    ]),
    /* <enclosure url="http://www.scripting.com/mp3s/weatherReportSuite.mp3" length="12216320" type="audio/mpeg" /> */
  ]);
