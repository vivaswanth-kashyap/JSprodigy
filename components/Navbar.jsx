import Link from "next/link";
import Image from "next/image";
import { doSignOut } from "../firebase/FirebaseFunctions";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { useAuth } from "../contexts/AuthContext";
import { Bell } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const body = document.querySelector("body");
    body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSignOut = async () => {
    try {
      await doSignOut();
      // Redirect to the login page or update the UI as needed
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <Link href="/" className="flex items-center">
            <Image src="/newLogo.svg" alt="Logo" width={60} height={60} />
            <span className=" text-2xl font-semibold text-primary">JSProdigy</span>
          </Link>
        </div>
        <div className="navbar-end space-x-4">
          {user ? (
            <div className="flex flex-row">
              <div className="flex justify-center items-center p-4">
                <Bell className="h-8 w-8" />
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <Link href={`/profile/${user.uid}`}>
                      <button>Profile</button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm rounded-btn">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm rounded-btn ml-2">
                Sign Up
              </Link>
            </>
          )}
          <div className="swap swap-rotate" onClick={toggleTheme}>
            {/* ... */}
            <input
              type="checkbox"
              id="theme-toggle"
              className="swap-toggle"
              checked={theme === "night"}
              onChange={toggleTheme}
            />
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on fill-white w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;