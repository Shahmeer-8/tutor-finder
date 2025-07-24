import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedTutors = () => {
  const { tutors, navigate} = useContext(AppContext);

  return (


    <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 xl:py-20 font-primary">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-deep mb-6 font-primary">
          Delivering Quality Education
        </h1>

        <p className="text-lg md:text-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our platform is designed to empower professional tutors who are
          passionate about sharing knowledge and shaping futures through
          personalized education.
        </p>
      </div>

      {/* Tutors Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
  {tutors.slice(0, 4).map((tutor) => (
    <div
      key={tutor._id}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      {/* Tutor Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={tutor.image}
          alt={`${tutor.name} - ${tutor.subject} tutor`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm text-gray-900">
            {tutor.rating}
          </span>
        </div>

        {/* Name & Subject on Image */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-lg font-bold">{tutor.name}</h3>
          <p className="text-sm text-gray-200">{tutor.subject}</p>
        </div>

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate(`/session/${tutor._id}`)}
            className="w-40 cursor-pointer"
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-40 cursor-pointer"
            onClick={() => {
              navigate(`/tutors`);
              scrollTo(0, 0);
            }}
          >
            Explore Tutors
          </Button>
        </div>
      </div>
    </div>
  ))}
</div>

    </section>
  );
  2;
};

export default FeaturedTutors;
