import express from "express";
import {
  login,
  register,
  home,
  content,
} from "../controllers/authoController.js";

const router = express.Router();
router.get("/", home);
router.get("/content", content);
router.post("/login", login);
router.post("/register", register);

export default router;
