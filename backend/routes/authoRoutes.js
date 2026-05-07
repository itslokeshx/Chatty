import express from "express";
import {
  login,
  register,
  home,
  content,
  messages,
} from "../controllers/authoController.js";
import { authoMiddleware } from "../middleware/authomiddleware.js";

const router = express.Router();
router.get("/", home);
router.get("/content", authoMiddleware, content);
router.post("/login", login);
router.post("/register", register);
router.get("/messages", messages);

export default router;
