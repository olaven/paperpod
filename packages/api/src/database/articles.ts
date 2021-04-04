import { first, rows } from "klart";
import { models } from "@paperpod/common";

export const getByOwner = (owner_id: string) =>
  rows<models.Article>("SELECT * FROM api.articles WHERE owner_id = $1", [
    owner_id,
  ]);

export const deleteById = (id) =>
  first<models.Article>(
    `
      SELECT * FROM api.articles WHERE id = $1
      RETURNING *
    `,
    [id]
  );

export const getById = (id: string) =>
  first<models.Article>(`SELECT * FROM api.articles where id = $1`, [id]);

export const getByOriginalUrlAndOwner = (
  original_url: string,
  owner_id: string
) =>
  rows(
    `
      SELECT * FROM api.articles 
      WHERE original_url = $1 and owner_id = 2
    `,
    [original_url, owner_id]
  );

export const persist = (article: models.Article) =>
  first<models.Article>(
    `
      INSERT INTO
      api.articles (owner_id, original_url, title, description, author, text, publication_timestamp, added_timestamp, storage_uri) 
      VALUES ($1,$2,$3,$4,$5,$6,($7)::timestamptz,($8)::timestamptz,$9)
      RETURNING *
    `,
    [
      article.owner_id,
      article.original_url,
      article.title,
      article.description,
      article.author,
      article.text,
      new Date(article.publication_timestamp),
      new Date(article.added_timestamp),
      article.storage_uri,
    ]
  );
