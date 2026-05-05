import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 8000;
const users = [];
const SECRET_KEY = "QPafrMqOBuUPSpSj01N4+qDsUfGXibHINdNOz/0fPDk=";
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});

// app.get("/users", (req, res) => {
//   res.status(200).json(users);
// });

app.get("/content", authoMiddleware, (req, res) => {
  res.send("<h1>THIS CONTENT IS ONLY FOR LOGGED IN USERS!</h1>");
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
function authoMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send("Invalid token");
  }
}
app.post("/login", async (req, res) => {
  const name = req.body.name;
  const user = users.find((u) => u.name === name);
  if (!user) {
    return res.status(404).send("user not found,please register!");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ name: user.name }, SECRET_KEY);

      res.json({
        message: "Login successful",
        token: token,
      });
    } else {
      res.send("wrong password!");
    }
  } catch (error) {}
});
app.listen(8000, () => {
  console.log(`server running in the port ${PORT}`);
});
