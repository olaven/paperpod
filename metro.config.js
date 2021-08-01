const path = require("path");

console.log(`Running config from ${__dirname}`);
const pathToMobile = path.resolve(__dirname, "packages", "mobile");
console.log(`Path to mobile is ${pathToMobile}`);

console.log({
  message: "config metadata",
  location: __dirname,
  pathToMobile,
});

module.exports = {
  watchFolders: [path.resolve(__dirname)],
  projectRoot: pathToMobile,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
        assetRegistryPath: pathToMobile,
      },
    }),
  },
};
