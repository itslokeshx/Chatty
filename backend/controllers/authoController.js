import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authoMiddleware } from "./middleware/authomiddleware.js";
async function login(req, res) {
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
}

async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json(users);
  } catch (error) {
    res.json({ error: "user creation failed!" });
  }
}

function home(req, res) {
  res.send("<h1>Server is running!</h1>");
}

function content(authoMiddleware, req, res) {
  res.send("<h1>THIS CONTENT IS ONLY FOR LOGGED IN USERS!</h1>");
}
export { login, register, home, content };
