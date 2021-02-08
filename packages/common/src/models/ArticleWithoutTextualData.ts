export type ArticleWithoutTextualData = {
    text: string, //FIXME: figure out why textual data like title, text anuthor and description is specified here..
    title: string,
    author: string,
    description: string,
    publication_timestamp: number,
    original_url: string,
    _id: string
    owner_id: string
    added_timestamp: number
    storage_uri: string
}