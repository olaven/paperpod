import faker from "faker";
import { models } from "..";

//FIXME: separate test utils to separate package. This makes it possible to not include it (and its dependencies like faker) in production.
export const user = (): models.User => ({
    _id: faker.random.uuid(),
    email: faker.internet.email().toLowerCase(),
    password_hash: faker.random.alpha(),
});

export const credentials = (): models.UserCredentials => ({
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
});

export const article = (template: Partial<models.Article> = {}): models.Article => ({
    _id: faker.random.uuid(),
    title: `Article about ${faker.commerce.product()}`,
    description: faker.lorem.paragraph(),
    owner_id: faker.random.uuid(),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    text: faker.lorem.paragraphs(15),
    original_url: faker.internet.url(),
    publication_timestamp: faker.date.past(3).getTime(),
    added_timestamp: faker.date.recent(2).getTime(),
    storage_uri: faker.internet.url(),
    ...template,
});

export const articlePayload = (): models.ArticlePayload => ({
    link: faker.internet.url()
}); 