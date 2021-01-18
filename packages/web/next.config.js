const withTM = require('next-transpile-modules')(['common']);

// Tell webpack to compile the "bar" package
// https://www.npmjs.com/package/next-transpile-modules
module.exports = withTM({
    webpack(config) {
        config.resolve.symlinks = true; // source: https://github.com/martpie/next-transpile-modules/issues/9#issuecomment-498766367
        return config;
    }
});