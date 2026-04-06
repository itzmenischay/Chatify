import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // Parse cookies safely
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const token = cookies.jwt;

        if (!token) {
            console.log("Socket rejected: No token");
            return next(new Error("Unauthorized"));
        }

        // Verify token
        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        // Fetch user from DB
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            console.log("Socket rejected: User not found");
            return next(new Error("Unauthorized"));
        }

        // Attach user to socket
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated: ${user.fullName}`);
        console.log("Incoming cookies:", socket.handshake.headers.cookie);

        next();
    } catch (error) {
        console.log("Socket auth error:", error.name, error.message);
        next(new Error("Unauthorized"));
    }
};