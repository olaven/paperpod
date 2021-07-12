/**
 * Heavily inspired by
 * [@hunties article](https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906).
 *
 * Thanks <3
 */

const blacklist = require("metro-config/src/defaults/blacklist");
const getWorkspaces = require("get-yarn-workspaces");
const path = require("path");

function getConfig(appDir, options = {}) {
  console.log("The app dir is", appDir);

  const workspaces = getWorkspaces(appDir);

  // Add additional Yarn workspace package roots to the module map
  // https://bit.ly/2LHHTP0
  const watchFolders = [
    path.resolve(appDir, "..", "node_modules"),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === appDir)),
  ];

  return {
    watchFolders,
    resolver: {
      blacklistRE: blacklist([
        // Ignore other resolved react-native installations outside of
        // mobile-native - this prevents a module naming collision when mapped.
        /^((?!mobile-native).)+[\/\\]node_modules[/\\]react-native[/\\].*/,

        // Ignore react-native-svg dependency in mobile-ui, mapped below.
        // react-native-svg must only be included once due to a side-effect. It
        // has not been hoisted as it requires native module linking here.
        // http://bit.ly/2LJ7V4b
        /mobile-ui[\/\\]node_modules[/\\]react-native-svg[/\\].*/,
      ]),
      extraNodeModules: {
        // Resolve all react-native module imports to the locally-installed version
        "react-native": path.resolve(appDir, "node_modules", "react-native"),

        // Resolve additional nohoist modules depended on by other packages
        "react-native-svg": path.resolve(
          appDir,
          "node_modules",
          "react-native-svg"
        ),

        // Resolve core-js imports to the locally installed version
        "core-js": path.resolve(appDir, "node_modules", "core-js"),
      },
    },
  };
}

module.exports = getConfig(__dirname);
