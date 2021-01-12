import faker from "faker";
import { models } from "..";

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
    original_url: faker.internet.url(),
    google_cloud_path: faker.internet.url(),
    text: faker.lorem.paragraphs(15),

})