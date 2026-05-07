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
    return res.status(404).json({ message: "User not found" });
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
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

//POST: Register !
async function register(req, res) {
  try {
    // Check if user already exists
    const existingUser = await usersDetails.findOne({ username: req.body.name });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const name = req.body.name;
    const password = hashedPassword;

    const user = await usersDetails.create({
      username: name,
      password: password,
    });

    res.status(201).json({ message: "Account created!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
}

function home(req, res) {
  res.send("<h1>Server is running!</h1>");
}

function content(req, res) {
  res.send(`<h1>Welcome ${req.user.name}</h1>`);
}

export async function getAllUsers(req, res) {
  try {
    const users = await usersDetails.find({}, { username: 1, _id: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export { messages, login, register, home, content };
