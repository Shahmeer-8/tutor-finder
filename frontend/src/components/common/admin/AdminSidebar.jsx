import  { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext";
import {
  LayoutDashboard,
  BookOpenCheck,
  Users,
  UserPlus,
  LogOut,
} from "lucide-react";
import { AppContext } from "../../../context/AppContext";

const navItems = [
  {
    to: "/admin-dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    to: "/all-sessions",
    label: "Sessions",
    icon: <BookOpenCheck className="w-5 h-5" />,
  },
  {
    to: "/tutors-list",
    label: "Tutors List",
    icon: <Users className="w-5 h-5" />,
  },
  {
    to: "/add-tutor",
    label: "Add Tutor",
    icon: <UserPlus className="w-5 h-5" />,
  },
];

const AdminSidebar = ({ onNavItemClick }) => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const {navigate} = useContext(AppContext);
  // Logout Function
  const logout = ()=>{
    navigate('/')
    atoken && setAtoken('')
    atoken && localStorage.removeItem('atoken')
  }

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
          {atoken ? "For Admin" : "For Tutor"}
        </span>
      </Link>

      {atoken && (
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
        </nav>
      )}
    </aside>
  );
};

export default AdminSidebar;
