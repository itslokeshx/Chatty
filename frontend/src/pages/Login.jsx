function Login() {
  return (
    <div>
      <h1>Enter your login credentials!</h1>
      <form>
        <label>Username:</label>
        <input type="text"></input>
        <label>Password:</label>
        <input type="password"></input>
        <button type="submit">Login!</button>
      </form>
    </div>
  );
}
export default Login;
