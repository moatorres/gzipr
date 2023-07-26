/**
 * @returns `true` if the `APP_COLOR_OFF` environment variable is not set.
 */
export function isColorAllowed() {
  return !process.env['APP_COLOR_OFF']
}

/**
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
const RESET_COLOR_ASCII_CODE = '\x1B[39m'
const RESET_BACKGROUND_ASCII_CODE = '\x1B[49m'

/**
 * Returns a function that colorises text conditionally based on the `APP_COLOR_OFF` environment variable.
 * @param code The ANSI color code.
 * @returns A function that colorises text conditionally based on the `APP_COLOR_OFF` environment variable.
 */
export function colorize(code: string) {
  const ending = code.endsWith('m')
    ? RESET_COLOR_ASCII_CODE
    : RESET_BACKGROUND_ASCII_CODE
  return (text: string) => (isColorAllowed() ? `${code}${text}${ending}` : text)
}

/**
 * These functions colorise text unconditionally.
 * @param text The text to colorise.
 * @returns The colorised text.
 */
export const system = {
  blue: (text: string) => `\x1B[96m${text}\x1B[39m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[38;5;3m${text}\x1B[39m`,
  red: (text: string) => `\x1B[91m${text}\x1B[39m`,
}

/**
 * These functions colorise text if the `APP_COLOR_OFF` environment variable is not set.
 * @param text The text to colorise.
 */
export const bold = colorize('\x1B[1m')
export const red = colorize('\x1B[31m')
export const bgRed = colorize('\x1B[41m')
export const yellow = colorize('\x1B[38;5;3m')
export const bgYellow = colorize('\x1B[43m')
export const green = colorize('\x1B[32m')
export const bgGreen = colorize('\x1B[42m')
export const magenta = colorize('\x1B[95m')
export const bgMagenta = colorize('\x1B[45m')
export const cyan = colorize('\x1B[96m')
export const bgCyan = colorize('\x1B[46m')
export const blue = colorize('\x1B[34m')
export const bgBlue = colorize('\x1B[44m')
export const white = colorize('\x1B[37m')
export const bgWhite = colorize('\x1B[47m')
export const gray = colorize('\x1B[90m')
export const bgGray = colorize('\x1B[100m')
export const black = colorize('\x1B[30m')
export const bgBlack = colorize('\x1B[40m')
