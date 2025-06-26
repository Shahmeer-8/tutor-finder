import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { TutorContext } from "../../context/TutorContext";
import { LayoutDashboard, Calendar, LogOut, User } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const navItems = [
  {
    to: "/tutor-dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    to: "/tutor-sessions",
    label: "MySessions",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    to: "/tutor-profile",
    label: "MyProfile",
    icon: <User className="w-5 h-5" />,
  },
];

const TutorSidebar = ({ onNavItemClick }) => {
  const { tutorToken, setTutorToken } = useContext(TutorContext);
  const { navigate } = useContext(AppContext);

  // Logout Function
  const logout = () => {
    navigate("/login");
    if (tutorToken) {
      setTutorToken("");
      localStorage.removeItem("tutorToken");
    }
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onNavItemClick?.();
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-deep text-white py-5 px-4 shadow-xl z-40 ">
      {/* Logo */}

      <Link
        to="/"
        className="text-[22px] font-bold leading-[120%] flex flex-col mb-10"
      >
        <div className="flex items-center gap-x-2">
          <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
            T
          </span>
          utorFinder
        </div>
        <span className="text-xs bg-secondary text-tertiary mt-1 px-2 rounded-xl w-max">
          {tutorToken ? "For Tutor" : "For Admin"}
        </span>
      </Link>

      {tutorToken && (
        <nav className="flex flex-col space-y-4 h-screen">
          {navItems.map(({ to, label, icon }, index) => (
            <NavLink
              key={index}
              to={to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-secondary text-deep font-semibold"
                    : "hover:bg-white/10 hover:text-secondary"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 mt-15 md:mt-40 px-4 py-3 text-red-400 hover:text-red-600 hover:bg-white/10 rounded-md transition cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

          {/* User Info */}
          <div className="p-4 border-t border-gray-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <User size={20} className="text-tertiary" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Sarah Johnson</p>
                <p className="text-gray-20 text-xs">Mathematics Tutor</p>
              </div>
            </div>
          </div>
        </nav>
      )}
    </aside>
  );
};

export default TutorSidebar;
