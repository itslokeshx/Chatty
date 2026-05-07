import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../authState.js";
import usersDetails from "../models/users.js";
import Messages from "../models/messages.js";

//GET: messages:

async function messages(req, res) {
  const allMessages = await Messages.find();
  res.status(200).json(allMessages);
}
//POST:Login !
async function login(req, res) {
  const name = req.body.name;
  const user = await usersDetails.findOne({ username: name });
  if (!user) {
    return res.status(404).send("user not found,please register!");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ name: user.username }, SECRET_KEY);

      res.json({
        name: name,
        message: "Login successful",
        token: token,
      });
    } else {
      res.send("wrong password!");
    }
  } catch (error) {}
}

//POST: Register !
async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const name = req.body.name;
    const password = hashedPassword;

    const user = await usersDetails.create({
      username: name,
      password: password,
    });

    res.status(201).json("Account created!");
  } catch (error) {
    res.json({ error: "user creation failed!" });
  }
}

function home(req, res) {
  res.send("<h1>Server is running!</h1>");
}

function content(req, res) {
  res.send(`<h1>Welcome ${req.user.name}</h1>`);
}
export { messages, login, register, home, content };
