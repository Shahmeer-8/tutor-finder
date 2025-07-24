import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BecomeATutor = () => {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100 py-20 px-6 sm:px-12">
      {/* Floating Stickers */}
      <motion.div
        className="absolute top-15 left-50 bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
        initial={{ opacity: 0, x: -60, rotate: -30 }}
        whileInView={{ opacity: 1, x: 0, rotate: -9 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
      >
        Teach & Inspire
      </motion.div>

      <motion.div
        className="absolute top-30 right-70 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
        initial={{ opacity: 0, x: 60, rotate: 10 }}
        whileInView={{ opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
      >
        Work Remotely
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/4 bg-rose-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
        initial={{ opacity: 0, y: 50, rotate: 25 }}
        whileInView={{ opacity: 1, y: 0, rotate: 9 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
      >
        Earn with Passion
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-deep mb-6 font-primary"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Become a Tutor
        </motion.h2>

        <motion.p
          className="text-deep text-lg sm:text-xl max-w-3xl mx-auto mb-8 font-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Share your knowledge, inspire students, and earn doing what you love.
          Join our growing tutor community and start making a difference today.
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link to="/register">
            <button className="cursor-pointer bg-secondary hover:bg-secondary-600 text-deep font-bold py-3 px-8 rounded-full transition duration-300 text-lg font-secondary shadow-md">
              Join as Tutor
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeATutor;
