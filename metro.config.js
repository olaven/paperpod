const path = require("path");

const pathToMobile = path.resolve(__dirname, "packages", "mobile");
const { getDefaultConfig } = require("metro-config");
/**
 * Metro config must be in the root
 * of the project. Ideally, it should
 * be possible to have it in `packages/mobile`.
 *
 * This issue is tracked already.
 * [link to issue](https://github.com/facebook/metro/issues/588)
 */

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    watchFolders: [
      path.resolve(__dirname),
      path.resolve(__dirname, "node_modules", "@paperpod", "frontend"),
      path.resolve(__dirname, "node_modules", "@paperpod", "common"),
    ],
    projectRoot: pathToMobile,
    resolver: {
      // Add cjs extension so stitches will load.
      sourceExts: [...sourceExts, "cjs"],
    },
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
})();
