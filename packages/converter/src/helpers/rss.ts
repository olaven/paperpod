/*


* `<rss version="2.0"></rss>` X
  * `<channel></channel>`
    * `<title></title>`
    * `<link></link>`
    * `<description></description>`
    * `<ttl></ttl>` - hvor lang tid skal det gå før man oppdaterer 
    * `<image></image>`
      * `<url></url>`
      * `<title></title>` (i praksis alltid samme verdi som channel.title)
      * `<link></link>` (i praksis alltid samme verdi som channel.link)
    * `<item></item>` - gjenta for hvert `<item>`. OBS: er ikke childs, men siblings av alt over 
      * `<title></title>` - tittelen for dette elementet  
      * `<link></link>` - linken til innholdet 
      * `<description></description>` - beskrivelsen 
      * `<source url="<SOME_URL>"></source>` - hvilken feed elementet kommer fra 
      * `<guid></guid>` - ID For elementet 
      * `<pubDate></pubDate>` - [format](https://www.ietf.org/rfc/rfc822.txt)
      * `<author></author>` - den som har laget elementet (f.eks artikkel for [[paeprpod]])

*/

import { serialize, tag, declaration } from "serialize-xml";
import { models } from "@paperpod/common";

export const convertToRSSFeed = (articles: models.Article[]) =>
  serialize(
    tag("rss", [
      tag("channel", [
        tag("title", "Paperpod Feed"),
        tag("link", "LINK TO FEED"),
        tag("description", "This is your Paperpod Feed. Thanks for using Paperpod! Send articles, and they will appear here"),
        tag("ttl", "60"), //60 minutes
        toImageTag(),
        ...articles.map(toItemTag)
      ],
      )],
      [["version", "2.0"]]
    ),
  )

export const toImageTag = () =>
  tag("image", [
    tag("url", "https://paperpod.fm/logo.svg"), //TODO: image that's friendly for podcast players 
    tag("link", "LINK TO FEED"),
    tag("title", "Paperpod Feed")
  ]);

export const toItemTag = (article: models.Article) =>
  tag(
    "item",
    [
      tag("title", article.title),
      tag("link", "FIXME: some value herer"),
      tag("description", "FIXME: some value herer"),
      tag("source ", "FIXME: some value herer"),
      tag("guid", "FIXME: some value herer"),
      tag("pubDate", "FIXME: some value herer"),
      tag("author", "FIXME: some value herer"),
    ]
  )