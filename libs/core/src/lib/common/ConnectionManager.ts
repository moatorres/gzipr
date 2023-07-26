import { Server as HttpsServer } from 'https'
import { IncomingMessage, Server as HttpServer, ServerResponse } from 'http'
import { Logger } from '../logger'

/**
 * A symbol used to mark a socket as idle.
 * @internal
 */
export const idle = Symbol('IDLE_CONNECTION_SYMBOL')

/**
 * Keeps track of active connections and terminates them after requests are finished.
 * @param server The server to manage.
 * @param logger The logger to use. (optional)
 */
export class ConnectionManager implements Manager {
  private connections: SocketsMap = {}
  private nextConnectionId = 1
  private terminating = false

  constructor(
    private server: HttpServer | HttpsServer,
    private logger?: Logger
  ) {
    this.init()
    this.logger = logger || console
  }

  /**
   * Starts tracking new connections and requests.
   */
  public init() {
    this.server.on('connection', this.onConnection.bind(this))
    this.server.on('request', this.onRequest.bind(this))
  }

  /**
   * Destroys the connection if it's inactive.
   */
  public close(connection: PatchedSocket): void {
    if (connection[idle]) {
      connection.end()
    }
  }

  /**
   * Stops accepting new requests and terminates connections after requests are finished.
   */
  public terminate(callback: () => void) {
    this.terminating = true
    this.server.close(callback)

    const activeConnectionsNumber = Object.keys(this.connections).length

    this.logger.log(
      `Closing ${activeConnectionsNumber} active connection${
        activeConnectionsNumber !== 1 ? 's' : ''
      }`
    )

    for (const id in this.connections) {
      if (Object.prototype.hasOwnProperty.call(this.connections, id)) {
        const socket = this.connections[id]
        this.close(socket as PatchedSocket)
      }
    }
  }

  /**
   * Tracks new connections by assigning them an id and adding them to the connections map.
   */
  public onConnection(connection: PatchedSocket): void {
    const id = this.nextConnectionId++
    connection[idle] = true
    this.connections[id] = connection
    connection.on('close', () => delete this.connections[id])
  }

  /**
   * Tracks new requests and
   */
  public onRequest(request: IncomingMessage, response: ServerResponse): void {
    const connection = request.socket as unknown as PatchedSocket

    connection[idle] = false

    response.on('finish', () => {
      connection[idle] = true
      if (this.terminating) this.close(connection)
    })
  }
}

/**
 * A socket with an idle flag.
 * @internal
 */
type PatchedSocket = NodeJS.Socket & {
  [idle]: boolean
}

/**
 * A map of connection ids to sockets.
 * @internal
 */
interface SocketsMap {
  [key: number]: NodeJS.Socket
}

/**
 * Manages the server lifecycle.
 * @internal
 */
interface Manager {
  init(): void
  terminate(callback: () => void): void
}
