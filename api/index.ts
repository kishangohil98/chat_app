import * as dotenv from 'dotenv';
dotenv.config();
    
import { ServerInit } from './server';

let serverInit: ServerInit | undefined;

if (!serverInit) {
    serverInit = new ServerInit();
}
serverInit.appServer.listen();
