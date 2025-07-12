import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I become a tutor on TutorFinder?",
    answer:
      "Click on the 'Join as Tutor' button, fill out your profile, submit required information, and our team will review your application within 48 hours.",
  },
  {
    question: "Is there any fee to join as a tutor?",
    answer:
      "No, joining TutorFinder as a tutor is completely free. We only charge a small service fee once a session is booked through the platform.",
  },
  {
    question: "Can I teach multiple subjects?",
    answer:
      "Absolutely! You can select multiple subjects you're proficient in while setting up your profile.",
  },
  {
    question: "How do I get matched with students?",
    answer:
      "Students search for tutors based on subjects, availability, and ratings. Your profile visibility increases with activity and positive reviews.",
  },
  {
    question: "Can I teach online or in-person?",
    answer:
      "Yes, you can choose your preferred mode of teaching — online, in-person, or both — and set your availability accordingly.",
  },
  {
    question: "How do I receive payments?",
    answer:
      "Payments are transferred to your provided account or wallet after session completion and confirmation from the student.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-deep mb-10 text-center font-primary">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left font-medium text-deep text-lg font-secondary"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-gray-600 mt-3 text-base font-secondary"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
