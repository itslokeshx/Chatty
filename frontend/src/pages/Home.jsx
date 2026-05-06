import { Navigate, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Wlecome to chatty!</h1>
      <p>
        Global chatting application where the you can interact and ping with all
        users in the global chat!
      </p>
      <h3>
        Old user then{" "}
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login!
        </button>
      </h3>
      <h3>
        new to Chatty then{" "}
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Register!
        </button>
      </h3>
      <h3>
        Click here to go chat page!
        <button
          onClick={() => {
            navigate("/chat");
          }}
        >
          Chattyyyyy!
        </button>
      </h3>
    </div>
  );
}
export default Home;
