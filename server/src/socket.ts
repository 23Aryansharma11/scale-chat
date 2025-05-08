import { Server, Socket } from "socket.io";
import { produceMessage } from "./helper.kafka.js";

interface CustomSocket extends Socket {
    room?: string;
}

export function setupSocket(io: Server) {
    io.use((socket: CustomSocket, next) => {
        const room =
            socket.handshake.auth?.room || socket.handshake.headers.rooom;

        if (!room) {
            return next(new Error("Invalid room"));
        }

        socket.room = room;
        next();
    });

    io.on("connection", (socket: CustomSocket) => {
        // Join the room
        socket.join(socket.room);

        socket.on("message", async (data) => {
            await produceMessage(process.env.KAFKA_TOPIC, data);
            socket.to(socket.room).emit("message", data);
        });

        socket.on("disconnect", (socket) => {
            console.log("The socket disconneced");
        });
    });
}
