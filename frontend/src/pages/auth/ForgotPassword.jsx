import { Link } from "react-router-dom";

const ForgotPassword = () => {
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

        <h2 className="text-xl font-semibold text-center text-gray-800">
          Reset Your Password
        </h2>

        <p className="text-sm text-center text-gray-600 mb-4">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-deep text-sm"
            placeholder="you@example.com"
            required
          />

          <button
            type="submit"
            className="w-full bg-deep hover:bg-deep/90 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <Link to="/login" className="text-deep hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
