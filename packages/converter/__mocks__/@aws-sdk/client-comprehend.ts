export const ComprehendClient = () => ({
    send: () => {
        console.log("inside client-comprehend mock");
        return {
            Languages: [
                "en"
            ]
        }
    }
});

export const DetectDominantLanguageCommand = () => { };