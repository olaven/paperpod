import faker from "faker";
import { models } from "..";

//FIXME: separate test utils to separate package. This makes it possible to not include it (and its dependencies like faker) in production.
export const user = (template: Partial<models.User> = {}): models.User => ({
  id: faker.random.uuid(),
  email: faker.internet.email().toLowerCase(),
  password_hash: faker.random.alpha(),
  ...template,
});

export const credentials = (
  template: Partial<models.UserCredentials> = {}
): models.UserCredentials => ({
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(100),
  ...template,
});

export const article = (
  template: Partial<models.Article> = {}
): models.Article => ({
  id: faker.random.uuid(),
  title: `Article about ${faker.commerce.product()}`,
  description: faker.lorem.paragraph(),
  owner_id: faker.random.uuid(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  text: faker.lorem.paragraphs(15),
  original_url: faker.internet.url(),
  publication_time: faker.date.past(3),
  added_time: faker.date.recent(2),
  storage_uri: faker.internet.url(),
  ...template,
});

export const articleWithoutTextualData = (
  template: Partial<models.ArticleWithoutTextualData> = {}
) => ({
  id: faker.random.uuid(),
  owner_id: faker.random.uuid(),
  text: faker.lorem.paragraphs(),
  title: faker.lorem.sentence(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  description: faker.lorem.paragraph(),
  publication_timestamp: faker.date.past(),
  added_timestamp: faker.date.recent(),
  original_url: faker.internet.url(),
  storage_uri: faker.internet.url(),
});

export const articlePayload = (
  template: Partial<models.ArticlePayload> = {}
): models.ArticlePayload => ({
  link: faker.internet.url(),
  ...template,
});
