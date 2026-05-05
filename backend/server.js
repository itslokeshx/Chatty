import express from "express";
import bcrypt from "bcrypt";

const app = express();
const PORT = 8000;
const salts = 10;
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

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salts);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json(users);
  } catch (error) {
    res.json({ error: "user creation failed!" });
  }
});
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
