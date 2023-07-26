/**
 * Union of all {@link ShutdownSignal} values.
 */
export type ShutdownSignals = `${ShutdownSignal}`

/**
 * Nodejs shutdown signals managed by `process.on('SIGTERM', () => {})`
 * Partial `enum` of {@link NodeJS.Signals} union type.
 * @see https://nodejs.org/api/process.html#process_signal_events
 * @see https://man7.org/linux/man-pages/man7/signal.7.html
 */
export enum ShutdownSignal {
  /**
   * `SIGHUP` (Term) Hangup detected on controlling terminal or death of controlling process
   */
  SIGHUP = 'SIGHUP',
  /**
   * `SIGINT` (Term) Interrupt from keyboard
   */
  SIGINT = 'SIGINT',
  /**
   * `SIGQUIT` (Core) Quit from keyboard
   */
  SIGQUIT = 'SIGQUIT',
  /**
   * `SIGILL` (Core) Illegal Instruction
   */
  SIGILL = 'SIGILL',
  /**
   * `SIGTRAP` (Core) Trace/breakpoint trap
   */
  SIGTRAP = 'SIGTRAP',
  /**
   * `SIGABRT` (Core) Abort signal
   */
  SIGABRT = 'SIGABRT',
  /**
   * `SIGBUS` (Core) Bus error (bad memory access)
   */
  SIGBUS = 'SIGBUS',
  /**
   * `SIGFPE` (Core) Floating-point exception
   */
  SIGFPE = 'SIGFPE',
  /**
   * `SIGSEGV` (Core) Invalid memory reference
   */
  SIGSEGV = 'SIGSEGV',
  /**
   * `SIGPIPE` (Term) Broken pipe: write to pipe with no readers
   */
  SIGPIPE = 'SIGPIPE',
  /**
   * `SIGTERM` (Term) Termination signal
   */
  SIGTERM = 'SIGTERM',
}
