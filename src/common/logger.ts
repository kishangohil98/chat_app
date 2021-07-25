import * as express from 'express'

export default function loggerMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  console.log(
    `${request.method} ${request.path} \nRequest body: ${request.body}`
  )
  next()
}
