import express from "express";
const app = express();
const PORT = 8000;

app.use("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
