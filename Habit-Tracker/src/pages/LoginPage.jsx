import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle user registration
  const handleSignup = () => {
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const existingUser = localStorage.getItem("hg_user");

    if (existingUser) {
      const savedUser = JSON.parse(existingUser);

      if (savedUser.email === cleanEmail) {
        setError("An account with this email already exists.");
        return;
      }
    }

    const newUser = {
      name: name.trim() || cleanEmail.split("@")[0],
      email: cleanEmail,
      password: password,
    };

    localStorage.setItem("hg_user", JSON.stringify(newUser));

    setIsSignup(false);
    setName("");
    setPassword("");
    setError("Account created successfully. Please log in.");
  };

  // Handle user login
  const handleLogin = () => {
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const storedUser = localStorage.getItem("hg_user");

    if (!storedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    const savedUser = JSON.parse(storedUser);

    const isValidUser =
      savedUser.email === cleanEmail &&
      savedUser.password === password;

    if (isValidUser) {
      localStorage.setItem("hg_loggedIn", "true");
      navigate("/profile");
    } else {
      setError("Incorrect email or password.");
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  // Switch between Login and Signup
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #e8f0e3 0%, #f4f7f0 100%);
          padding: 20px;
        }

        .auth-card {
          background: white;
          padding: 40px 32px;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .auth-card h1 {
          font-size: 28px;
          margin-bottom: 8px;
          color: #2c5a37;
        }

        .auth-subtitle {
          color: #6b7c6a;
          margin-bottom: 28px;
          font-size: 15px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #dce5d8;
          border-radius: 10px;
          font-size: 15px;
        }

        .form-group input:focus {
          border-color: #3d7a4a;
        }

        .error-message {
          background: #fce8e8;
          color: #b3261e;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .success-message {
          background: #e8f5e9;
          color: #2c5a37;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .auth-btn {
          width: 100%;
          padding: 13px;
          background: #3d7a4a;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          margin-top: 8px;
        }

        .auth-btn:hover {
          background: #2c5a37;
        }

        .auth-switch {
          margin-top: 20px;
          font-size: 14px;
          color: #6b7c6a;
        }

        .auth-switch span {
          color: #3d7a4a;
          font-weight: 600;
          cursor: pointer;
        }

        .auth-switch span:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <h1>🌱 Habit Garden</h1>

          <p className="auth-subtitle">
            {isSignup ? "Create your account" : "Welcome back"}
          </p>

          {error && (
            <div
              className={
                error.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>

          <p className="auth-switch">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span onClick={toggleMode}>
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;