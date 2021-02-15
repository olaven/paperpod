import faker from "faker";

export const PollyClient = () => ({
    send: () => {
        console.log("inside client-polly mock");
        return {

            SynthesisTask: {
                OutputUri: faker.internet.url()
            }
        }
    }
});

export const StartSpeechSynthesisTaskCommand = () => { };