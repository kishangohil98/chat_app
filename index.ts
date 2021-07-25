import { ServerInit } from './server';
import * as dotenv from 'dotenv';

dotenv.config();
let serverInit: ServerInit | undefined;

if (!serverInit) {
    serverInit = new ServerInit();
}
serverInit.appServer.listen();
