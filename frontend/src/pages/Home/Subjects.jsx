import React from "react";
import { Link } from "react-router-dom";
import { subjectData } from "../../data/data";

const Subjects = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-14 xl:py-16 bg-deep/20">
      {/* Title */}
      <div className="max-w-lg mx-auto text-center pb-14">
        <h3 className="text-4xl md:text-5xl font-bold text-deep mb-6 font-primary">
          Explore By Subjects
        </h3>
        <p className="text-md text-gray-600 font-primary">
          Discover subjects that spark your interest and sharpen your skills.
          Learn from expert tutors in math, science, coding, and more.
        </p>
      </div>

      {/* Container for subject data */}
      <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2">
        {subjectData.map((subject, i) => (
          <Link
            key={i}
            onClick={() => scrollTo(0, 0)}
            to={`/tutors/${subject.name}`}
            className="flex items-center justify-center flex-col bg-white backdrop-blur-md border border-deep/30 rounded-xl h-35 w-40 transition-all duration-300 hover:bg-secondary hover:scale-105 shadow-custom"
          >
            <img
              src={subject.image}
              alt={subject.name}
              height={55}
              width={55}
            />
            <h5 className="text-sm md:text-sm mb-2 font-bold mt-3 font-secondary text-deep">
              {subject.name}
            </h5>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Subjects;
