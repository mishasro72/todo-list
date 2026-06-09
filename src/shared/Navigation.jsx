import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router";

export default function Navigation() {
  function navLinkStyle({ isActive }) {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
      padding: "2px 6px",
      borderRadius: 6,
      backgroundColor: isActive ? "#eee" : "transparent",
    };
  }
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <nav>
        <ul
          style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}
        >
          {/* <NavLink style={navLinkStyle} to="/" end>
            Home page
          </NavLink> */}
          <NavLink style={navLinkStyle} to="/about">
            About
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink style={navLinkStyle} to="/todos">
                Todo page
              </NavLink>
              <NavLink style={navLinkStyle} to="/profile">
                Profile page
              </NavLink>
            </>
          ) : (
            <NavLink style={navLinkStyle} to="/login">
              Login page
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
}
