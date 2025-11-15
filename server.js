// server.js
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import setupSocket from "./socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Create HTTP server from Express app
const server = http.createServer(app);

// Init Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

// Attach io to app so controllers can use it
app.set("io", io);

// Setup socket events
setupSocket(io);

// Connect DB then start server
async function start() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
