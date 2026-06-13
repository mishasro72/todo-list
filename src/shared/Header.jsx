import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";
import { Link } from "react-router";
import Navigation from "./Navigation";

export default function Header() {
  const { email, isAuthenticated } = useAuth();
  return (
    <div className="flex bg-surface-variant justify-evenly items-center shadow-md sticky top-0">
      <h1 className="headline-md font-bold text-primary-light">
        Todo List
      </h1>
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
