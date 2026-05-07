import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchUser() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
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
      <div className="landing-brand">
        <div className="landing-icon">
          <MessageSquare size={48} strokeWidth={1.5} />
        </div>
        <h1 className="landing-logo">Chatty</h1>
        <p className="landing-tagline">
          {isLoggedIn
            ? `Welcome back, ${username || 'friend'}.`
            : 'Talk freely. Nothing more, nothing less.'}
        </p>
      </div>

      {/* Subtle detail */}
      <div className="landing-features">
        <span className="feature-item">Real-time</span>
        <span className="feature-dot">·</span>
        <span className="feature-item">Fast</span>
        <span className="feature-dot">·</span>
        <span className="feature-item">Minimal</span>
      </div>

      <div className="landing-actions">
        {isLoggedIn ? (
          <>
            <button className="landing-btn landing-btn-primary" onClick={() => navigate("/chat")}>
              Open Chat
            </button>
            <button className="landing-btn landing-btn-ghost" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="landing-btn landing-btn-primary" onClick={() => navigate("/login")}>
              Get Started
            </button>
            <button className="landing-btn landing-btn-secondary" onClick={() => navigate("/register")}>
              Create Account
            </button>
          </>
        )}
      </div>

      <p className="landing-footer">Free forever · No ads</p>
    </div>
  );
}

export default Home;
