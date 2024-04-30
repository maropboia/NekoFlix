// Import the `getDefaultConfig` and `mergeConfig` functions from the
// `@react-native/metro-config` package. These functions are used to
// configure the Metro bundler for the project.
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// Define an empty configuration object for the Metro bundler. This object
// will be merged with the default configuration to create the final
// configuration for the bundler.
const config = {};

// Merge the default configuration with the custom configuration object
// using the `mergeConfig` function. The resulting merged configuration
// will be used by the Metro bundler to bundle the JavaScript code for
// the project.
module.exports = mergeConfig(getDefaultConfig(__dirname), config);

