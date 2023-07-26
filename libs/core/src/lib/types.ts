/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

/**
 * Represents an abstract class.
 */
export interface Abstract<T> extends Function {
  prototype: T
}

/**
 * Represents a constructor function.
 */
export interface Constructor<T = any> extends Function {
  new (...args: any[]): T
}
