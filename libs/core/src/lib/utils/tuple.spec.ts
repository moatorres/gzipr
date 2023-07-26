import { tuple, tupleNumber } from './tuple'

describe('tuple', () => {
  it('should create a tuple of strings', () => {
    const result = tuple('a', 'b', 'c')
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should create a tuple of one string', () => {
    const result = tuple('a')
    expect(result).toEqual(['a'])
  })

  it('should create an empty tuple', () => {
    const result = tuple()
    expect(result).toEqual([])
  })
})

describe('tupleNumber', () => {
  it('should create a tuple of numbers', () => {
    const result = tupleNumber(1, 2, 3)
    expect(result).toEqual([1, 2, 3])
  })

  it('should create a tuple of one number', () => {
    const result = tupleNumber(1)
    expect(result).toEqual([1])
  })

  it('should create an empty tuple', () => {
    const result = tupleNumber()
    expect(result).toEqual([])
  })
})
