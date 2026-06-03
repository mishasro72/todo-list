import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h1>Todo List</h1>
      {isAuthenticated && (
        <div>
          <span>Loggon</span>
          <Logoff />
        </div>
      )}
    </div>
  );
}
