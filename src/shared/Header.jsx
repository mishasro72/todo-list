import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";
import { Link } from "react-router";
import Navigation from "./Navigation";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h1>Todo List</h1>
      <Link to="fgfgfg">404 error test link</Link>
      <Navigation />
      {isAuthenticated && (
        <div>
          <span>Logon</span>
          <Logoff />
        </div>
      )}
    </div>
  );
}
