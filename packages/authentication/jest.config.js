const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  transform: tsjPreset.transform,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: "@shelf/jest-mongodb"
};