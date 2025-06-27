import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Shield, Star, MapPin, Clock, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Tutors() {
  const { tutors, navigate, subjectData } = useContext(AppContext);
  const { subject: subjectParam } = useParams(); // for capturing subject from URL
  const [showFilters, setShowFilters] = useState(false);
  const [filterTutors, setfilterTutors] = useState([]);

  const handleSubjectClick = (subjectName) => {
    navigate(`/tutors/${subjectName}`);
    setShowFilters(false); // Hide filters after selection
  };

  // filter the tutor  based on subject
  useEffect(() => {
    if (subjectParam) {
      setfilterTutors(tutors.filter((tutor) => tutor.subject === subjectParam));
    } else {
      setfilterTutors(tutors); // Show all tutors if no subject selected
    }
  }, [subjectParam, tutors]);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="py-28 mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Unlock Your Potential with Skilled Tutors
            </h2>
            <p className="text-md md:text-lg text-gray-600 leading-relaxed">
              Our platform is designed to empower professional tutors who are
              passionate about sharing knowledge and shaping futures through
              personalized education.
            </p>
          </div>

          {/* Right: Solar Animation */}
          <div className="relative w-60 h-75 md:w-96 md:h-96 mx-auto">
            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-40 md:h-40 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
              <Link
                to="/"
                className="text-[24px] font-bold leading-[120%] flex items-center gap-x-1 text-tertiary"
                aria-label="TutorFinder Home"
              >
                <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
                  T
                </span>
                utorFinder
              </Link>
            </div>

            {/* Orbit Animation */}
            <div className="absolute top-1/2 left-1/2 w-65 h-65 md:w-80 md:h-80 rounded-full border border-indigo-800 animate-spin transform -translate-x-1/2 -translate-y-1/2">
              {tutors.slice(0, 7).map((tutor, i) => {
                const angle = (360 / 7) * i;
                const rad = (angle * Math.PI) / 180;
                const radius = 140;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);

                return (
                  <img
                    key={tutor._id}
                    src={tutor.image}
                    alt={tutor.name}
                    title={tutor.name}
                    className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white shadow-md object-cover cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: `translate(-50%, -50%) rotate(-${
                        (360 / 7) * i
                      }deg)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters Button (visible only on small screens) */}
        <div className="mt-10 sm:hidden flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            className="px-6 py-2"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters
          </Button>
        </div>

        {/* Subject Tabs */}
        <div
          className={`${
            showFilters ? "flex" : "hidden sm:flex"
          } flex-col sm:flex-row flex-wrap justify-center gap-4 mt-6`}
        >
          {subjectData.map((subject, i) => (
            <Button
              onClick={() => handleSubjectClick(subject.name)}
              key={i}
              variant="secondary"
              className={`w-full sm:w-auto px-8 cursor-pointer transition-all duration-300 ${
                subject.name === subjectParam
                  ? "bg-deep text-white hover:bg-deep/80"
                  : ""
              }`}
            >
              {subject.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Card for tutor */}
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-12">
        {filterTutors.map((tutor, i) => (
          <div
            key={tutor._id || i}
            className="relative mb-9 md:mb-15 rounded-2xl backdrop-blur-lg bg-white/10 border border-deep shadow-xl p-6 flex flex-col items-center text-center transition-all hover:shadow-2xl"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                src={tutor.image || "/placeholder.svg"}
                alt={tutor.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-secondary mb-4"
              />
              {/* Optional Verified Badge */}
              {tutor.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            {/* Name & Subject */}
            <h3 className="text-xl md:text-2xl font-semibold text-deep">
              {tutor.name}
            </h3>
            <p className="text-md text-tertiary mt-1">{tutor.subject}</p>

            {/* Bio/Tagline */}
            <p className="text-sm text-gray-400 mt-2 mb-4 italic text-center px-2">
              Passionate about teaching and helping.
            </p>

            {/* Location & Experience */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {tutor.location?.city && tutor.location?.country
                    ? `${tutor.location.city}, ${tutor.location.country}`
                    : "Location Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{tutor.experience || "2+ Years"}</span>
              </div>
              {/* Rating */}
              {tutor.rating && (
                <div className="flex items-center gap-1 mt-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-yellow-500 font-medium">
                    {tutor.rating}
                  </span>
                </div>
              )}
            </div>

            {/* Subject Type */}
            <div className="mb-4">
              <Badge variant="outline" className="text-xs">
                {tutor.type || "Online / In-Person"}
              </Badge>
            </div>

            {/* View Profile Button */}
            <Button
              asChild
              className="w-full mt-auto bg-deep hover:bg-white border-2 border-deep hover:text-deep"
            >
              <Link to={`/session/${tutor._id}`}>View Profile</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
