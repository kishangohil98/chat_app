import * as express from 'express'
import { inject, injectable, multiInject } from 'inversify'
import { SERVER_TYPES } from './ServerTypes'
import { IRouterController } from './../controllers/IRouterController'

@injectable()
export class Server {
  public readonly app: express.Application

  constructor(
    @multiInject(SERVER_TYPES.Controller) controllers: IRouterController[]
  ) {
    this.app = express()
    this.initializeMiddleware()
    this.initializeControllers(controllers)
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      // this.logger.info(`App listening on the port ${process.env.PORT}`);
      console.log(`App listening on the port ${process.env.PORT}`)
    })
  }

  private initializeMiddleware() {
    this.app.use(express.json())
  }

  private initializeControllers(controllers: IRouterController[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }
}
