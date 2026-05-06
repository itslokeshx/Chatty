import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../authState.js";

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

export { authoMiddleware };
