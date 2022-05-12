import faker from "faker";

export default class Zombie {
  private doneVisiting: boolean = false;
  constructor(_options) {}
  public visit(_url: string, callback: () => void) {
    this.doneVisiting = true;
    callback();
  }

  public html() {
    if (!this.doneVisiting) {
      throw `Should not have called HTML before done with visit`;
    }

    return `
      <!DOCTYPE html>

        <head>
            <title>${faker.lorem.sentence()}</title>
            <meta name="author" content="${faker.name.firstName()}"/>
        </head>

        <body>
            <p>${faker.lorem.paragraphs()}</p>
            <p>${faker.lorem.paragraphs()}</p>
            <p>${faker.lorem.paragraphs()}</p>
            <p>${faker.lorem.paragraphs()}</p>
            <p>${faker.lorem.paragraphs()}</p>
            <p>${faker.lorem.paragraphs()}</p>
        </body>

      </html>
    `;
  }
}
