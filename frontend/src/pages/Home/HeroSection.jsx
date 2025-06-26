import React from "react";
import { Link } from "react-router-dom";
import { Button} from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative z-10 w-full bg-deep mt-4">
  <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 items-center px-6 lg:px-12  pt-12 pb-12 lg:pb-0" >
    
    {/* Left Content */}
    <div className="text-white max-w-xl mt-3 text-xs md:text-sm">
      <span className="ring-1 ring-white/30 max-w-72 px-3 rounded-3xl inline-block mb-4">
        <span className="text-secondary">#1 </span>
        Trusted Online Tutoring Platform
      </span>
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
        Personalized 1-on-1 tutoring for Every Learner Anytime, Anywhere
      </h1>
      <p className="text-base mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
        delectus, earum exercitationem modi suscipit vel culpa modi suscipit
        vel culpa.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Button variant="custom">
          <Link to="/register">Register Now</Link>
        </Button>
        <Button variant="secondary" >
          <Link to="/tutors">Book Session</Link>
        </Button>
      </div>
    </div>

    {/* Right Image */}
    <div className="hidden md:flex items-end justify-end ">
      <img
        src="/src/assets/girl.png"
        alt="Girl with book"
        className="w-full max-w-xl md:max-w-2xl h-auto object-contain"
      />
    </div>
    
  </div>
</section>





  );
};

export default HeroSection;
