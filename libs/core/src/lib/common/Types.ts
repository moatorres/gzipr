/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReadStream, WriteStream } from 'fs'
import { Logger } from '../logger/Logger'
import { RequestMethod } from './RequestMethod'

/**
 * Represents a configuration object that maps keys to string values.
 */
export interface Config {
  get(key: string): string
}

/**
 * Represents an object that can load configuration data from a source and return it as a key-value map.
 */
export interface ConfigLoader {
  /**
   * Loads configuration data from a source and returns it as a key-value map.
   * @returns A key-value map representing the loaded configuration data.
   */
  load(): Record<string, string> | Promise<Record<string, string>>
}

/**
 * Represents an object that can asynchronously load configuration data from a source and return it as a key-value map.
 */
export interface AsyncConfigLoader {
  /**
   * Asynchronously loads configuration data from a source and returns it as a key-value map.
   * @returns A Promise that resolves to a key-value map representing the loaded configuration data.
   */
  load(): Promise<Record<string, string>>
}

/**
 * Represents a context object that stores key-value pairs of properties.
 * @template T The type of the properties stored in the context object.
 */
export class Context<T extends object> {
  private readonly registry: Map<keyof T, T[keyof T]> = new Map()

  public constructor(private readonly props: T) {
    for (const [key, value] of Object.entries(props)) {
      if (this.registry.has(key as keyof T)) continue
      this.registry.set(key as keyof T, value)
    }
  }

  public resolve<K extends keyof T>(key: K): T[K] {
    return this.registry.get(key) as T[K]
  }

  public extend<U extends object>(props: U): Context<T & U> {
    return new Context<T & U>({ ...this.props, ...props })
  }
}

/**
 * Represents an object that stores key-value pairs of properties for a request context.
 */
export interface RequestContext {
  /**
   * Gets the value associated with the specified key from the request context.
   * @param key The key of the value to get.
   * @returns The value associated with the specified key, or undefined if the key is not found.
   */
  get(key: string): any

  /**
   * Sets the value associated with the specified key in the request context.
   * @param key The key of the value to set.
   * @param value The value to associate with the specified key.
   */
  set(key: string, value: any): void
}

/**
 * Represents an object that can wrap a request object and modify its behavior.
 */
export interface RequestWrapper {
  /**
   * Wraps a request object and returns the wrapped object.
   * @param req The request object to wrap.
   * @returns The wrapped request object.
   */
  wrap(req: any): any
}

/**
 * Represents an object that can wrap a response object and modify its behavior.
 */
export interface ResponseWrapper {
  wrap(res: any): any
}

/**
 * Represents a function that returns the default options for a middleware.
 * @template T The type of options that can be passed to the middleware.
 * @returns The default options for the middleware.
 */
type DefaultOptionsFunc<T> = () => T

/**
 * Represents a middleware that can be used in a web server to handle HTTP requests.
 * @template T The type of options that can be passed to the middleware.
 */
export abstract class Middleware<T = unknown> {
  constructor(protected options: T) {}

  /**
   * This method should be implemented by subclasses to return default options.
   * @returns A function that returns the default options for the middleware.
   */
  abstract getDefaultOptions(): DefaultOptionsFunc<T>

  /**
   * This method should be implemented by subclasses to return the middleware function.
   * @returns The middleware function that handles HTTP requests.
   */
  abstract getMiddleware(): RequestHandler
}

/**
 * Represents an object that can handle errors that occur during request processing.
 */
export interface ErrorHandler {
  handle(err: any, req: any, res: any, ...optional: any[]): Promise<void>
}

/**
 * Represents the options for configuring a server.
 */
export interface ServerOptions {
  /**
   * The host name or IP address to bind the server to.
   */
  host: string
  /**
   * The port number to bind the server to.
   */
  port: number
}

/**
 * Represents an object that defines the lifecycle methods for a server.
 */
export interface ServerLifecycle {
  /**
   * This method is called when the server is initialized.
   * @returns A promise that resolves when the initialization is complete.
   */
  onInit(): Promise<void>
  /**
   * This method is called when the server is started.
   * @returns A promise that resolves when the server has started.
   */
  onStart(): Promise<void>
  /**
   * This method is called when the server is stopped.
   * @returns A promise that resolves when the server has stopped.
   */
  onStop(): Promise<void>
}

/**
 * Represents a web server that can handle HTTP requests.
 */
export abstract class Server implements ServerLifecycle {
  protected config: Config
  protected context: Context<object>
  protected requestWrapper: RequestWrapper
  protected responseWrapper: ResponseWrapper
  protected middleware: Middleware[]
  protected errorHandler: ErrorHandler

