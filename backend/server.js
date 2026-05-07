import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authoRoutes from "./routes/authoRoutes.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import Messages from "./models/messages.js";
import cron from "node-cron";

const app = express();
connectDB();
app.use(cors());
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// CORS origins from env or defaults
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"]
  : ["http://localhost:5173", "http://localhost:3000"];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("new_message", async (data) => {
    console.log(data);
    await Messages.create({
      username: data.username,
      text: data.text,
    });

    io.emit("receive_message", data);
  });
});

app.use(express.json());
app.use("/", authoRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Keep-alive cron job for Render (prevents sleep on free tier)
const startKeepAlive = () => {
  const BACKEND_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

  cron.schedule("*/14 * * * *", async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`);
      console.log(`Keep-alive ping: ${res.status} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error("Keep-alive ping failed:", error.message);
    }
  });

  console.log("Keep-alive cron started (pings every 14 minutes)");
};

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
  
  // Start keep-alive cron on Render
  if (process.env.RENDER) {
    startKeepAlive();
  }
});
