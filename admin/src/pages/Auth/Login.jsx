import  { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const { setAtoken } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 🥱 Please add the real backend login using Axios
    const fakeToken = `${userType}_token_123`;
    localStorage.setItem("atoken", fakeToken);
    setAtoken(fakeToken);

    toast.success(`Logged in as ${userType.toUpperCase()} successfully!`);

    navigate(userType === "admin" ? "/admin-dashboard" : "/tutor-dashboard");
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    toast.info(`Password reset link sent to ${email}`);
    setIsForgot(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side Image */}
      <div className="hidden lg:flex w-1/2 bg-deep text-white p-10">
        <div className="m-auto text-center">
          <h1 className="text-4xl font-bold leading-tight">
            Empowering Education,
            <br /> One Session at a Time
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-md mx-auto">
            Join{" "}
            <span className="text-secondary font-semibold">TutorFinder</span> to
            connect learners with expert tutors and unlock your full potential.
          </p>
          <div className="mt-8">
            <span className="inline-block px-4 py-2 bg-secondary text-deep rounded-full text-sm font-medium">
              Learn & Grow with Us
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 py-12 bg-white shadow-lg">
        {/* Logo */}
        <Link
          to="/"
          className="text-[22px] font-bold leading-[120%] mb-6 flex flex-col items-center"
        >
          <div className="flex items-center gap-x-2">
            <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
              T
            </span>
            utorFinder
          </div>
          <span className="text-xs bg-secondary text-tertiary mt-1 px-2 rounded-xl">
            {userType === "admin" ? "For Admin" : "For Tutor"}
          </span>
        </Link>

        {/* User Type Toggle */}
        <div className="mb-6 flex gap-4 cursor-pointer">
          <button
            onClick={() => setUserType("admin")}
            className={`px-4 py-2 rounded-md text-sm font-semibold border ${
              userType === "admin"
                ? "bg-deep text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setUserType("tutor")}
            className={`px-4 py-2 rounded-md text-sm font-semibold border ${
              userType === "tutor"
                ? "bg-deep text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Tutor
          </button>
        </div>

        {/* Form Area */}
        <div className="w-full max-w-md">
          {!isForgot ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-deep">
                  <span className="px-3 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-deep">
                  <span className="px-3 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-2 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-deep text-white py-2 rounded-md hover:bg-deep/90 transition"
              >
                Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Enter your registered email
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-deep">
                  <span className="px-3 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-2 outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-deep text-white py-2 rounded-md hover:bg-deep/90 transition"
              >
                Send Reset Link
              </button>
            </form>
          )}

          {/* Toggle Forgot / Back */}
          <div className="mt-4 text-sm text-right ">
            {!isForgot ? (
              <button
                onClick={() => setIsForgot(true)}
                className="text-deep hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            ) : (
              <button
                onClick={() => setIsForgot(false)}
                className="text-deep hover:underline cursor-pointer"
              >
                ← Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
