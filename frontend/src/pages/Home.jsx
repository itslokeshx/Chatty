import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="landing-container">
      <h1 className="landing-logo">CHATTY</h1>
      <p className="landing-subtitle">
        A clean, simple way to chat with everyone.
      </p>
      
      <div className="landing-actions">
        {isLoggedIn ? (
          <>
            <button 
              className="landing-btn landing-btn-primary"
              onClick={() => navigate("/chat")}
            >
              Open Chat
            </button>
            <div className="landing-divider">or</div>
            <button 
              className="landing-btn landing-btn-secondary"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                navigate("/login");
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button 
              className="landing-btn landing-btn-primary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <div className="landing-divider">or</div>
            <button 
              className="landing-btn landing-btn-secondary"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
