import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, location, navigate]);

  return isAuthenticated ? children : <p>Loading...</p>;
}
