/* eslint-disable @typescript-eslint/no-explicit-any */
import * as colors from '../utils/colors'
import {
  LogLevel,
  LoggerService,
  isLogLevelEnabled,
  DEFAULT_LOG_LEVELS,
  DATE_TIME_FORMATTER,
} from './Logger'
import {
  isFunction,
  isPlainObject,
  isString,
  isUndefined,
} from '../utils/predicates'

export interface ConsoleLoggerOptions {
  logLevels?: LogLevel[]
  timestamp?: boolean
}

export class ConsoleLogger implements LoggerService {
  constructor()
  constructor(options: ConsoleLoggerOptions)
  constructor(protected options: ConsoleLoggerOptions = {}) {
    if (!options.logLevels) options.logLevels = DEFAULT_LOG_LEVELS
  }

  log(message: any): void
  log(message: any, ...optional: [...any, string?]): void
  log(message: any, ...optional: any[]) {
    if (!this.isLevelEnabled('log')) return
    const { messages } = this.getMessages([message, ...optional])
    this.printMessages(messages, 'log')
  }

  error(message: any, stack?: string): void
  error(message: any, ...optional: [...any, string?, string?]): void
  error(message: any, ...optional: any[]) {
    if (!this.isLevelEnabled('error')) return
    const { messages, stack } = this.getStack([message, ...optional])
    this.printMessages(messages, 'error', 'stderr')
    this.printStackTrace(stack)
  }

  warn(message: any): void
  warn(message: any, ...optional: [...any, string?]): void
  warn(message: any, ...optional: any[]) {
    if (!this.isLevelEnabled('warn')) return
    const { messages } = this.getMessages([message, ...optional])
    this.printMessages(messages, 'warn')
  }

  debug(message: any, ...optional: [...any, string?]): void
  debug(message: any, ...optional: any[]) {
    if (!this.isLevelEnabled('debug')) return
    const { messages } = this.getMessages([message, ...optional])
    this.printMessages(messages, 'debug')
  }

  verbose(message: any, ...optional: [...any, string?]): void
  verbose(message: any, ...optional: any[]) {
    if (!this.isLevelEnabled('verbose')) return
    const { messages } = this.getMessages([message, ...optional])
    this.printMessages(messages, 'verbose')
  }

  setLogLevels(levels: LogLevel[]) {
    if (!this.options) this.options = {}
    this.options.logLevels = levels
  }

  isLevelEnabled(level: LogLevel): boolean {
    const logLevels = this.options?.logLevels
    return isLogLevelEnabled(level, logLevels)
  }

  protected getTimestamp(): string {
    return DATE_TIME_FORMATTER.format(Date.now())
  }

  protected printMessages(
    messages: unknown[],
    logLevel: LogLevel = 'log',
    writeStreamType?: 'stdout' | 'stderr'
  ) {
    messages.forEach((message) => {
      const pidMessage = this.formatPid(process.pid)
      const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ')
      const formattedMessage = this.formatMessage(
        logLevel,
        message,
        pidMessage,
        formattedLogLevel
      )

      process[writeStreamType ?? 'stdout'].write(formattedMessage)
    })
  }

  protected formatPid(pid: number) {
    return `[gzip-uploader] ${pid} - `
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string
  ) {
    const output = this.stringifyMessage(message, logLevel)
    pidMessage = this.colorize(pidMessage, logLevel)
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel)
    return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${output}\n`
  }

  protected stringifyMessage(message: unknown, logLevel: LogLevel): string {
    if (isPlainObject(message) || Array.isArray(message)) {
      const output = this.colorize('Object:', logLevel)
      const json = JSON.stringify(
        message,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value),
        2
      )
      return `${output}\n${json}\n`
    }

    if (isFunction(message)) {
      this.stringifyMessage(message(), logLevel)
    }

    return this.colorize(message as string, logLevel)
  }

  protected colorize(message: string, logLevel: LogLevel) {
    const color = this.getColor(logLevel)
    return color(message)
  }

  protected printStackTrace(stack?: string) {
    if (!stack) return
    process.stderr.write(`${stack}\n`)
  }

  private getMessages(messages: unknown[]) {
    return { messages }
  }

  private getStack(args: unknown[]) {
    if (args.length === 2) {
      return this.isStack(args[1])
        ? { messages: [args[0]], stack: args[1] as string }
        : { messages: [args[0]] }
    }

    const { messages } = this.getMessages(args)

    if (messages?.length <= 1) return { messages }

    const lastElement = messages[messages.length - 1]
    const isStack = isString(lastElement)

    if (!isStack && !isUndefined(lastElement)) return { messages }

    return {
      stack: lastElement as string,
      messages: messages.slice(0, messages.length - 1),
    }
  }

  private isStack(stack: unknown) {
    if (!isString(stack) && !isUndefined(stack)) return false
    return /^(.)+\n\s+at .+:\d+:\d+$/.test(stack as string)
  }

  private getColor(level: LogLevel) {
    switch (level) {
      case 'debug':
        return colors.magenta
      case 'warn':
        return colors.yellow
      case 'error':
        return colors.red
      case 'verbose':
        return colors.blue
      default:
        return colors.green
    }
  }
}
