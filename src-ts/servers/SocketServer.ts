import { Server, Socket } from "socket.io";
import SocketGeneralMiddleware from "../middleware/socket/SocketMiddleware";
import TestHandler from "../router/socket/testHandler";

export default class SocketServer {
    //
    private _io: Server;

    /**
     * Construct socket server
     * @param server 
     */
    constructor(server: Server) {
        this._io = server;
    }

    /**
     * Initiate socket server
     */
    initiateSockerServer(): void {

        //
        const onConnection = (socket: Socket) => {
            TestHandler(this._io, socket);
        }


        this._io
        .use((socket: Socket, next) => SocketGeneralMiddleware(socket, next))
        .on('connection', (socket) => {
            //
            onConnection(socket);

            //  listen to disconnect event
            socket.on('disconnect', ()=>{
                console.log('disconnected')
            })
        });
    }

    /**
     * Get the socket
     * @returns 
     */
    getSocket(): Server {
        return this._io;
    }
}