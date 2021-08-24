import { serialize, tag, declaration } from "serialize-xml";
import { models, constants } from "@paperpod/common";

export const convertToRSSFeed = (articles: models.Article[]) =>
  serialize(
    declaration([
      ["version", "1.0"],
      ["encoding", "UTF-8"],
    ]),
    tag(
      "rss",
      [
        tag("channel", [
          tag("title", "Paperpod Feed"),
          tag("link", constants.APPLICATION_URL()),
          tag(
            "description",
            "This is your Paperpod Feed. Thanks for using Paperpod! Send articles, and they will appear here"
          ),
          tag("ttl", "60"), //60 minutes
          toImageTag(),
          ...articles.map(toItemTag),
        ]),
      ],
      [
        ["version", "2.0"],
        ["xmlns:itunes", "http://www.itunes.com/dtds/podcast-1.0.dtd"],
        ["xmlns:content", "http://purl.org/rss/1.0/modules/content/"],
      ]
    )
  );

export const toImageTag = () =>
  tag("image", [
    tag("url", `${constants.APPLICATION_URL()}/podcast_cover.png`), //TODO: image that's friendly for podcast players
    tag("link", constants.APPLICATION_URL()),
    tag("title", "Paperpod Feed"),
  ]);

export const toItemTag = (article: models.Article) =>
  tag("item", [
    tag("title", `${article.title}`),
    tag("link", `${constants.APPLICATION_URL()}/api/files/${article.id}`),
    tag("description", article.description || "TODO: default description"),
    tag("itunes:summary", article.description || "TODO: default description"),
    tag("guid", `${article.id}`, [["isPermaLink", "false"]]),
    tag("pubDate", new Date(article.added_time).toUTCString()), //compatible with RFC822
    /*omitting author, as it has to be an email and is optional. 
    tag("author", article.author || "Unspecified Author"),*/
    tag("enclosure", "", [
      ["url", `${constants.APPLICATION_URL()}/api/files/${article.id}`],
      ["length", "10"], //FIXME: actual length
      ["type", "audio/mpeg3"],
    ]),
  ]);
