import http from 'http'
import https from 'https'
import express, { Application, IRouter } from 'express'

import { Logger } from '../logger'
import { errorHandler } from '../common/ErrorHandler'
import {
  Config,
  HttpStatus,
  ShutdownSignal,
  ConnectionManager,
} from '../common'
import {
  CorsMiddleware,
  HPPMiddleware,
  HelmetMiddleware,
  MorganMiddleware,
} from '../middlewares'

export interface ExpressServerOptions {
  port?: number
  logger?: Logger
  config: Config
  useHTTPS?: boolean
  corsEnabled?: boolean
  statusEnabled?: boolean
  loggingEnabled?: boolean
  trustProxy?: boolean
  onInit?: () => Promise<void>
  onStart?: () => Promise<void>
  onReady?: () => Promise<void>
  onTerminate?: () => Promise<void>
}

/**
 * The ExpressServer class is a wrapper around the Express application.
 * It provides a convenient way to create and configure an Express application.
 */
export class ExpressServer {
  /**
   * Constructs an instance of the ExpressServer class.
   */
  private app: Application
  /**
   * The connection manager instance.
   */
  private manager: ConnectionManager
  /**
   * The HTTP or HTTPS server instance.
   */
  private server: http.Server | https.Server
  /**
   * The logger instance.
   */
  private logger: Logger
  /**
   * The config instance.
   */
  private config: Config

  /**
   * Constructs an instance of the ExpressServer class.
   * @param options The options to use for the server.
   */
  private constructor(private options?: ExpressServerOptions) {
    this.app = express()
    this.logger = options.logger ?? console
    this.config = options.config
    this.options.corsEnabled = options.corsEnabled ?? true
    this.options.statusEnabled = options.statusEnabled ?? true
    this.options.loggingEnabled = options.loggingEnabled ?? true
    this.init()
  }

  public static create(options?: ExpressServerOptions) {
    return new ExpressServer(options)
  }

  private configProxy() {
    if (this.config.get('TRUST_PROXY') === '1') {
      this.app.enable('trust proxy')
    }
  }

  private init() {
    this.handleUncaughtException()

    this.app.disable('x-powered-by')

    this.configProxy()

    this.app.use(express.json({ limit: '10mb' }))
    this.app.use(express.text({ limit: '10mb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }))
    this.app.use(
      express.raw({
        limit: '10mb',
        type: [
          'application/gzip',
          'application/x-gzip',
          'application/octet-stream',
        ],
      })
    )

    // for (const middleware of this.middlewares) {
    //   this.app.use(middleware.getMiddleware())
    // }

    this.app.use(new HelmetMiddleware().getMiddleware())

    if (this.options.corsEnabled) {
      this.app.use(new CorsMiddleware().getMiddleware())
    }

    this.app.use(new HPPMiddleware().getMiddleware())

    if (this.options.loggingEnabled) {
      this.app.use(new MorganMiddleware().getMiddleware())
    }

    this.configStatus()
  }

  public getApp(): Application {
    return this.app
  }

  public getRouter(): IRouter {
    let instance: IRouter
    if (instance) return instance
    else instance = express.Router()
    return instance
  }

  public start(): void {
    const env = this.config.get('NODE_ENV')
    const port = this.config.get('PORT')
    const hostname = this.config.get('HOST')
    const protocol = this.options.useHTTPS ? 'https' : 'http'
    const server = this.options.useHTTPS
      ? this.createHttpsServer()
      : this.createHttpServer()

    this.server = server
    this.manager = new ConnectionManager(this.server, this.logger)

    server.listen(port, async () => {
      if (this.options.onReady) {
        try {
          await this.options.onReady()
        } catch (error) {
          this.logger.debug(error.stack)
        }
      }

      this.logger.log(
        `Running in ${env} mode on ${protocol}://${hostname}:${port}`
      )

      Object.values(ShutdownSignal).forEach((signal) => {
        process.on(signal, () => {
          this.manager.terminate(() => {
            this.logger.log(`${signal} Server is shutting down`)
            process.exit(0)
          })
        })
      })
    })

    this.app.use(async (error, req, res, next) => {
      if (errorHandler.isTrustedError(error)) {
        next(error)
      }
      await errorHandler.handle(error)
    })

    this.handleUnhandledRejection()
  }

  public stop() {
    this.manager.terminate(() => {
      this.logger.log(`See you soon! 👋`)
    })
  }

  private configStatus() {
    if (!this.options.statusEnabled) return
    this.app.use('/status', (req, res) => {
      return res.status(HttpStatus.OK).json({
        app: 'gzipr',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      })
    })
  }

  private createHttpServer(options?: http.ServerOptions): http.Server {
    return http.createServer(options, this.app)
  }

  private createHttpsServer(options?: https.ServerOptions): https.Server {
    const key = this.config.get('TLS_KEY')
    const cert = this.config.get('TLS_CERT')
    return https.createServer({ key, cert, ...options }, this.app)
  }

  private handleUncaughtException() {
    process.on('uncaughtException', (error: Error) => {
      errorHandler.handle(error)

      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug('Uncaught Exception: Server is shutting down')
        this.logger.debug(error.stack)
      }

      if (!errorHandler.isTrustedError(error)) {
        this.manager.terminate(() => {
          this.logger.error('Uncaught Exception: Server is shutting down')
          this.logger.debug(error.stack)
          process.exit(1)
        })
      }
    })
  }

  private handleUnhandledRejection() {
    process.on('unhandledRejection', (reason) => {
      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug('Unhandled Rejection: Server is shutting down')
      }

      if (this.options.onTerminate) {
        this.options.onTerminate()
      }

      if (!errorHandler.isTrustedError(reason)) {
        this.logger.error('Unhandled Rejection: Server is shutting down')
        this.manager.terminate(() => {
          this.server.close(() => {
            this.logger.debug('Exiting process. See you soon! 👋')
            process.exit(0)
          })
        })
      }
    })
  }
}
