import express from "express";
import authoMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = 8000;
const users = [];
const SECRET_KEY = "QPafrMqOBuUPSpSj01N4+qDsUfGXibHINdNOz/0fPDk=";
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});

app.get("/content", authoMiddleware, (req, res) => {
  res.send("<h1>THIS CONTENT IS ONLY FOR LOGGED IN USERS!</h1>");
});

app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
