import faker from "faker";
import { models } from "..";

//FIXME: separate test utils to separate package. This makes it possible to not include it (and its dependencies like faker) in production.
export const user = (): models.User => ({
    _id: faker.random.uuid(),
    email: faker.internet.email(),
    password_hash: faker.random.alpha(),
});

export const credentials = (): models.UserCredentials => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
});

export const article = (): models.Article => ({
    title: faker.hacker.phrase(),
    original_url: faker.internet.url(),
    text: faker.lorem.paragraphs(15),
    owner_id: faker.random.uuid(),
});

export const articlePayload = (): models.ArticlePayload => ({
    link: faker.internet.url()
}); 