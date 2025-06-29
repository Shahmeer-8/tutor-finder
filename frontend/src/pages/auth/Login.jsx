import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication logic
    if (formData.email && formData.password) {
      toast.success("Logged in successfully!");
      navigate("/"); // redirect to home or dashboard
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-deep to-secondary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            className="text-[28px] font-bold leading-[120%] flex items-center gap-x-2 text-deep"
          >
            <span className="inline-flex items-center justify-center p-2 h-10 w-10 bg-secondary text-tertiary rotate-[-31deg] rounded-full shadow-md hover:rotate-[-20deg] transition-transform duration-300">
              T
            </span>
            utorFinder
          </Link>
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-deep focus:outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-deep focus:outline-none transition pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2 right-3 text-gray-500 hover:text-deep transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-deep text-white font-semibold py-2 rounded-md hover:bg-deep/90 transition duration-300"
          >
            Log In
          </Button>
        </form>

        {/* Extra links */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <Link
            to="/forgot-password"
            className="text-deep font-medium hover:underline transition"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-deep font-medium hover:underline transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
