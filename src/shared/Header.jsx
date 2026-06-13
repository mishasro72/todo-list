import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";
import { Link } from "react-router";
import Navigation from "./Navigation";

export default function Header() {
  const { email, isAuthenticated } = useAuth();
  return (
    <div>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && (
        <div>
          <span>{email}</span>
          <Logoff />
        </div>
      )}
    </div>
  );
}
