import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loggedin, setLoggedin] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    setLoggedin(true);
    const data = await response.json();
    localStorage.setItem("token", data.token);
    navigate("/chat");
  }
  return (
    <div>
      <h1>Enter your login credentials!</h1>
      <form>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Login!
        </button>
      </form>
    </div>
  );
}
export default Login;
