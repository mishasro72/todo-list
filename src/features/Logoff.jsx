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

  return <button onClick={handleLogout}>Logoff</button>;
}
