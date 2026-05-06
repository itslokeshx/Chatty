function Register() {
  return (
    <div>
      <h1>Create your account in Chatty!</h1>
      <form>
        <label>Name:</label>
        <input type="text"></input>
        <label>Username:</label>
        <input type="text" placeholder="Create unique username!"></input>
        <label>Password:</label>
        <input type="password"></input>
        <button type="submit">Register!</button>
      </form>
    </div>
  );
}
export default Register;
