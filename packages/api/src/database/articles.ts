import { database } from "@paperpod/server";
import { models } from "@paperpod/common";

export const getByOwner = (owner_id: string) =>
  database.rows<models.Article>(
    "SELECT * FROM api.articles WHERE owner_id = $1",
    [owner_id]
  );

export const deleteById = (id: string) =>
  database.first<models.Article>(
    `
      DELETE FROM api.articles WHERE id = $1
      RETURNING *
    `,
    [id]
  );

export const getById = (id: string) =>
  database.first<models.Article>(`SELECT * FROM api.articles where id = $1`, [
    id,
  ]);

export const getByOriginalUrlAndOwner = (
  original_url: string,
  owner_id: string
) =>
  database.rows(
    `
      SELECT * FROM api.articles 
      WHERE original_url = $1 and owner_id = 2
    `,
    [original_url, owner_id]
  );

export const persist = (article: models.Article) =>
  database.first<models.Article>(
    `
      INSERT INTO
      api.articles (owner_id, original_url, title, description, author, text, publication_time, added_time, storage_uri) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `,
    [
      article.owner_id,
      article.original_url,
      article.title,
      article.description,
      article.author,
      article.text,
      article.publication_time,
      article.added_time,
      article.storage_uri,
    ]
  );
