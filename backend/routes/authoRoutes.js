import { login, register } from "./controllers/authoController.js";

app.post("/login", login);
app.post("/register", register);
