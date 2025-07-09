import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, AlignLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import Navbar from "./Navbar";
import tutorFemale from "../../../assets/tutors/tutor-female.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainHeader = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened((prev) => !prev);
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-deep/90 backdrop-blur-md text-white py-3 shadow-md border-b border-deep/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex items-center justify-between font-primary">
        {/* Logo */}
        <Link
          to="/"
          className="text-[22px] font-bold leading-[120%] flex items-center gap-x-1"
        >
          <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
            T
          </span>
          utorFinder
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex flex-1 justify-center">
          <Navbar containerStyles="flex gap-x-8" />
        </div>

        {/* Right: Profile or Login */}
        <div className="flex items-center gap-x-4">
          {/* Mobile Menu Icon */}
          <div className="xl:hidden">
            <AlignLeft
              size={28}
              strokeWidth={2.5}
              onClick={toggleMenu}
              className="cursor-pointer"
            />
          </div>

          {!isAuthenticated ? (
            <Button variant="custom">
              <Link to="/login" className="flex items-center space-x-1">
                <span>Login</span>
                <UserIcon className="w-5 h-5" />
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full overflow-hidden w-12 h-12 border border-gray-300 cursor-pointer">
                  <img
                    src={tutorFemale}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to="/my-profile"
                    className="cursor-pointer hover:text-deep"
                  >
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/my-sessions"
                    className="cursor-pointer hover:text-deep"
                  >
                    My Sessions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full text-red-500 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <Navbar
        menuOpened={menuOpened}
        toggleMenu={toggleMenu}
        containerStyles={`${
          menuOpened ? "flex" : "hidden"
        } xl:hidden absolute top-0 left-0 h-screen w-[230px] flex-col gap-y-6 px-6 pt-8 z-50 bg-deep/90 backdrop-blur-md text-white border-r border-white/10 shadow-lg`}
      />
    </header>
  );
};

export default MainHeader;
