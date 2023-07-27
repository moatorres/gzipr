export type Either<E extends Error, T> = Left<E> | Right<T>

export class Left<E extends Error> {
  readonly left: E

  constructor(left: E) {
    this.left = left
  }

  isLeft(): this is Left<E> {
    return true
  }

  isRight(): this is Right<never> {
    return false
  }
}

export class Right<T> {
  readonly right: T

  constructor(right: T) {
    this.right = right
  }

  isLeft(): this is Left<never> {
    return false
  }

  isRight(): this is Right<T> {
    return true
  }
}

export function left<E extends Error>(value: E): Either<E, never> {
  return new Left(value)
}

export function right<T>(value: T): Either<never, T> {
  return new Right(value)
}

export function map<E extends Error, T, U>(
  either: Either<E, T>,
  f: (value: T) => U
): Either<E, U> {
  if (either.isRight()) {
    return right(f(either.right))
  } else {
    return either
  }
}

export function mapError<E extends Error, T, F extends Error>(
  either: Either<E, T>,
  f: (error: E) => F
): Either<F, T> {
  if (either.isLeft()) {
    return left(f(either.left))
  } else {
    return either
  }
}

export function flatMap<E extends Error, T, U>(
  either: Either<E, T>,
  f: (value: T) => Either<E, U>
): Either<E, U> {
  if (either.isRight()) {
    return f(either.right)
  } else {
    return either
  }
}

export function getOrElse<E extends Error, T>(
  either: Either<E, T>,
  defaultValue: T
): T {
  if (either.isRight()) {
    return either.right
  } else {
    return defaultValue
  }
}

export function chain<E extends Error, T, U>(
  either: Either<E, T>,
  f: (value: T) => Either<E, U>
): Either<E, U> {
  return flatMap(either, f)
}

export function chainError<E extends Error, T, F extends Error>(
  either: Either<E, T>,
  f: (error: E) => Either<F, T>
): Either<F, T> {
  if (either.isLeft()) {
    return f(either.left)
  } else {
    return either
  }
}

export function of<T>(value: T | null | undefined): Either<Error, T> {
  if (value === null || value === undefined) {
    return left(new Error('Value is null or undefined'))
  } else {
    return right(value)
  }
}

export function from<T>(
  value: T | null | undefined,
  error: Error = new Error('Value is null or undefined')
): Either<Error, T> {
  if (value === null || value === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return left(error as any)
  } else {
    return value instanceof Function ? right(value()) : right(value)
  }
}

export function fold<E extends Error, T, R>(
  either: Either<E, T>,
  onError: (error: E) => R,
  onSuccess: (value: T) => R
): R {
  if (either.isRight()) {
    return onSuccess(either.right)
  } else {
    return onError(either.left)
  }
}

export function onError<E extends Error, T, R>(
  either: Either<E, T>,
  fn: (error: E) => R
): R | undefined {
  if (either.isLeft()) {
    return fn(either.left)
  }
}

export function onSuccess<E extends Error, T, R>(
  either: Either<E, T>,
  fn: (value: T) => R
): R | undefined {
  if (either.isRight()) {
    return fn(either.right)
  }
}

export type Matcher<E, T, R> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: E) => any
  onSuccess: (value: T) => R
}

export function match<E extends Error, T, R>(
  either: Either<E, T>,
  { onError, onSuccess }: Matcher<E, T, R>
): R {
  if (either.isLeft()) {
    return onError(either.left)
  } else {
    return onSuccess(either.right)
  }
}
