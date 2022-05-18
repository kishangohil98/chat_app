import { Container } from 'inversify';
import 'reflect-metadata';
import { Server } from './src/server/server';
import { INVERSIFY_TYPES } from './src/inversify/inversifyTypes';
import { initialiseRepositories, initialiseServer, initialiseDatastore, initialiseLogger } from './src/inversify/inversify';
import { DatabaseConnection } from './src/database/databaseConnection';

export class ServerInit {
  public readonly appServer: Server;
  private inversifyContainer: Container;
  public databaseConnection: DatabaseConnection;

  constructor() {

    this.inversifyContainer = this.initInversifyContainer();
    this.databaseConnection = new DatabaseConnection();
    this.databaseConnection.connect();

    // Create the express server
    this.appServer = this.inversifyContainer.get<Server>(INVERSIFY_TYPES.Server);
  }

  /**
   * Initialise service dependencies
   */
  private initInversifyContainer(): Container {
    const container = new Container();
    initialiseLogger(container);
    initialiseRepositories(container);
    initialiseDatastore(container);
    initialiseServer(container);
    return container;
  }
}
