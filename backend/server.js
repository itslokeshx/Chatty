import express from "express";
import authoRoutes from "./routes/authoRoutes.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import Messages from "./models/messages.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();
app.use(cors());
const PORT = 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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
server.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
