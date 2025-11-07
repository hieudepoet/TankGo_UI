import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FsUser } from "../data/types";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/userLocalStorage";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [user, setUser] = useState<FsUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) setUser(userData);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    removeUserFromLocalStorage();
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <header className={`w-full bg-yellow shadow-md py-3 ${className}`}>
      <div className="w-[70%] mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold ">
          Tank Battle
        </Link>

        {/* User section */}
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photo}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border-2 border-[--color-yellow]"
            />
            <span className="font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="ml-3 px-4 py-1.5 rounded-lg bg-[--color-yellow] text-black font-semibold hover:bg-[--color-dark-yellow] transition-colors"
            >
              Logout
            </button>
            <Link to={"/lobby"}>Play Now</Link>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="px-4 py-1.5 rounded-lg bg-[--color-yellow] text-black font-semibold hover:bg-[--color-dark-yellow] transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
