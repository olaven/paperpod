const path = require("path");

const extraNodeModules = {};
const blacklistRegexes = [];
const watchFolders = [];
/**
 * NOTE: SHOULD THIS BE METRO CONFIG?
 * https://github.com/MrLoh/metro-with-symlinks/issues/21
 */

const metroVersion = require("metro/package.json").version;
const metroVersionComponents = metroVersion.match(/^(\d+)\.(\d+)\.(\d+)/);
if (
  metroVersionComponents[1] === "0" &&
  parseInt(metroVersionComponents[2], 10) >= 43
) {
  module.exports = {
    resolver: {
      extraNodeModules,
      blacklistRE: require("metro-config/src/defaults/blacklist")(
        blacklistRegexes
      ),
    },
    watchFolders,
  };
} else {
  module.exports = {
    extraNodeModules,
    getBlacklistRE: () => require("metro/src/blacklist")(blacklistRegexes),
    getProjectRoots: () => [path.resolve(__dirname)].concat(watchFolders),
  };
}
