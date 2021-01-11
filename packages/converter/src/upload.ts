import { Storage } from "@google-cloud/storage";


type BucketName = 'paperpod-articles'



export const upload = async (audio: Uint8Array, bucket: BucketName, filename: string) => {

    new Storage()
        .bucket(bucket)
        .file(filename)
        .save(audio);
    /* const bucket = getBucket("paperpod-articles");
    await bucket.file("test-file").save(audio); */
}