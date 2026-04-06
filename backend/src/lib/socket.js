import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
});

// Apply authentication middleware
io.use(socketAuthMiddleware);

// We will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

// This is for storing online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
    const userId = socket.userId;

    console.log("User connected:", socket.user.fullName);

    // Initialize array if not exists
    if (!userSocketMap[userId]) {
        userSocketMap[userId] = [];
    }

    // Add this socket
    userSocketMap[userId].push(socket.id);

    // Broadcast online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.user.fullName);

        const sockets = userSocketMap[userId] || [];

        // Remove this socket
        userSocketMap[userId] = sockets.filter(id => id !== socket.id);

        // Remove user if no sockets left
        if (userSocketMap[userId].length === 0) {
            delete userSocketMap[userId];
        }

        // Broadcast updated list
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };