/**
 * Creates a tuple of strings.
 */
export const tuple = <T extends string[]>(...args: T) => args

/**
 * Creates a tuple of numbers.
 */
export const tupleNumber = <T extends number[]>(...args: T) => args
