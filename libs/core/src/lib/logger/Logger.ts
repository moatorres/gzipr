/* eslint-disable @typescript-eslint/no-explicit-any */
import { tuple } from '../utils/tuple'

/**
 * `Logger` interface for logging messages.
 */
export interface Logger {
  log(message: any, ...optional: any[]): void
  error(message: any, ...optional: any[]): void
  warn(message: any, ...optional: any[]): void
  debug?(message: any, ...optional: any[]): void
  verbose?(message: any, ...optional: any[]): void
}

/**
 * `LogerService` interface to set log levels.
 */
export interface LoggerService extends Logger {
  setLogLevels?(levels: LogLevel[]): void
  isLogLevelEnabled?(level: LogLevel): boolean
}

/**
 * Default log levels.
 */
export const DEFAULT_LOG_LEVELS = tuple(
  'log',
  'error',
  'warn',
  'debug',
  'verbose'
)

/**
 * Log level type.
 */
export type LogLevel = (typeof DEFAULT_LOG_LEVELS)[number]

/**
 * Date time formatter for log messages.
 */
export const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
})

/**
 * Log level values.
 */
export const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  verbose: 0,
  debug: 1,
  log: 2,
  warn: 3,
  error: 4,
}

/**
 * Log level value type.
 */
export enum LogLevelValue {
  VERBOSE = 0,
  DEBUG = 1,
  LOG = 2,
  WARN = 3,
  ERROR = 4,
}

/**
 * Checks if the given log level is enabled.
 */
export function isLogLevelEnabled(
  targetLevel: LogLevel,
  logLevels: LogLevel[] | undefined
): boolean {
  if (!logLevels || (Array.isArray(logLevels) && logLevels?.length === 0)) {
    return false
  }
  if (logLevels.includes(targetLevel)) {
    return true
  }

  const highestLogLevelValue = logLevels
    .map((level) => LOG_LEVEL_VALUES[level])
    .sort((a, b) => b - a)?.[0]

  const targetLevelValue = LOG_LEVEL_VALUES[targetLevel]
  return targetLevelValue >= highestLogLevelValue
}
