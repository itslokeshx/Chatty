import express from "express";
const app = express();
const PORT = 8000;
const users = [
  {
    name: "loki",
    password: "1234",
  },
];
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/users", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.status(201).json(users);
});
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
