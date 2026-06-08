import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Logoff() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      console.error(result.error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logoff
    </button>
  );
}