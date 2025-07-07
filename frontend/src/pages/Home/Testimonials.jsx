import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Malik",
    role: "Student",
    message: "This platform helped me improve my math skills fast!",
    image: "https://i.pravatar.cc/150?img=10",
    rating: 5,
  },
  {
    name: "Ahmed Khan",
    role: "Tutor",
    message: "Managing sessions is so smooth here. Love it!",
    image: "https://i.pravatar.cc/150?img=8",
    rating: 5,
  },
  {
    name: "Areeba Shah",
    role: "Student",
    message: "Tutors are really helpful and professional.",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 4,
  },
  {
    name: "Zain Raza",
    role: "Tutor",
    message: "I got students from different cities—amazing platform!",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    role: "Student",
    message: "The booking process is simple and convenient.",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 4,
  },
  {
    name: "Hassan Ali",
    role: "Tutor",
    message: "Very easy to manage teaching schedule and students.",
    image: "https://i.pravatar.cc/150?img=4",
    rating: 5,
  },
  {
    name: "Laiba Saeed",
    role: "Student",
    message: "Learned coding in just 2 months. Thank you!",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    name: "Bilal Rizvi",
    role: "Tutor",
    message: "Interactive interface and great support system.",
    image: "https://i.pravatar.cc/150?img=6",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    className="bg-[#1a2557] text-white rounded-2xl p-6 shadow-custom w-full max-w-sm"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center gap-4 mb-2">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
      />
      <div>
        <h4 className="font-semibold font-primary text-lg">{testimonial.name}</h4>
        <p className="text-sm text-gray-300">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-200 text-sm mb-3 font-secondary">"{testimonial.message}"</p>
    <div className="flex gap-1">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  </motion.div>
);

const Testimonials = () => {
  const cardsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerPage);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentTestimonials = testimonials.slice(
    currentSlide * cardsPerPage,
    currentSlide * cardsPerPage + cardsPerPage
  );

  return (
    <section className="bg-deep/20 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-deep font-primary mb-4">
          Words of praise from others about our presence.
        </h2>
        <p className="text-gray-600 font-secondary text-md max-w-xl mx-auto">
          Real feedback from students and tutors using our platform.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="bg-[#1a2557] text-white p-3 rounded-full shadow hover:bg-secondary disabled:opacity-30"
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-6 justify-center w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            {currentTestimonials.map((testimonial, i) => (
              <TestimonialCard key={`${testimonial.name}-${currentSlide}`} testimonial={testimonial} />
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={handleNext}
          className="bg-[#1a2557] text-white p-3 rounded-full shadow hover:bg-secondary disabled:opacity-30"
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
