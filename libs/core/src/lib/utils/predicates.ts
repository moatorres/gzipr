/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

/**
 * Checks if the value is null.
 */
export const isNull = (x: any): x is null => x === null

/**
 * Checks if the value is undefined.
 */
export const isUndefined = (x: any): x is undefined => typeof x === 'undefined'

/**
 * Checks if the value is null or undefined.
 */
export const isNil = (x: any): x is null | undefined =>
  isUndefined(x) || isNull(x)

/**
 * Checks if the value is empty.
 */
export const isEmpty = (x: any): boolean => !(x && x.length > 0)

/**
 * Checks if the value is an object.
 */
export const isObject = (o: any): o is object =>
  !isNil(o) && typeof o === 'object'

/**
 * Checks if the value is a function.
 */
export const isFunction = (x: any): x is Function => typeof x === 'function'

/**
 * Checks if the value is a string.
 */
export const isString = (x: any): x is string => typeof x === 'string'

/**
 * Checks if the value is a number.
 */
export const isNumber = (x: any): x is number => typeof x === 'number'

/**
 * Checks if the value is a boolean.
 */
export const isSymbol = (x: any): x is symbol => typeof x === 'symbol'

/**
 * Checks if the value is a class.
 */
export const isPlainObject = (x: any): x is object => {
  if (!isObject(x)) return false
  const proto = Object.getPrototypeOf(x)
  if (proto === null) return true
  const ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor

  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) ===
      Function.prototype.toString.call(Object)
  )
}
