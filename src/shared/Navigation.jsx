import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router";

export default function Navigation() {
  // function navLinkStyle({ isActive }) {
  //   return {
  //     fontWeight: isActive ? "bold" : "normal",
  //     textDecoration: isActive ? "underline" : "none",
  //     padding: "2px 6px",
  //     borderRadius: 6,
  //     backgroundColor: isActive ? "#eee" : "transparent",
  //   };
  // }

  const navlinksstyle = ({ isActive }) =>
    `label-md px-gutter py-2 rounded-md transition-colors hover:bg-surface-container hover:text-on-surface ${
      isActive ? "text-primary-light font-semibold" : "text-on-surface-variant"
    }`;

  const { isAuthenticated } = useAuth();
  return (
    <div className="flex justify-center items-center">
      <nav className="flex justify-between items-center w-full px-5 py-3 max-w-160 mx-auto">
        <ul className="list-none flex gap-stack-gap p-0 justify-around">
          <NavLink className={navlinksstyle} to="/about">
            About
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink className={navlinksstyle} to="/todos">
                Todo page
              </NavLink>
              <NavLink className={navlinksstyle} to="/profile">
                Profile page
              </NavLink>
            </>
          ) : (
            <NavLink className={navlinksstyle} to="/login">
              Login page
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
}
