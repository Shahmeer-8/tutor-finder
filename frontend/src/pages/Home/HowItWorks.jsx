import React from "react";
import { UserPlus, Search, MessageCircle, BookOpen } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your account and tell us about your learning needs and preferences.",
  },
  {
    icon: Search,
    title: "Find Tutors",
    description:
      "Browse verified tutors in your city and subject area with detailed profiles.",
  },
  //   {
  //     icon: MessageCircle,
  //     title: "Send Inquiry",
  //     description: "Contact tutors directly and discuss your requirements and schedule.",
  //   },
  {
    icon: BookOpen,
    title: "Start Learning",
    description:
      "Begin your 2-day free trial and experience personalized tutoring.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <section className="py-20 bg-gray-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started with TutorFinder is simple. Follow these easy
              steps to find your perfect tutor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-deep rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary">
                  <step.icon className="h-8 w-8 text-white group-hover:text-deep transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
