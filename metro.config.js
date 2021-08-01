const path = require("path");

const pathToMobile = path.resolve(__dirname, "packages", "mobile");

/**
 * Metro config must be in the root
 * of the project. Ideally, it should
 * be possible to have it in `packages/mobile`.
 *
 * This issue is tracked already.
 * [link to issue](https://github.com/facebook/metro/issues/588)
 */
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
