import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.",
    author: "Samantha Johnson",
    position: "CEO and Co-founder of ABC Company",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    text: "Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.",
    author: "Isabella Rodriguez",
    position: "CEO and Co-founder of ABC Company",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    text: "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    author: "Gabrielle Williams",
    position: "CEO and Co-founder of ABC Company",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    text: "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.",
    author: "Victoria Thompson",
    position: "CFO and Co-founder of ABC Company",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    text: "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    author: "John Peter",
    position: "CEO and Co-founder of ABC Company",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    text: "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    author: "Natalie Martinez",
    position: "CEO and Co-founder of ABC Company",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    text: "Outstanding attention to detail and innovative solutions that transformed our digital presence completely.",
    author: "Michael Chen",
    position: "CTO and Co-founder of TechFlow Inc",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    text: "Their collaborative approach and creative vision helped us achieve results beyond our wildest dreams.",
    author: "Sarah Mitchell",
    position: "Marketing Director at InnovateCorp",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    text: "Exceptional creativity paired with strategic thinking - they've become an integral part of our success story.",
    author: "David Kumar",
    position: "Founder of StartupVenture",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

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
