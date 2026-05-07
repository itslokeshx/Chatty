import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <div className="landing-container">
      <h1 className="landing-logo">CHATTY</h1>
      <p className="landing-subtitle">
        {isLoggedIn 
          ? `Welcome back, ${username || 'friend'}` 
          : 'Simple messaging for everyone'}
      </p>
      
      <div className="landing-actions">
        {isLoggedIn ? (
          <>
            <button 
              className="landing-btn landing-btn-primary"
              onClick={() => navigate("/chat")}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px'}}>
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
                Open Messages
              </span>
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
              New Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
