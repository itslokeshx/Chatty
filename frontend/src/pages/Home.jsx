import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <div className="landing-container">
      {/* Logo */}
      <div className="landing-brand">
        <div className="landing-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
        </div>
        <h1 className="landing-logo">CHATTY</h1>
      </div>

      {/* Tagline */}
      <p className="landing-subtitle">
        {isLoggedIn 
          ? (
            <>
              Welcome back, <strong>{username || 'friend'}</strong>
              <span className="landing-status">You're signed in</span>
            </>
          )
          : (
            <>
              Simple, fast messaging
              <span className="landing-status">Join the conversation</span>
            </>
          )
        }
      </p>
      
      {/* Actions */}
      <div className="landing-actions">
        {isLoggedIn ? (
          <>
            <button 
              className="landing-btn landing-btn-primary"
              onClick={() => navigate("/chat")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
              </svg>
              Open Messages
            </button>
            <button 
              className="landing-btn landing-btn-ghost"
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
              </svg>
              Sign In
            </button>
            <button 
              className="landing-btn landing-btn-secondary"
              onClick={() => navigate("/register")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8 7a4 4 0 118 0 4 4 0 01-8 0zm13 4v6m-3-3h6"/>
              </svg>
              Create Account
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="landing-info">
        <span>Real-time chat</span>
        <span>•</span>
        <span>Secure</span>
        <span>•</span>
        <span>Free</span>
      </div>
    </div>
  );
}

export default Home;
