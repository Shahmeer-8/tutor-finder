import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const services = [
    "1-on-1 Tutoring",
    "Homework Help",
    "Exam Preparation",
    "Math & Science",
    "Language Learning",
    "Flexible Scheduling",
    "Certified Tutors",
    "Online Sessions",
    "Free Trial Class",
    "Progress Tracking",
    "Subject Experts",
    "Essay Writing",
    "IELTS & TOEFL",
    "Coding Help",
  ];

  return (
    <section className="relative z-10 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-deep to-slate-900">
      {/* Glowing Circle Animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-emerald-400 opacity-20 rounded-full blur-2xl z-0 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[80vh] relative z-10 p-8 px-6 pb-24 sm:pb-32 md:p-20">
        <div className="text-center relative">
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find the Perfect <br/>
            Tutor for Learners <br />
            Anytime, Anywhere
          </motion.h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 z-10 mb-8">
            <Link to="/register">
              <button className="bg-secondary hover:bg-secondary-500 text-deep font-bold py-3 px-6 rounded-full transition duration-300 w-full sm:w-auto cursor-pointer">
                Register Now
              </button>
            </Link>
            <Link to="/tutors">
              <button className="bg-white hover:bg-gray-100 text-deep font-bold py-3 px-6 rounded-full transition duration-300 w-full sm:w-auto cursor-pointer">
                Book Session
              </button>
            </Link>
          </div>

          {/* Floating Tags */}
          <motion.div
            className="absolute top-12 -left-5 md:-left-20 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xl"
            initial={{ opacity: 0, x: -50, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -10 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
          >
            1-on-1 Tutoring
          </motion.div>

          <motion.div
            className="absolute top-32 right-8 md:right-16 bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xl"
            initial={{ opacity: 0, x: 50, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 10 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
          >
            Flexible Scheduling
          </motion.div>
        </div>
      </div>

      {/* Bottom Slider */}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary py-4 overflow-hidden z-0">
        <motion.div
          className="flex space-x-8 whitespace-nowrap px-4"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...services, ...services, ...services].map((service, index) => (
            <span key={index} className="text-deep font-bold text-sm sm:text-lg px-4">
              {service}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
