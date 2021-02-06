import faker from "faker";

export default {
    launch: () => ({
        newPage: () => ({
            goto: () => { },
            waitFor: () => { },
            content: () => `
                <!DOCTYPE html>

                <head>
                        <title>${faker.lorem.sentence()}</title>
                        <meta name="author" content="${faker.name.firstName()}"/>
                    </head>

                    <body>
                        <p>${faker.lorem.paragraphs()}</p>
                    </body>

                </html>
            `
        }),
        close: () => { },
    })
};

