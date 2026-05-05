import express from "express";
import bcrypt from "bcrypt";

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

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json(users);
  } catch (error) {
    res.json({ error: "user creation failed!" });
  }
});

app.post("/login", async (req, res) => {
  const name = req.body.name;
  const user = users.find((u) => u.name === name);
  if (!user) {
    return res.status(404).send("user not found,please register!");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(`Welcome Home ${name}`);
    } else {
      res.send("wrong password!");
    }
  } catch (error) {}
});
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
