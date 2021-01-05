import { Bucket, Storage } from "@google-cloud/storage";

type FileName = `${string}/${string}`
type BucketName = 'instapod-articles'



export const upload = async (audio: Uint8Array, bucket: BucketName, filename: FileName) => {

    new Storage()
        .bucket(bucket)
        .file(filename)
        .save(audio);
    /* const bucket = getBucket("instapod-articles");
    await bucket.file("test-file").save(audio); */
}