import express from "express";
import authoRoutes from "./routes/authoRoutes.js";
const app = express();
const PORT = 8000;
const users = [];
const SECRET_KEY = "QPafrMqOBuUPSpSj01N4+qDsUfGXibHINdNOz/0fPDk=";
app.use(express.json());
app.use("/", authoRoutes);
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
