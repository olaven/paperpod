export interface Article {
    _id: string,
    owner_id: string,
    original_url: string,
    title: string,
    description: string,
    author: string,
    text: string,
    publication_timestamp: number,
    added_timestamp: number,
    storage_uri: string,
};