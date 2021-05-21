import { bearer } from "./bearer";

export const fetchFile = (article_id: string, token: string) =>
  fetch(`/api/files/${article_id}`, bearer(token));
