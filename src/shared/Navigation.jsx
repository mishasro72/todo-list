import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router";

export default function Navigation() {
   const navlinksstyle = ({ isActive }) =>
    `label-md p-1 rounded-md transition-colors hover:bg-surface-container hover:text-on-surface ${
      isActive ? "text-primary-light font-semibold" : "text-on-surface-variant"
    }`;

  const { isAuthenticated } = useAuth();
  return (
    <div className="hidden md:flex justify-center items-center">
      <nav className="flex justify-center items-center w-full px-5 py-3 max-w-160 mx-auto gap-2">
        <ul className="list-none flex gap-3 p-0 justify-around">
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
