import * as express from 'express'
import { inject, injectable, multiInject } from 'inversify'
import * as cors from 'cors'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { IRouterController } from './../controllers/IRouterController'
import { ILogger } from '../common/logger/ILogger'
import { LoggerMiddleware } from '../middlerware/LoggerMiddleware'
import { ErrorMiddleware } from '../middlerware/ErrorMiddleware'
import { config } from '../../config'

@injectable()
export class Server {
  public readonly app: express.Application

  constructor(
    @multiInject(INVERSIFY_TYPES.Controller) controllers: IRouterController[],
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger,
    @inject(INVERSIFY_TYPES.LoggerMiddleware)
    private loggerMiddlreware: LoggerMiddleware,
    @inject(INVERSIFY_TYPES.ErrorMiddleware)
    private errorMiddleware: ErrorMiddleware
  ) {
    this.app = express()
    this.initializeMiddleware()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(config.PORT, () => {
      this.logger.info(`App listening on the port ${config.PORT}`)
    })
  }

  private initializeMiddleware() {
    const corsOptions = {
      origin: config.CORS_ORIGIN,
      methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
      ],
      allowedHeaders: [
        'Content-Type',
      ],
    };
    this.app.use(express.json())
    this.app.use(cors(corsOptions))
    this.app.use(this.loggerMiddlreware.handler())
  }

  private initializeErrorHandling() {
    this.app.use(this.errorMiddleware.handler())
  }

  private initializeControllers(controllers: IRouterController[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }
}
