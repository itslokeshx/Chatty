import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    
    // Client-side validation
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username.trim(),
          password: password,
        }),
      });
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      
      const data = isJson ? await response.json() : { message: "Unexpected error" };
      
      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name || username);
        navigate("/chat");
      } else {
        // Handle specific error cases based on status code
        if (response.status === 404) {
          setErrors({ username: "Username not found" });
        } else if (response.status === 401) {
          setErrors({ password: "Incorrect password" });
        } else {
          setErrors({ general: data.message || "Login failed. Please try again." });
        }
      }
    } catch (err) {
      setErrors({ general: "Connection failed. Please check your internet." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">Welcome back to CHATTY</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="auth-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              {errors.general}
            </div>
          )}
          
          <div className="input-group">
            <label className="input-label">Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                className={`auth-input ${errors.username ? 'error' : ''}`}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: null });
                }}
              />
            </div>
            {errors.username && <span className="input-error">{errors.username}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className={`auth-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M3 3l18 18"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="input-error">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={isLoading || !username.trim() || !password}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.75rem' }}>
            <Link to="/" style={{ fontWeight: 400 }}>← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
