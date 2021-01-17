import { Storage } from "@google-cloud/storage";

type BucketName = 'paperpod-articles'

export const upload = (audio: Uint8Array, bucket: BucketName, filename: string) =>
    new Storage()
        .bucket(bucket)
        .file(filename)
        .save(audio);

//FIXME: see if this can be used to stream data to client, as shown with readstream here: https://stackoverflow.com/questions/13106096/stream-files-in-node-express-to-client
export const downloadStream = (filename: string, bucket: BucketName) =>
    new Storage()
        .bucket(bucket)
        .file(filename)
        .createReadStream();


