const config = require("../../jest.config");
const mongodb = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
    ...config,
    ...mongodb,
};