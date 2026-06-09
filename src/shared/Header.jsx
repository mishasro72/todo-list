import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";
import { Link } from "react-router";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h1>Todo List</h1>
      <Link to="/profile">Profile</Link>
      <br/>
      <Link to="fgfgfg">404 error test link</Link>
      {isAuthenticated && (
        <div>
          <span>Logon</span>
          <Logoff />
        </div>
      )}
    </div>
  );
}
