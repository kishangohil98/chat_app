import { Request, Response, NextFunction } from 'express'

export type expressCb = (
  request: Request,
  response: Response,
  next?: NextFunction
) => void

export type expressErrorCb = (
  error: any,
  request: Request,
  response: Response,
  next?: NextFunction
) => void
