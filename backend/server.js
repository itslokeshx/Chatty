import express from "express";
import authoRoutes from "./routes/authoRoutes.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const PORT = 8000;
const server = http.createServer(app);

const io = new Server(server);
app.use(express.json());
app.use("/", authoRoutes);
server.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
