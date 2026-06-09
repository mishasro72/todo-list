import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigat = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigat("/todos", { replace: true });
    else {
      navigat("/login", { replace: true });
    }
  }, [isAuthenticated, navigat]);

  return (
    <div>
      <p>Redirecting ...</p>
    </div>
  );
}
