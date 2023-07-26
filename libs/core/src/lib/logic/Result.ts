export type Result<T, E extends Error = Error> = Ok<T> | Fail<E>

type Ok<T> = {
  success: true
  value: T
}

type Fail<E extends Error> = {
  success: false
  value: E
}

export function ok<T>(value?: T): Ok<T> {
  return {
    success: true,
    value,
  }
}

export function fail<E extends Error>(value: E): Fail<E> {
  return {
    success: false,
    value,
  }
}

type Matcher<E, T, R> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: E) => any
  onSuccess: (value: T) => R
}

export function matchR<T, E extends Error, R>(
  result: Result<T, E>,
  { onError, onSuccess }: Matcher<E, T, R>
): R {
  if (result.success) {
    return onSuccess(result.value)
  } else {
    return onError(result.value as E)
  }
}
