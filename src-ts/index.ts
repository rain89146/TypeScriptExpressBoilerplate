import express, {Express} from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from "dotenv";
import EventListener from './lib/Util/EventListener';
import Events from './lib/Util/Enums/Events';
import Moment from './lib/Util/Moment';
import ExpressServer from './servers/ExpressServer';
import SocketServer from './servers/SocketServer';
import EventEmitter from 'events';

//  initialize dotenv file
dotenv.config();

//
const apiVersion = 'v1';

//
const apiPath = `/api/${apiVersion}`;

//  server configuration
const port = 1991;

//  event listener
const listener: EventEmitter = new EventListener().getListener();

//  initialize express
const expressApp: Express = express();

//  create a server
const serverInstance = http.createServer(expressApp);

//  create socket server
const socketServer = new SocketServer(new Server(serverInstance, { cors: {origin: "*"}}));

//  start the socket
socketServer.initiateSockerServer();

//  create express server
const expressServer = new ExpressServer(apiPath, expressApp);

//  start the express app
expressServer.initiateExpress();

//  listen to the server
serverInstance.listen(port, () => {
    listener.emit(Events.APPLICATION_STARTED, {
        port: port, 
        env: process.env.NODE_ENV, 
        date: Moment.dateToString()
    });
})