import Link from "next/link";
import Image from "next/image";
import { doSignOut } from "../firebase/FirebaseFunctions";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { FaHome, FaBook, FaCode, FaChartLine, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const VerticalNavbar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const auth = getAuth()
  const currentUser = auth.currentUser
  const uid = currentUser ? currentUser.uid : null

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

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'library', icon: FaBook, label: 'Library' },
    { id: 'practice', icon: FaCode, label: 'Practice' },
    { id: 'progress', icon: FaChartLine, label: 'Progress' },
    { id: 'support', icon: FaQuestionCircle, label: 'Support' },
    { id: 'settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <nav className="bg-base-200 w-64 min-h-screen p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <Link href={`/`}>
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        </Link>
        <Link href={`/`}>
        <span className="ml-2 text-2xl font-semibold text-primary">jsProdigy</span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center mb-8">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <Link href={`/profile/${uid}`}>
              <img src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
              </Link>
            </div>
          </div>
          <span className="ml-3 font-semibold">{user.displayName || user.email}</span>
        </div>
      )}

      <ul className="menu bg-base-200 w-full rounded-box flex-grow">
        {navItems.map((item) => (
          <li key={item.id} className={activeTab === item.id ? 'bordered' : ''}>
            <button onClick={() => setActiveTab(item.id)} className="flex items-center p-2">
              <item.icon className="w-6 h-6 mr-2" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between">
          <span>Theme</span>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              checked={theme === "night"}
              onChange={toggleTheme}
            />
            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          </label>
        </div>

        {user ? (
          <button onClick={handleSignOut} className="btn btn-outline btn-block">
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        ) : (
          <div className="space-y-2">
            <Link href="/login">
              <button className="btn btn-ghost btn-block">Login</button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default VerticalNavbar;
