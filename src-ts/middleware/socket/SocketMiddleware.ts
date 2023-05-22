import { Server, Socket } from "socket.io";

export default async function SocketGeneralMiddleware(socket: Socket, next) {
    try {
        console.log('socket middle ware');

        //  get the hand shake object
        const {handshake, id} = socket;

        //  validation logic here
        console.log(handshake);

        //
        console.log(`socket id: ${id}`);
        
        //
        next();

    } catch (error) {

        //
        next(new Error(error.message));
    }
}