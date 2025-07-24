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
      <section className="py-20 bg-deep/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-deep mb-4 font-primary">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-secondary">
              Getting started with TutorFinder is simple. Follow these easy
              steps to find your perfect tutor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 font-secondary bg-deep/20 p-5 rounded-2xl shadow-lg">
            {steps.map((step, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-deep rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary">
                  <step.icon className="h-8 w-8 text-white group-hover:text-deep transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-deep mb-3 font-primary">
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
