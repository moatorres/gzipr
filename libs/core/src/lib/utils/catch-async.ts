import { NextFunction, Request, RequestHandler, Response } from 'express'

/**
 * Calls the function and passes any errors to the next function.
 * @param fn The function to call.
 */
export const catchAsync =
  <F extends RequestHandler>(fn: F) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }

/**
 * Calls the function and catches any errors that occur.
 * @param fn The function to call.
 */
export const tryCatch =
  <F extends RequestHandler>(fn: F) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
