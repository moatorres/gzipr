import { AppError, UnprocessableContent } from '../exceptions'
import * as E from './Either'

describe('Either', () => {
  it('should create a right instance', () => {
    const either = E.right('right')
    expect(either.isRight()).toBeTruthy()
    expect(either.isLeft()).toBeFalsy()

    if (either.isRight()) {
      expect(either.right).toBe('right')
    }
  })

  it('should create a left instance', () => {
    const either = E.left(new UnprocessableContent())
    expect(either.isRight()).toBeFalsy()
    expect(either.isLeft()).toBeTruthy()

    if (either.isLeft()) {
      expect(either.left).toBeInstanceOf(UnprocessableContent)
    }
  })

  it('should map a right instance', () => {
    const either = E.right('right')
    const mapped = E.map(either, (value) => value.toUpperCase())
    expect(mapped.isRight()).toBeTruthy()
    expect(mapped.isLeft()).toBeFalsy()

    if (mapped.isRight()) {
      expect(mapped.right).toBe('RIGHT')
    }
  })

  it('should map a left instance', () => {
    const either = E.left(new UnprocessableContent())
    // @ts-expect-error - we are testing the left case
    const mapped = E.map(either, (value) => value.toUpperCase())
    expect(mapped.isRight()).toBeFalsy()
    expect(mapped.isLeft()).toBeTruthy()

    if (mapped.isLeft()) {
      expect(mapped.left).toBeInstanceOf(UnprocessableContent)
    }
  })

  it('should map an error', () => {
    const either = E.left(new UnprocessableContent())
    const mapped = E.mapError(either, (error) => new Error(error.message))
    expect(mapped.isRight()).toBeFalsy()
    expect(mapped.isLeft()).toBeTruthy()

    if (mapped.isLeft()) {
      expect(mapped.left).toBeInstanceOf(Error)
    }
  })

  it('should flat map a right instance', () => {
    const either = E.right('right')
    const mapped = E.flatMap(either, (value) => E.right(value.toUpperCase()))
    expect(mapped.isRight()).toBeTruthy()
    expect(mapped.isLeft()).toBeFalsy()

    if (mapped.isRight()) {
      expect(mapped.right).toBe('RIGHT')
    }
  })

  it('should flat map a left instance', () => {
    const either = E.left(new UnprocessableContent())
    // @ts-expect-error - we are testing the left case
    const mapped = E.flatMap(either, (value) => E.right(value.toUpperCase()))
    expect(mapped.isRight()).toBeFalsy()
    expect(mapped.isLeft()).toBeTruthy()

    if (mapped.isLeft()) {
      expect(mapped.left).toBeInstanceOf(UnprocessableContent)
    }
  })

  it('should get the value of a right instance', () => {
    const either = E.right('right')
    const value = E.getOrElse(either, 'left')
    expect(value).toBe('right')
  })

  it('should get the default value of a left instance', () => {
    const either = E.left(new UnprocessableContent())
    const value = E.getOrElse(either, 'left')
    expect(value).toBe('left')
  })

  it('should chain a right instance', () => {
    const either = E.right('right')
    const chained = E.chain(either, (value) => E.right(value.toUpperCase()))
    expect(chained.isRight()).toBeTruthy()
    expect(chained.isLeft()).toBeFalsy()

    if (chained.isRight()) {
      expect(chained.right).toBe('RIGHT')
    }
  })

  it('should chain a left instance', () => {
    const either = E.left(new UnprocessableContent())
    // @ts-expect-error - we are testing the left case
    const chained = E.chain(either, (value) => E.right(value.toUpperCase()))
    expect(chained.isRight()).toBeFalsy()
    expect(chained.isLeft()).toBeTruthy()

    if (chained.isLeft()) {
      expect(chained.left).toBeInstanceOf(UnprocessableContent)
    }
  })

  it('should chain an error', () => {
    const either = E.left(new UnprocessableContent())
    const chained = E.chainError(either, (error) =>
      E.left(new Error(error.message))
    )
    expect(chained.isRight()).toBeFalsy()
    expect(chained.isLeft()).toBeTruthy()

    if (chained.isLeft()) {
      expect(chained.left).toBeInstanceOf(Error)
    }
  })

  it('method "of" should create a right instance', () => {
    const either = E.of('right')
    expect(either.isRight()).toBeTruthy()
    expect(either.isLeft()).toBeFalsy()

    if (either.isRight()) {
      expect(either.right).toBe('right')
    }
  })

  it('method "of" should create a left instance', () => {
    const either = E.of(null)
    expect(either.isRight()).toBeFalsy()
    expect(either.isLeft()).toBeTruthy()

    if (either.isLeft()) {
      expect(either.left).toBeInstanceOf(AppError)
    }
  })

  it('method "from" should create a right instance', () => {
    const either = E.from(() => 'right')
    expect(either.isRight()).toBeTruthy()
    expect(either.isLeft()).toBeFalsy()

    if (either.isRight()) {
      expect(either.right).toBe('right')
    }
  })

  it('method "from" should create a left instance', () => {
    const either = E.from(null)
    expect(either.isRight()).toBeFalsy()
    expect(either.isLeft()).toBeTruthy()
  })

  it('methods "onError" and "onSuccess" should call the right callback', () => {
    const either = E.right('right')
    const onError = jest.fn()
    const onSuccess = jest.fn()
    E.onError(either, onError)
    E.onSuccess(either, onSuccess)
    expect(onError).not.toHaveBeenCalled()
    expect(onSuccess).toHaveBeenCalled()
  })

  it('should match a right instance', () => {
    const either = E.right('right')
    const result = E.match(either, {
      onError: () => 'left',
      onSuccess: (value) => value.toUpperCase(),
    })
    expect(result).toBe('RIGHT')
  })

  it('should match a left instance', () => {
    const either = E.left(new UnprocessableContent())
    const result = E.match(either, {
      onError: () => 'left',
      // @ts-expect-error - we are testing the left case
      onSuccess: (value) => value.toUpperCase(),
    })
    expect(result).toBe('left')
  })
})
