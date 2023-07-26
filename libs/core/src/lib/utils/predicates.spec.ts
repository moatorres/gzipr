import {
  isNull,
  isUndefined,
  isNil,
  isEmpty,
  isObject,
  isFunction,
  isString,
  isNumber,
  isSymbol,
  isPlainObject,
} from './predicates'

describe('Predicates', () => {
  test('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isNull('test')).toBe(false)
  })

  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('test')).toBe(false)
  })

  test('isNil', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil('test')).toBe(false)
  })

  test('isEmpty', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('test')).toBe(false)
  })

  test('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject('test')).toBe(false)
  })

  test('isFunction', () => {
    expect(isFunction(() => ({}))).toBe(true)
    expect(isFunction('test')).toBe(false)
  })

  test('isString', () => {
    expect(isString('test')).toBe(true)
    expect(isString({})).toBe(false)
  })

  test('isNumber', () => {
    expect(isNumber(5)).toBe(true)
    expect(isNumber('test')).toBe(false)
  })

  test('isSymbol', () => {
    expect(isSymbol(Symbol('test'))).toBe(true)
    expect(isSymbol('test')).toBe(false)
  })

  test('isPlainObject', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(class {})).toBe(false)
    expect(isPlainObject(new (class {})())).toBe(false)
  })
})
