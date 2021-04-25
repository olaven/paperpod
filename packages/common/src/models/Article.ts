export interface Article {
  id: string;
  owner_id: string;
  original_url: string;
  title: string;
  description: string;
  author: string;
  text: string;
  publication_time: Date;
  added_time: Date;
  storage_uri: string;
}
