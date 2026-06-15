import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";
import { Link } from "react-router";
import Navigation from "./Navigation";

export default function Header() {
  const { email, isAuthenticated } = useAuth();
  return (
    <div
      className="flex bg-surface justify-center items-center shadow-sm sticky gap-30 top-0"
      w-full
      z-50
    >
      <h1 className="headline-md font-bold text-primary-light p-4">
        Todo List
      </h1>
      <Navigation />
      {isAuthenticated && (
        <div>
          <span className="text-label-md font-label-md text-on-surface-variant pr-4">{email}</span>
          <Logoff />
        </div>
      )}
    </div>
  );
}
