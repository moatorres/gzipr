import { ConsoleLogger } from '@gzipr/core'
import { config } from '../config'
import { ExpressServer, RoutesMiddleware } from '@gzipr/core'

export const logger = new ConsoleLogger()

export const server = ExpressServer.create({
  config: config,
  logger: logger,
  useHTTPS: false,
})

export const notFound = new RoutesMiddleware({
  showRequestInfo: false,
})
