import React from "react";
import { useAuth } from "../context/AuthContext";
import Logoff from "../features/Logoff";
import { Link } from "react-router";
import Navigation from "./Navigation";

export default function Header() {
  const { email, isAuthenticated } = useAuth();
  return (
    <div
      className="flex bg-surface justify-center items-center shadow-sm sticky gap-30 top-0
      w-full
      z-50"
    >
      <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-4 flex flex-col md:flex-row justify-center items-center w-full">
        <h1 className="headline-md text-primary-light md:pr-10 whitespace-nowrap select-none">
          Todo List
        </h1>
        <Navigation />
        {isAuthenticated && (
          <div>
            <span className="text-label-md font-label-md text-on-surface-variant pl-10 pr-3">
              {email}
            </span>
            <Logoff />
          </div>
        )}
      </div>
    </div>
  );
}
