import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/login");
    } else {
      console.error(result.error);
    }
  };

  return (
    <button
      className="bg-surface-container-low text-primary-light px-3 py-1 rounded-lg text-label-md font-label-md hover:bg-surface-container-high active:scale-95 transition-all duration-200"
      onClick={handleLogout}
    >
      Logoff
    </button>
  );
}
