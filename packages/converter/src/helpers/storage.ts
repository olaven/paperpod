import { models, server } from "@paperpod/common"
import { S3 } from "@aws-sdk/client-s3";

export const getAudioStream = async (article: models.Article) => {

    //NOTE: Extremely hacky way to get the key. Better if I can use URL directly in the `getObject` function below. 
    const key = article.storage_uri.split("paperpod/")[1];

    console.log(`Found key ${key} from URL ${article.storage_uri}`);
    const response = await new S3({ region: "eu-north-1" })
        .getObject({
            Bucket: "paperpod",
            Key: key,
        })


    return response.Body as ReadableStream
}