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
export const articleToRSSItem = (article: models.Article) => {

  const xml = serialize(
    tag("rss", [
      tag("channel", [
        tag("title", "Paperpod Feed"),
        tag("link", "LINK TO FEED"),
        tag("description", "This is your Paperpod Feed. Thanks for using Paperpod! Send articles, and they will appear here"),
        tag("ttl", "60"), //60 minutes
        tag("image", [
          tag("url", "https://paperpod.fm/logo.svg"), //TODO: image that's friendly for podcast players 
          tag("link", "LINK TO FEED"),
          tag("title", "Paperpod Feed")
        ])]
        //TODO: items (should be done here, what's implemented above should be done somewhere with access to all articles)
      )],
      [["version", "2.0"]]
    ))
}