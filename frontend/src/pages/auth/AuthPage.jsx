import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, User } from "lucide-react";
import { AdminContext } from "../../context/AdminContext";

const AuthPage = ({ defaultMode = "login" }) => {
  const [isRegister, setIsRegister] = useState(defaultMode === "register");
  
  const [role, setRole] = useState("student");
  const [isForgot, setIsForgot] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { setAtoken } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, password } = formData;

    if (!email || (!isForgot && !password) || (isRegister && !fullName)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isForgot) {
      toast.info(`Password reset link sent to ${email}`);
      setIsForgot(false);
      return;
    }

    // Dummy auth logic — replace with real API
    const fakeToken = `${role}_token_123`;
    localStorage.setItem("atoken", fakeToken);
    setAtoken(fakeToken);

    toast.success(`${isRegister ? "Registered" : "Logged in"} as ${role}`);

    // Redirect based on role
    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "tutor") navigate("/tutor-dashboard");
    else navigate("/");
  };

  const availableRoles = isRegister
    ? ["student", "tutor"]
    : ["student", "tutor", "admin"];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-deep to-secondary">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold flex justify-center items-center gap-x-2 text-deep"
        >
          <span className="inline-flex items-center justify-center p-2 h-10 w-10 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
            T
          </span>
          utorFinder
        </Link>

        <h2 className="text-2xl font-semibold text-center text-gray-800 leading-tight">
          {isForgot
            ? "Reset Password"
            : isRegister
            ? "Create Account"
            : "Welcome Back"}
        </h2>

        {/* Role Selector */}
        {!isForgot && (
          <div className="flex justify-center gap-3">
            {availableRoles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                  role === r
                    ? "bg-deep text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <span className="px-3 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full py-2 px-2 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <span className="px-3 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-2 px-2 outline-none"
              />
            </div>
          </div>

          {!isForgot && (
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <span className="px-3 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full py-2 px-2 outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-deep text-white py-2 rounded-md hover:bg-deep/90 transition"
          >
            {isForgot
              ? "Send Reset Link"
              : isRegister
              ? `Register as ${role}`
              : `Login as ${role}`}
          </button>
        </form>

        {/* Forgot password link (only on login) */}
        {!isRegister && !isForgot && (
          <div className="text-center">
            <button
              onClick={() => setIsForgot(true)}
              className="text-deep hover:underline inline-block text-sm"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Bottom toggle links */}
        <div className="text-center text-sm mt-2 text-gray-600 space-y-1">
          {isForgot ? (
            <button
              onClick={() => setIsForgot(false)}
              className="text-deep hover:underline block"
            >
              ← Back to Login
            </button>
          ) : isRegister ? (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-deep hover:underline"
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setIsRegister(true);
                  setRole("student");
                }}
                className="text-deep hover:underline"
              >
                Register
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
