/* eslint-disable */
var __TEARDOWN_MESSAGE__: string

module.exports = async function () {
  // we can start services that are shared between tests here
  console.log('\nSetting up...\n')

  // we can also use `globalThis` to pass variables to global teardown
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n'
}
