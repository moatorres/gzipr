const { composePlugins, withNx } = require('@nx/webpack')

// `nx` plugins for webpack
module.exports = composePlugins(withNx(), (config) => {
  // we can update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config
})
