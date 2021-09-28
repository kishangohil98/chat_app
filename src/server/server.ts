import * as express from 'express'
import { inject, injectable, multiInject } from 'inversify'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { IRouterController } from './../controllers/IRouterController'
import { ILogger } from '../common/logger/ILogger'
import { LoggerMiddleware } from '../middlerware/LoggerMiddleware'

@injectable()
export class Server {
  public readonly app: express.Application

  constructor(
    @multiInject(INVERSIFY_TYPES.Controller) controllers: IRouterController[],
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger,
    @inject(INVERSIFY_TYPES.LoggerMiddleware)
    private loggerMiddlreware: LoggerMiddleware
  ) {
    this.app = express()
    this.initializeMiddleware()
    this.initializeControllers(controllers)
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      this.logger.info(`App listening on the port ${process.env.PORT}`)
    })
  }

  private initializeMiddleware() {
    this.app.use(express.json())
    this.app.use(this.loggerMiddlreware.handler())
  }

  private initializeControllers(controllers: IRouterController[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }
}
