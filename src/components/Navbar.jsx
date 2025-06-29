import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { user } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  // To show the NEW ENTRY btn ACTIVE whether its on private or public journals page
  const location = useLocation();
  const isActive =
    location.pathname === "/private-journals" ||
    location.pathname === "/public-journals";

  const handleLogout = () => {
    signOut(auth);
  };
  const [open, useOpen] = useState(false);

  return (
    <div className="2xl:px-36 flex items-center justify-between sticky top-0 h-18 w-ful shadow-sm bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 overflow-x-clip">
      {/* MOBILE MENU */}
      <div className="w-2 ml-2 md:hidden">
        {/* MENU LOGO */}
        <span
          onClick={() => {
            useOpen(!open);
          }}
          className="text-2xl"
        >
          {open ? "X" : "☰"}
        </span>

        {/* OPTION LIST */}
        <div
          onClick={() => {
            useOpen(!open);
          }}
          className={`md:hidden flex flex-col gap-4 w-36 p-5 absolute text-center font-mono font-bold rounded-xl border bg-white z-20" opacity-0 transition-all duration-200 ease-out scale-95 ${
            open ? "opacity-100 scale-100" : "pointer-events-none"
          } `}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "py-1 rounded bg-blue-100" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/write"
            className={({ isActive }) => (isActive ? "py-1 rounded bg-blue-100" : "")}
          >
            New Entry
          </NavLink>
          <NavLink
            to="/private-journals"
            className={({ isActive }) => (isActive ? "py-1 rounded bg-blue-100" : "")}
          >
            All Entries
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) => (isActive ? "py-1 rounded bg-blue-100" : "")}
          >
            Support
          </NavLink>
        </div>
      </div>

      {/* LOGO */}
      <Link
        to="/"
        className="px-2 py-1 ml-12 border rounded-xl bg-gray-600 shadow-2xl flex items-center cursor-pointer"
      >
        <img src="./src/assets/journalLogo.png" className="mr-0.5 w-8 h-8 " />
        <span className="text-white font-mono font-bold text-lg">
          MyJournal
        </span>
      </Link>

      {/*DESKTOP LINKS LIST */}
      <div className="hidden md:flex lg:gap-8 font-bold text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm lg:text-base cursor-pointer px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/write"
          className={({ isActive }) =>
            `text-sm lg:text-base cursor-pointer px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
        >
          New Entry ✎
        </NavLink>
        <NavLink
          to="/private-journals"
          className={`text-sm lg:text-base cursor-pointer px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white ${
            isActive ? "bg-gray-700 text-white" : ""
          }`}
        >
          All Entries
        </NavLink>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `text-sm lg:text-base cursor-pointer px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
        >
          Support
        </NavLink>
      </div>

      {/* USERNAME, LOGOUT DROPDOWN MENU and LOGIN BUTTON */}
      {user ? (
        <span
          onClick={() => setShowLogout(!showLogout)}
          className="h-11 flex items-center gap-1 lg:gap-2 bg-white font-bold text-gray-700 px-2 lg:px-4 py-2 rounded-full border hover:shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
        >
          <p className="hidden sm:flex">{user.displayName}</p>
          {/* USERNAME LOGO */}
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {user?.displayName?.[0]?.toUpperCase() || "U"}
          </div>
          {/* SVG-ICON */}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              showLogout ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {/* POP UP WHEN CLICKED ON USERNAME */}
          <span
            className={`flex flex-col right-1 top-16 w-36 md:w-44 p-2 absolute rounded-xl bg-white border z-20 text-start opacity-0 transition-all duration-200 ease-out scale-95 ${
              showLogout ? "opacity-100 scale-100" : "pointer-events-none"
            }`}
          >
            <Link
              to="/profile"
              className="w-40 px-4 py-2 rounded-3xl text-gray-700 font-mono font-bold cursor-pointer hover:bg-gray-200 transition"
            >
              Profile
            </Link>
            <Link
              onClick={handleLogout}
              to="/login"
              className="w-40 px-4 py-2 rounded-3xl text-gray-700 font-mono font-bold cursor-pointer hover:bg-gray-200 transition"
            >
              Log Out
            </Link>
          </span>
        </span>
      ) : (
        <Link
          to="/login"
          className="mr-2 md:mr-8 px-4 py-2 border rounded border-gray-600 text-gray-800 font-mono font-bold cursor-pointer transition-all bg-blue-100 hover:bg-blue-300 hover:text-black hover:border-l-4 hover:border-b-4 shadow"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
