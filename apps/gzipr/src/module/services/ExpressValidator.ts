import sanitize from 'sanitize-filename'
import { ExpressValidator } from 'express-validator'

export const { check } = new ExpressValidator(
  {
    isValidFilename: (value: string) =>
      typeof value === 'string' && value.length > 0 && value.length <= 255,
  },
  {
    sanitize: (value: string) => sanitize(value, { replacement: '_' }),
  }
)
