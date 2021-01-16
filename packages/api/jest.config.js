const typescript = require("ts-jest/jest-preset"); 
const mongodb = require("@shelf/jest-mongodb/jest-preset"); 

module.exports = {
    ...typescript, 
    ...mongodb,

  //  testEnvironment: 'node',
};