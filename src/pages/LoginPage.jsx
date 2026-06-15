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
      <main className="flex-grow flex items-center justify-center px-5 py-24">
        <div className="w-full max-w-100 bg-surface-container-lowest border border-outline-variant rounded-xl elevation-level-1 overflow-hidden">
          <div className="relative h-32 bg-primary-container-light overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 512 512"
                className="w-16 h-16 text-on-primary-container-light stroke-3 drop-shadow-sm"
              >
                <title>Cloud Done Outline SVG Icon</title>

                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M400 240c-8.89-89.54-71-144-144-144c-69 0-113.44 48.2-128 96c-60 6-112 43.59-112 112c0 66 54 112 120 112h260c55 0 100-27.44 100-88c0-59.82-53-85.76-96-88Z"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M317 208L209.2 336L163 284.8"
                />
              </svg>
            </div>
          </div>

          <div className="p-8 pt-10 pb-20">
            <div className="mb-8 text-center">
              <h1 className="headline-md text-on-surface mb-2">Logon</h1>
              <p className="text-sm text-on-surface-variant">
                Welcome back. Let's get things done.
              </p>
            </div>
            <div>
              {authError && (
                <p className="body-sm font-semibold text-on-error-container m-0">ERROR: {authError}</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="pb-3">
                  <label
                    htmlFor="email-input"
                    className="block text-sm font-semibold text-on-surface-variant ml-1 py-2"
                  >
                    Email{" "}
                  </label>
                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5"
                    >
                      <title>Baseline Mail Outline SVG Icon</title>
                      <path
                        fill="currentColor"
                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V8l8 5l8-5zm-8-7L4 6h16z"
                      />
                    </svg>
                    <input
                      className="leading-5 w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none transition-all placeholder:text-outline"
                      type="email"
                      id="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div className="pb-3">
                  <label
                    className="block
                    text-sm
                    font-semibold
                    text-on-surface-variant"
                    htmlFor="password-input"
                  >
                    Password{" "}
                  </label>
                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none z-10"
                    >
                      <title>Bxs Lock SVG Icon</title>
                      <path
                        fill="currentColor"
                        d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"
                      />
                    </svg>
                    <input
                      className="w-full flex items-center leading-none pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none transition-all placeholder:text-outline text-on-surface"
                      id="password-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <div>
                  <button className="w-full bg-primary-light text-on-primary-light py-3.5 rounded-lg font-bold text-md shadow-sm hover:bg-primary-container active:scale-95 transition-all duration-200" type="submit" disabled={isLogginOn}>
                    {isLogginOn ? "Logging in..." : "Logon"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
