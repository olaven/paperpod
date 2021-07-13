/**
 * Heavily inspired by
 * [@hunties article](https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906).
 *
 * Thanks <3
 */

const getWorkspaces = require("get-yarn-workspaces");
const path = require("path");

function getConfig(appDir, options = {}) {
  console.log("THE APP DIR IS");
  const workspaces = getWorkspaces(appDir);

  // Add additional Yarn workspace package roots to the module map
  // https://bit.ly/2LHHTP0

  const watchFolders = [
    path.resolve(appDir, "node_modules"),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === appDir)),
  ];

  console.log({ watchFolders });

  return {
    watchFolders,
  };
}

module.exports = getConfig(__dirname);
