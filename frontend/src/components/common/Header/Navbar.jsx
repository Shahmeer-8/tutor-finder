import { Link, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Navbar = ({ menuOpened, toggleMenu, containerStyles }) => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/tutors", label: "FindTutors" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={containerStyles}>
      {/* Mobile Only: Close Button */}
      {menuOpened && (
        <>
          <FaTimes
            onClick={toggleMenu}
            className="text-2xl self-end cursor-pointer mb-4 text-secondary"
          />
          <Link
            to="/"
            className="text-[24px] font-bold leading-[120%] flex items-center"
          >
            <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
              T
            </span>
            utorFinder
          </Link>
        </>
      )}

      {/* Navigation Links */}
      {navItems.map(({ to, label }) => (
        <NavLink
          key={label}
          to={to}
          onClick={() => menuOpened && toggleMenu()}
          className={({ isActive }) =>
            `relative px-2 py-1 block text-[16px] font-medium transition-colors duration-300
     ${isActive ? "text-secondary" : " hover:text-secondary"}
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:rounded-full 
     after:bg-secondary after:transition-all after:duration-300 
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
