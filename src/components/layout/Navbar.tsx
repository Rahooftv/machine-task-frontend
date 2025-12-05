import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, } from "lucide-react";
import Button from "../ui/Button";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="w-full h-20 px-6 bg-white shadow-lg fixed top-0 left-0 z-50 flex items-center justify-between backdrop-blur-sm bg-opacity-95">
      <Link  to="/" 
        className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
      > Task Management
      </Link>

      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
             
              <span className="text-sm font-medium text-green-700">{user.name }</span>
            </div>
            
          <Button
          onClick={logout}
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold 
                    text-white bg-gradient-to-r from-red-500 to-red-600 
                    rounded-lg hover:from-red-600 hover:to-red-700 
                    transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;