# gzipr

`@gzipr/core` is a buildable library with shared abstractions that can be reused across applications within the workspace (powered by `nx`).

## About

Concretions throughout the code base either implement or extend the interfaces found [here](https://github.com/moatorres/gzipr/blob/main/libs/core/src/lib/common/Types.ts). These are high-level concepts and interfaces without providing specific implementations.

## Docs

The following abstractions define the contract and functionality that different parts of the codebase can use and implement according to their specific requirements.

#### `Config`

Represents a configuration object that maps keys to string values.

>

```ts
interface Config {
  get(key: string): string
}
```

>

#### `ConfigLoader`

Represents an object that can load configuration data from a source and return it as a key-value map.

>

```ts
type Dict = Record<string, string>

interface ConfigLoader {
  load(): Dict
}
```

>

#### `AsyncConfigLoader`

Represents an object that can asynchronously load configuration data from a source and return it as a key-value map.

>

```ts
type Dict = Record<string, string>

interface AsyncConfigLoader {
  load(): Promise<Dict>
}
```

>

#### `Context<T>`

Represents a context object that stores key-value pairs of properties.

>

```ts
class Context<T extends object> {
  private readonly registry: Map<keyof T, T[keyof T]>
  public resolve<K extends keyof T>(key: K): T[K]
  public extend<U extends object>(props: U): Context<T & U>
}
```

>

#### `RequestContext`

Represents an object that stores key-value pairs of properties for a request context.

>

```ts
interface RequestContext {
  get(key: string): any
  set(key: string, value: any): void
}
```

>

#### `RequestWrapper`

Represents an object that can wrap a request object and modify its behavior. We use `any` here because each framework has its own implementation of a `Response` object.

>

```ts
interface RequestWrapper {
  wrap(req: any): any
}
```

>

#### `ResponseWrapper`

Represents an object that can wrap a response object and modify its behavior. We use `any` here because each framework has its own implementation of a `Response` object.

>

```ts
interface ResponseWrapper {
  wrap(res: any): any
}
```

>

#### `Middleware<T>` (abstract)

Represents a middleware that can be used in a web server to handle HTTP requests.

>

```ts
type DefaultOptionsFunc<T> = () => T

abstract class Middleware<T = unknown> {
  constructor(protected options: T) {}
  abstract getDefaultOptions(): DefaultOptionsFunc<T>
  abstract getMiddleware(): RequestHandler
}
```

>

#### `ErrorHandler`

Represents an object that can handle errors that occur during request processing. We use mostly to prevent unknown errors being exposed. We control execution flow mainly with monads such as `Either` and `Result`.

>

```ts
interface ErrorHandler {
  handle(err: any, req: any, res: any, ...optional: any[]): Promise<void>
}
```

>

#### `ServerOptions`

Represents the minimal options for configuring a server.

>

```ts
interface ServerOptions {
  host: string
  port: number
}
```

>

#### `ServerLifecycle`

Represents an object that defines the lifecycle methods for a server.

>

```ts
interface ServerLifecycle {
  onInit(): Promise<void>
  onStart(): Promise<void>
  onStop(): Promise<void>
}
```

>

#### `Server` (abstract)

Represents a web server that can handle HTTP requests.

>

```ts
abstract class Server implements ServerLifecycle {
  protected config: Config
  protected context: Context<object>
  protected requestWrapper: RequestWrapper
  protected responseWrapper: ResponseWrapper
  protected middleware: Middleware[]
  protected errorHandler: ErrorHandler

  constructor(
    protected options: ServerOptions,
    protected logger: Logger
  ): Server

  private abstract init(): Promise<void>

  public abstract start(): Promise<void>
  public abstract stop(): Promise<void>

  private async onInit(): Promise<void>
  private async onStart(): Promise<void>
  private async onStop(): Promise<void>

  public useMiddleware(middleware: Middleware): void
  public useErrorHandler(errorHandler: ErrorHandler)
}
```

>

#### `Storage`

Represents an object that can store and retrieve binary data.

>

```ts
interface Storage {
  save(key: string, content: Buffer | NodeJS.ReadableStream): Promise<void>
  load(key: string): Promise<Buffer>
  delete(key: string): Promise<void>
  exists?(key: string): Promise<boolean>
}
```

>

#### `StorageOptions`

Represents options for a `Storage` instance.

>

```ts
interface StorageOptions {
  directory: string
}
```

>

#### `Validation`

Represents an object that can validate input data.

>

```ts
interface Validation {
  validate(...args: any[]): Promise<void> | boolean
}
```

>

#### `Controller<A, B>`

Represents a controller that handles HTTP requests for a specific URI. It may or may not implement the `Validation` interface.

>

```ts
interface Controller<A extends Request = any, B extends Response = any> {
  execute(req: A, res: B, ...optional: any[]): Promise<any>
}
```

>

#### `UseCase<Request, Response>`

Represents a use case that can be executed with a request and returns a response. Used along a `Controller` to handle business logic, service and repository interactions.

>

```ts
abstract class UseCase<Request, Response> {
  constructor(protected readonly logger: Logger) {
    this.logger = logger
  }

  abstract execute(request: Request): Promise<Response> | Response
}
```

>

#### `RequestHandler`

Represents a function that can handle an HTTP request. This generic interface should be compatible with other frameworks' `RequestHandler` implementations.

>

```ts
interface RequestHandler {
  (...args: any[]): Promise<void | any> | void
}
```

>

#### `Endpoint<URI>`

Represents an HTTP endpoint that can handle requests for a specific URI. It encapsulates concepts such as `route`, `handler` and `middleware`.

>

```ts
interface Endpoint<URI extends string = any> {
  method: RequestMethod
  path: URI
  middleware?: RequestHandler[]
  handler: RequestHandler
  description?: string
  version?: string
}
```

>

#### `FileStorage`

An alternative implementation of a `Storage` object. Represents an object that can store and retrieve files (e.g. Amazon S3 or Google Cloud Storage).

>

```ts
interface FileStorage {
  save(path: string, file: any): Promise<void>
  read(path: string): Promise<ReadStream>
  exists?(path: string): Promise<boolean>
  delete?(path: string): Promise<void>
  list?(path: string): Promise<string[]>
  count?(path: string): Promise<number>
}
```

>

#### `LocalFileStorage`

Represents a file storage implementation that stores files locally on the file system.

>

```ts
interface LocalFileStorage extends FileStorage {
  createWriteStream?(path: string): WriteStream
  createReadStream?(path: string): ReadStream
}
```

## Examples

A concretion of a `ConfigLoader`.

```ts
import fs from 'fs'
import path from 'path'
import { ConfigLoader } from '@gzipr/core'

/**
 * Get config from json file.
 */
export class JsonConfigLoader implements ConfigLoader {
  constructor(private readonly filePath: string = 'config.json') {
    this.filePath = path.resolve(process.cwd(), filePath)
  }

  public load<T extends object = any>() {
    if (fs.existsSync(this.filePath)) {
      return JSON.parse(fs.readFileSync(this.filePath).toString()) as T
    }
    return {} as T
  }
}
```

>

A concretion of an `ErrorHandler`

>

```ts
class ErrorHandlerImpl implements ErrorHandler {
  constructor(private logger?: Logger) {
    this.logger = logger || console
  }

  public async handle(err: any): Promise<void> {
    this.logger.error('ErrorHandler', err)
  }

  public isTrustedError(error: unknown) {
    if (error instanceof AppError) {
      return error.isOperational
    }
    return false
  }
}
```
