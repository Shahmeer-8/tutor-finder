import { AppContext } from "@/context/AppContext";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
// Day of week

const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Session = () => {
  const { tutId } = useParams();
  const { tutors } = useContext(AppContext);
  const [tutorInfo, setTutorInfo] = useState(null);
  const [availableSlots, setavailableSlots] = useState([]);
  const [selectedDayIndex, setselectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  // Find tutor by ID from tutors list
  useEffect(() => {
    if (tutors?.length > 0 && tutId) {
      const tutor = tutors.find((t) => t._id === tutId);
      setTutorInfo(tutor);
    }
  }, [tutors, tutId]);

  // Generate slots for 7 days starting today
  useEffect(() => {
    if (!tutorInfo) return;

    const generateSlots = () => {
      const today = new Date();
      const slotsPerDay = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Fix: use i to get next days correctly

        const daySlots = [];
        const startTime = new Date(date);
        const endTime = new Date(date);

        if (i === 0) {
          startTime.setHours(Math.max(date.getHours() + 1, 10));
          startTime.setMinutes(date.getMinutes() > 30 ? 30 : 0);
        } else {
          startTime.setHours(10, 0, 0, 0);
        }
        endTime.setHours(21, 0, 0, 0);

        // Create slots every 30 minutes
        while (startTime < endTime) {
          const day = startTime.getDate();
          const month = startTime.getMonth() + 1;
          const year = startTime.getFullYear();
          const slotDate = `${day}/${month}/${year}`;
          const slotTime = startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit", // Fixed typo here
          });
          daySlots.push({
            DataTime: new Date(startTime),
            time: slotTime,
            dateString: slotDate,
          });

          startTime.setMinutes(startTime.getMinutes() + 30);
        }

        slotsPerDay.push(daySlots);
      }

      setavailableSlots(slotsPerDay);
    };

    generateSlots();
  }, [tutorInfo]);

  // Log available slots only when they update
  useEffect(() => {
    if (availableSlots.length > 0) {
      console.log("Available Slots:", availableSlots);
    }
  }, [availableSlots]);

  if (!tutorInfo) return <div>Loading...</div>;

  return (
    <div className=" py-28 mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_2fr] gap-x-12 gap-y-8">
        {/* Image Section */}
        <div className="relative w-full h-72 md:h-[444px] rounded-lg overflow-hidden shadow-lg">
          <img
            src={tutorInfo.image}
            alt={`${tutorInfo.name} image`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-start gap-6">
          {/* Name, Qualification, Availability */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-full">
            <div>
              <h3 className="text-3xl font-bold text-black">
                {tutorInfo.name}
              </h3>
              <h5 className="font-semibold text-gray-600 mt-1">
                {tutorInfo.qualification}
              </h5>
            </div>
            <span
              className={`mt-4 sm:mt-0 inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${
                tutorInfo.available
                  ? "bg-green-100 text-green-800 ring-1 ring-green-500"
                  : "bg-red-100 text-red-800 ring-1 ring-red-500"
              }`}
            >
              <span
                className={`mr-2 inline-block h-3 w-3 rounded-full ${
                  tutorInfo.available ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {tutorInfo.available ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Experience, Subject, Fee */}
          <div className="flex flex-col sm:flex-row sm:justify-between max-w-md gap-6 border border-gray-200 rounded-xl p-5 bg-indigo-50 shadow-sm text-black">
            <div className="flex flex-col items-center sm:items-start">
              <h5 className="font-semibold text-lg mb-1">Experience</h5>
              <p className="text-tertiary">{tutorInfo.experience}</p>
            </div>
            <div className="hidden sm:block border-l border-black" />
            <div className="flex flex-col items-center sm:items-start">
              <h5 className="font-semibold text-lg mb-1">Subject</h5>
              <p className="text-tertiary">{tutorInfo.subject}</p>
            </div>
            <div className="hidden sm:block border-l border-black" />
            <div className="flex flex-col items-center sm:items-start">
              <h5 className="font-semibold text-lg mb-1">Fee</h5>
              <p className="text-tertiary">{tutorInfo.fee} / 30 mins</p>
            </div>
          </div>

          {/* Location */}
          <div className="max-w-sm flex items-center gap-3 text-gray-700 ">
            <MapPin className="w-6 h-6 text-black" />
            <div className="flex items-center">
              <h5 className="font-semibold text-black mb-0 mr-2">Location:</h5>
              <p className="text-sm mb-0">
                {tutorInfo.location?.city || "City Unknown"},{" "}
                {tutorInfo.location?.country || "Country Unknown"}
              </p>
            </div>
          </div>

          {/* About */}
          <div className="max-w-3xl">
            <h4 className="text-xl font-bold mb-2">About Me</h4>
            <p className="text-gray-700 leading-relaxed">{tutorInfo.about}</p>
          </div>

          {/* Booking Session */}
          <div className=" ">
            <h5 className="text-sm md:text-xl mb-3 font-bold">Booking Slots</h5>
            {/* Days  */}
            <div className="flex gap-3  pb-2 overflow-x-auto no-scrollbar">
              {availableSlots.map((slots, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setselectedDayIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      selectedDayIndex === index
                        ? "bg-secondary"
                        : "border border-gray-200"
                    }`}
                  >
                    <div className="text-[14px] font-medium">
                      {slots[0] && dayOfWeek[slots[0].DataTime.getDay()]}
                    </div>
                    <div className="text-[14px] font-medium">
                      {slots[0] && slots[0].DataTime.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Time Slots */}
            <div className="w-full mt-4 overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <div className="flex gap-3 w-max max-w-[640px] px-1">
                  {availableSlots[selectedDayIndex]?.map((slot, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`flex items-center justify-center text-xs rounded-full min-w-20 px-4 py-2 cursor-pointer whitespace-nowrap ${
                        slot.time === selectedTime
                          ? "bg-secondary text-black"
                          : "text-gray-400 border border-gray-300"
                      }`}
                    >
                      {slot.time.toLowerCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button className="mt-4 cursor-pointer" variant="secondary">
              Book a session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
