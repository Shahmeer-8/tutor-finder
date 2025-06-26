import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-deep to-secondary px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <Link
          to="/"
          className="text-3xl font-bold flex items-center justify-center gap-x-2 text-deep mb-4"
        >
          <span className="inline-flex items-center justify-center p-2 h-10 w-10 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
            T
          </span>
          utorFinder
        </Link>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Your Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep text-sm"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep text-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-deep hover:bg-deep/90 text-white font-medium py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-deep hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
