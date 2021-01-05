import { Storage } from "@google-cloud/storage";

type BucketName = 'instapod-articles'

const getBucket = (name: BucketName) => {

    const storage = new Storage();
    return storage.bucket(name);
}

export const upload = async (audio: Uint8Array) => {


    const bucket = getBucket("instapod-articles");
    await bucket.file("test-file").save(audio)
}