const withTM = require("next-transpile-modules")(["@paperpod/common", "@paperpod/ui", "@paperpod/frontend"]);

module.exports = withTM({
  webpack: (config) => {
    /* config.module.rules.push({
      test: /\.tsx?$/,
      use: ["ts-loader"],
    });
 */

    return config;
  },
});
