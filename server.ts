import { Container } from 'inversify';
import 'reflect-metadata';
import { initialiseServer } from './src/server/inversify';
import { Server } from './src/server/Server';
import { INVERSIFY_TYPES } from './src/inversify/inversify';
import { initialiseRepositories } from './src/repositories/inversify';


export class ServerInit {
  public readonly appServer: Server;
  private inversifyContainer: Container;

  constructor() {

    this.inversifyContainer = this.initInversifyContainer();

    // Create the express server
    this.appServer = this.inversifyContainer.get<Server>(INVERSIFY_TYPES.Server);
  }

  /**
   * Initialise service dependencies
   */
  private initInversifyContainer(): Container {
    const container = new Container();
    // initialiseLogger(container);
    initialiseRepositories(container);
    // initialiseDatastore(container);
    initialiseServer(container);
    return container;
  }
}
