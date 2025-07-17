import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Shield, Star, MapPin, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Tutors() {
  const { tutors, navigate, subjectData } = useContext(AppContext);
  const { subject: subjectParam } = useParams();

  const [showFilters, setShowFilters] = useState(false);
  const [filterTutors, setFilterTutors] = useState([]);

  // Search handler
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const filtered = tutors.filter((tutor) => {
      return (
        tutor.name.toLowerCase().includes(lowerQuery) ||
        tutor.subject.toLowerCase().includes(lowerQuery) ||
        (tutor.type && tutor.type.toLowerCase().includes(lowerQuery)) ||
        (tutor.fee && tutor.fee.toString().includes(lowerQuery))
      );
    });

    setFilterTutors(filtered);
  };

  // Filter by subject tab
  const handleSubjectClick = (subjectName) => {
    navigate(`/tutors/${subjectName}`);
    setShowFilters(false);
  };

  // Apply subject filter on URL change
  useEffect(() => {
    if (subjectParam && subjectParam !== "all") {
      const filtered = tutors.filter(
        (tutor) => tutor.subject.toLowerCase() === subjectParam.toLowerCase()
      );
      setFilterTutors(filtered);
    } else {
      setFilterTutors(tutors);
    }
  }, [subjectParam, tutors]);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="py-15 mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-deep font-primary">
              Unlock Your Potential with Skilled Tutors
            </h2>
            <p className="text-md md:text-lg text-gray-600 leading-relaxed font-secondary">
              Our platform is designed to empower professional tutors who are
              passionate about sharing knowledge and shaping futures through
              personalized education.
            </p>
          </div>

          {/* Orbit Animation */}
          <div className="relative w-60 h-75 md:w-96 md:h-96 mx-auto">
            <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-40 md:h-40 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
              <Link
                to="/"
                className="text-[24px] font-bold flex items-center gap-x-1 text-deep"
              >
                <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary rotate-[-31deg] rounded-full">
                  T
                </span>
                utorFinder
              </Link>
            </div>

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
                    src={tutor.image || "/placeholder.svg"}
                    alt={tutor.name}
                    title={tutor.name}
                    className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white shadow-md object-cover cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: `translate(-50%, -50%) rotate(-${angle}deg)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters Toggle for Mobile */}
        <div className="mt-10 sm:hidden flex justify-center font-secondary">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
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
          <Button
            onClick={() => handleSubjectClick("all")}
            variant="secondary"
            className={`cursor-pointer w-full sm:w-auto px-8  text-deep font-secondary ${
              subjectParam === "all" || !subjectParam
                ? "bg-deep text-white"
                : ""
            }`}
          >
            All
          </Button>

          {subjectData.map((subject, i) => (
            <Button
              onClick={() => handleSubjectClick(subject.name)}
              key={i}
              variant="secondary"
              className={`cursor-pointer w-full sm:w-auto px-8 font-secondary text-deep ${
                subject.name === subjectParam ? "bg-deep text-white" : ""
              }`}
            >
              {subject.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Box */}
      <div className="mt-6 flex justify-center font-secondary">
        <div className="relative w-full max-w-xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search by name, subject, type, or fee..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-4 pl-10 text-sm font-medium rounded-full bg-white text-deep placeholder-gray-500 border border-gray-500 focus:ring-2 focus:ring-deep focus:outline-none transition duration-200 font-primary shadow-sm"
          />
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-10 max-w-6xl mx-auto mt-10">
        {filterTutors.map((tutor, i) => (
          <div
            key={tutor._id || i}
            className="relative mb-9 md:mb-15 rounded-2xl bg-white shadow-custom border border-deep p-6 flex flex-col items-center text-center transition-all hover:shadow-2xl"
          >
            {/* Header Gradient */}
            <div className="relative w-full h-32 bg-gradient-to-br from-slate-400 via-[#162d71] to-slate-500 rounded-t-2xl overflow-hidden mb-10">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/80 via-[#162d71]/80 to-slate-500/80"></div>
              <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white rounded-t-[2rem]"></div>
            </div>

            {/* Avatar */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={tutor.image || "/placeholder.svg"}
                  alt={tutor.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {tutor.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                    <Shield className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Tutor Info */}
            <h3 className="text-xl md:text-2xl font-bold text-deep font-primary mt-2">
              {tutor.name}
            </h3>
            <p className="text-md text-tertiary mt-1">{tutor.subject}</p>
            <p className="text-sm text-gray-400 mt-2 mb-4 italic px-2">
              Passionate about teaching and helping.
            </p>

            {/* Meta Info */}
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
              {tutor.rating && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium text-sm">{tutor.rating}</span>
                </div>
              )}
            </div>

            {/* Type */}
            <div className="mb-4">
              <Badge variant="outline" className="text-xs">
                {tutor.type || "Online / In-Person"}
              </Badge>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-slate-900 to-deep hover:from-deep hover:to-slate text-white border-0 rounded-xl"
            >
              <Link to={`/session/${tutor._id}`}>View Profile</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
