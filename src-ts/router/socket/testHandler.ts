import { Server, Socket } from "socket.io";

export default async function TestHandler (io: Server, socket: Socket): Promise<any> {
    
    const createOrder = (payload) => {
        console.log(payload)
    }

    const readOrder = (orderId, callback) => {
        console.log(orderId, callback)
    }

    socket.on("order:create", createOrder);
    socket.on("order:read", readOrder);
}