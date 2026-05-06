import { useState } from "react";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    setRegistered(true);
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      {registered ? (
        <h1>Registeration succesfull!</h1>
      ) : (
        <>
          <h1>Create your account in Chatty!</h1>
          <form>
            <label>Name:</label>
            <input type="text"></input>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Create unique username!"
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
              Register!
            </button>
          </form>
        </>
      )}
    </div>
  );
}
export default Register;
