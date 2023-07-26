/* eslint-disable */

import axios from 'axios'

module.exports = async function () {
  // configure axios for tests to use the same host and port as the app
  const host = process.env.HOST ?? 'localhost'
  const port = process.env.PORT ?? '3000'
  axios.defaults.baseURL = `http://${host}:${port}`
}
