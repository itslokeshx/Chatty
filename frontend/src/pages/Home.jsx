import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  // Fetch username from API if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchUser() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="landing-container">
      {/* Brand */}
      <div className="landing-brand">
        <div className="landing-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
        </div>
        <h1 className="landing-logo">CHATTY</h1>
        <p className="landing-tagline">
          {isLoggedIn ? `Welcome back, ${username || 'friend'}` : 'Simple messaging for everyone'}
        </p>
        <p className="landing-hint">
          {isLoggedIn ? 'Jump back into the conversation' : 'Connect instantly with people worldwide'}
        </p>
      </div>

      {/* Features */}
      <div className="landing-features">
        <div className="feature-item">⚡ Real-time</div>
        <div className="feature-item">👥 Global</div>
        <div className="feature-item">🔒 Secure</div>
      </div>

      {/* How it works */}
      <div className="landing-steps">
        <div className="step">
          <span className="step-num">1</span>
          <span className="step-text">Sign up</span>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <span className="step-num">2</span>
          <span className="step-text">Join chat</span>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <span className="step-num">3</span>
          <span className="step-text">Connect</span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="landing-actions">
        {isLoggedIn ? (
          <>
            <button 
              className="landing-btn landing-btn-primary"
              onClick={() => navigate("/chat")}
            >
              Open Chat
            </button>
            <button 
              className="landing-btn landing-btn-ghost"
              onClick={() => {
                localStorage.removeItem("token");
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
            <button 
              className="landing-btn landing-btn-secondary"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="landing-footer">Free forever • No ads</p>
    </div>
  );
}

export default Home;
