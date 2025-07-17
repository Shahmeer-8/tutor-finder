import { AppContext } from "@/context/AppContext";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Calendar, Clock, Star } from "lucide-react";
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

          startTime.setMinutes(startTime.getMinutes() + 60);
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
    <div className="font-secondary min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="py-8 mx-auto max-w-4xl px-6">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="relative h-48 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-900">
            <div className="absolute inset-0 bg-black/20" />

            {/* Profile Section */}
            <div className="relative flex items-end h-full p-8">
              <div className="flex items-end gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={tutorInfo.image || "/placeholder.svg"}
                    alt={`${tutorInfo.name} image`}
                    className="w-20 h-20 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${
                      tutorInfo.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>

                {/* Name and Title */}
                <div className="text-white mb-4">
                  <h1 className="text-sm md:text-3xl font-bold">{tutorInfo.name}</h1>
                  <p className="text-blue-200 text-sm md:text-lg font-medium">{tutorInfo.qualification}</p>
                </div>
              </div>

              {/* Follow Button */}
              <div className="ml-auto mb-4">
                <Button className="cursor-pointer bg-white text-deep hover:bg-gray-100 font-semibold sm:text-lg px-2 py-0 md:px-8 md:py-2  rounded-full">
                  BOOK NOW
                </Button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-deep">{tutorInfo.totalSessions}</div>
                <div className="text-gray-600 text-sm">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-deep">{tutorInfo.rating}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-deep ">{tutorInfo.experience}</div>
                <div className="text-gray-600 text-sm">Experience</div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-deep">
                  <Calendar className="w-5 h-5 text-deep" />
                  <span className="font-bold font-primary">Joined:</span>
                  <span>{tutorInfo.joinedDate}</span>
                </div>

                <div className="flex items-center gap-3 text-deep">
                  <MapPin className="w-5 h-5 text-deep" />
                  <span className="font-bold font-primary">Location:</span>
                  <span>
                    {tutorInfo.location.city}, {tutorInfo.location.country}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-gray-700">
                  <span className="font-bold font-primary text-deep">Email:</span>
                  <span className="ml-2">{tutorInfo.email}</span>
                </div>

                <div className="text-gray-700">
                  <span className="font-bold font-primary text-deep">Phone:</span>
                  <span className="ml-2">{tutorInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Subject and Fee Info */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h5 className="font-semibold text-lg mb-1 text-deep">Subject</h5>
                  <p className="text-slate-600">{tutorInfo.subject}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-lg mb-1 text-deep">Fee</h5>
                  <p className="text-slate-600">{tutorInfo.fee} / hour</p>
                </div>
                <div>
                  <h5 className="font-semibold text-lg mb-1 text-deep">Status</h5>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      tutorInfo.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tutorInfo.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 text-deep">About</h4>
              <p className="text-gray-700 leading-relaxed">{tutorInfo.about}</p>
            </div>

            {/* Booking Section */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 text-white">
              <h5 className="text-xl mb-4 font-bold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Booking Slots (1 Hour Sessions)
              </h5>

              {/* Days */}
              <div className="flex gap-3 pb-4 overflow-x-auto">
                {availableSlots.map((slots, index) => (
                  <div
                    key={index}
                    onClick={() => setselectedDayIndex(index)}
                    className={`text-center py-4 min-w-16 rounded-xl cursor-pointer transition-all ${
                      selectedDayIndex === index
                        ? "bg-white text-deep shadow-lg"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    <div className="text-sm font-medium">{slots[0] && dayOfWeek[slots[0].DataTime.getDay()]}</div>
                    <div className="text-lg font-bold">{slots[0] && slots[0].DataTime.getDate()}</div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="mt-4">
                <div className="flex gap-3 flex-wrap">
                  {availableSlots[selectedDayIndex]?.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        slot.time === selectedTime
                          ? "bg-white text-deep shadow-lg"
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                    >
                      {slot.time.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="cursor-pointer mt-6 w-full bg-white text-deep hover:bg-gray-100 font-semibold py-3 rounded-xl"
                disabled={!selectedTime}
              >
                Book 1-Hour Session {selectedTime && `at ${selectedTime}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
