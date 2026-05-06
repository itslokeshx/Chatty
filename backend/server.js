import express from "express";
import authoRoutes from "./routes/authoRoutes.js";
const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/", authoRoutes);
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
