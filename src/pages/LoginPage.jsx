import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/todos";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLogginOn, setIsLogginOn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLogginOn(true);
      setAuthError(null);

      const result = await login(email, password);
      if (!result.success) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLogginOn(false);
    }
  }
  return (
    <>
      <h1>Logon</h1>
      <div>
        {authError && (
          <p style={{ color: "red", fontSize: "15px" }}>ERROR: {authError}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-input">Email: </label>
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password-input">Password: </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={isLogginOn}>
              {isLogginOn ? "Logging in..." : "Logon"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
