/**
 * This should probably not have its own docker service. 
 * It should be used as a library, and called on article creation. 
 */

//WIP: getting the correct env var here -> TODO 

import dotenv from "dotenv";

dotenv.config();

console.log("This is converter");
console.log("Env for google: ", process.env.GOOGLE_APPLICATION_CREDENTIALS); 