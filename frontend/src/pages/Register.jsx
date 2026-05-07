import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/register`, {
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
      
      if (response.ok) {
        navigate("/login");
      } else {
        // Handle specific error cases based on status code
        if (response.status === 409) {
          setErrors({ username: "Username already taken" });
        } else {
          setErrors({ general: data.message || "Registration failed. Please try again." });
        }
      }
    } catch (err) {
      setErrors({ general: "Connection failed. Please check your internet." });
    } finally {
      setIsLoading(false);
    }
  }

  const EyeIcon = ({ visible }) => (
    visible ? (
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
    )
  );

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join CHATTY today</p>
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
                placeholder="Choose a username"
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
                placeholder="Create a password"
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
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            {errors.password && <span className="input-error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </div>
            {errors.confirmPassword && <span className="input-error">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={isLoading || !username.trim() || !password || !confirmPassword}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.75rem' }}>
            <Link to="/" style={{ fontWeight: 400 }}>← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
