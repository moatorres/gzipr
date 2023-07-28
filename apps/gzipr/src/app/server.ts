import { config } from '../config'
import { ConsoleLogger, ExpressServer, RoutesMiddleware } from '@gzipr/core'

export const logger = new ConsoleLogger()

export const server = ExpressServer.create({
  config: config,
  logger: logger,
  useHTTPS: Number(config.get('USE_HTTPS')) === 1,
})

export const notFound = new RoutesMiddleware({
  showRequestInfo: false,
})
