import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "TutorFinder helped me find quality tutors in just a few clicks. It’s user-friendly, professional, and exceeded all my expectations!",
    author: "Sikander Nawaz",
    position: "CEO, TutorFinder",
    avatar: "https://avatars.githubusercontent.com/u/121254651?v=4",
  },
  {
    id: 2,
    text: "As the COO, I’ve seen first-hand how TutorFinder is transforming education by connecting passionate tutors with eager learners. Game changer!",
    author: "Isabella Rodriguez",
    position: "COO, TutorFinder",
    avatar: "https://avatars.githubusercontent.com/u/121254651?v=4",
  },
  {
    id: 3,
    text: "My Python tutor from TutorFinder explains concepts clearly and helps me build confidence step by step. Highly recommended!",
    author: "Gabrielle Williams",
    position: "Student, Python",
    avatar: "https://avatars.githubusercontent.com/u/121254651?v=4",
  },
  {
    id: 4,
    text: "Being a tutor on TutorFinder has been a wonderful experience. The platform is easy to use, and I’ve connected with motivated students.",
    author: "Sikander Nawaz",
    position: "Tutor, Computer",
    avatar: "https://avatars.githubusercontent.com/u/121254651?v=4",
  },
  {
    id: 5,
    text: "I found the perfect science tutor through TutorFinder! Sessions are interactive and have boosted my grades and interest in the subject.",
    author: "David Kumar",
    position: "Student, Science",
    avatar: "https://avatars.githubusercontent.com/u/121254651?v=4",
  },
  {
    id: 6,
    text: "Math was always tough for me, but my TutorFinder mentor made it fun and approachable. I actually look forward to learning now!",
    author: "Natalie Martinez",
    position: "Student, Math",
    avatar: "https://avatars.githubusercontent.com/u/121254651?v=4",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const groupedTestimonials = []
  for (let i = 0; i < testimonials.length; i += 3) {
    groupedTestimonials.push(testimonials.slice(i, i + 3))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % groupedTestimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [groupedTestimonials.length])

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-deep via-slate-900 to-deep overflow-hidden font-primary">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Words of praise from others about our presence
        </motion.h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {groupedTestimonials[currentIndex].map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#1a2557] border border-transparent hover:border-secondary text-left p-6 rounded-2xl shadow-custom transition-all duration-300 hover:rotate-[1deg] hover:scale-[1.03] cursor-pointer"
              >
                <Quote className="text-secondary w-6 h-6 mb-4" />
                <p className="text-gray-300 mb-6 text-base leading-relaxed font-secondary">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-secondary font-semibold">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