  constructor(protected options: ServerOptions, protected logger: Logger) {}

  async onInit() {
    this.logger.log('Server initializing...')
  }

  async onStart() {
    this.logger.log('Server starting...')
  }

  async onStop() {
    this.logger.log('Server stopping...')
  }

  useMiddleware(middleware: Middleware) {
    this.middleware.push(middleware)
  }

  useErrorHandler(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler
  }

  abstract init(): Promise<void>
  abstract start(): Promise<void>
  abstract stop(): Promise<void>
}

/**
 * Represents an object that can store and retrieve binary data.
 */
export interface Storage {
  /**
   * Saves binary data to the storage.
   * @param key The key to use for the data.
   * @param content The binary data to save.
   * @returns A promise that resolves when the data has been saved.
   */
  save(key: string, content: Buffer | NodeJS.ReadableStream): Promise<void>
  /**
   * Loads binary data from the storage.
   * @param key The key to use for the data.
   * @returns A promise that resolves with the loaded binary data.
   */
  load(key: string): Promise<Buffer>
  /**
   * Deletes binary data from the storage.
   * @param key The key to use for the data.
   * @returns A promise that resolves when the data has been deleted.
   */
  delete(key: string): Promise<void>
  /**
   * Checks if binary data exists in the storage.
   * @param key The key to use for the data.
   * @returns A promise that resolves with a boolean indicating if the data exists.
   */
  exists?(key: string): Promise<boolean>
}

/**
 * Represents options for a Storage instance.
 */
export interface StorageOptions {
  directory: string
}

/**
 * Represents an object that can validate input data.
 */
export interface Validation {
  validate(...args: any[]): Promise<void> | boolean
}

/**
 * Represents a controller that handles HTTP requests for a specific URI.
 * @template A The type of the HTTP request that this controller handles.
 * @template B The type of the HTTP response that this controller handles.
 */
export interface Controller<A extends Request = any, B extends Response = any>
  extends Validation {
  execute(req: A, res: B, ...optional: any[]): Promise<any>
}

/**
 * Represents a use case that can be executed with a request and returns a response.
 * @template Request The type of the request that this use case handles.
 * @template Response The type of the response that this use case returns.
 */
export abstract class UseCase<Request, Response> {
  constructor(protected readonly logger: Logger) {
    this.logger = logger
  }

  abstract execute(request: Request): Promise<Response> | Response
}

/**
 * Represents a function that can handle an HTTP request.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next A function to call to pass control to the next middleware function.
 * @returns A promise that resolves when the request has been handled.
 */
export interface RequestHandler {
  (...args: any[]): Promise<void | any> | void
}

/**
 * Represents an HTTP endpoint that can handle requests for a specific URI.
 * @template URI The type of the URI that this endpoint handles.
 */
export interface Endpoint<URI extends string = any> {
  method: RequestMethod
  path: URI
  middleware?: RequestHandler[]
  handler: RequestHandler
  description?: string
  version?: string
}

/**
 * Represents an object that can store and retrieve files.
 */
export interface FileStorage {
  /**
   * Saves a file to the storage.
   * @param path The path to use for the file.
   * @param file The file to save.
   * @returns A promise that resolves when the file has been saved.
   */
  save(path: string, file: any): Promise<void>
  /**
   * Reads a file from the storage.
   * @param path The path to use for the file.
   * @returns A promise that resolves with a readable stream for the file.
   */
  read(path: string): Promise<ReadStream>
  /**
   * Checks if a file exists in the storage.
   * @param path The path to use for the file.
   * @returns A promise that resolves with a boolean indicating if the file exists.
   */
  exists?(path: string): Promise<boolean>
  /**
   * Deletes a file from the storage.
   * @param path The path to use for the file.
   * @returns A promise that resolves when the file has been deleted.
   */
  delete?(path: string): Promise<void>
  /**
   * Lists all files in a directory.
   * @param path The path to use for the directory.
   * @returns A promise that resolves with an array of file names.
   */
  list?(path: string): Promise<string[]>
  /**
   * Counts the number of files in a directory.
   * @param path The path to use for the directory.
   * @returns A promise that resolves with the number of files.
   */
  count?(path: string): Promise<number>
}

/**
 * Represents a file storage implementation that stores files locally on the file system.
 * Inherits from the `FileStorage` interface.
 */
export interface LocalFileStorage extends FileStorage {
  createWriteStream?(path: string): WriteStream
  createReadStream?(path: string): ReadStream
}
