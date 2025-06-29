import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const MySessions = () => {
  const { tutors = [] } = useContext(AppContext); // i have no propr data so update it later 

  // Fallback dummy sessions if no data in context
  const dummySessions = [
    {
      id: "1",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Mr. Ali Raza",
      subject: "Mathematics",
      location: "Faisalabad, Pakistan",
      fee: "Rs. 2000",
      date: "2025-07-05",
      time: "4:00 PM",
      status: "Make Payment",
    },
    {
      id: "2",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "Ms. Sana Tariq",
      subject: "English",
      location: "Lahore, Pakistan",
      fee: "Rs. 1500",
      date: "2025-07-07",
      time: "6:00 PM",
      status: "Paid",
    },
  ];

  const tutorsData = tutors.length > 0
    ? tutors.map((tutor, index) => ({
        id: tutor._id || index,
        image: tutor.image || "/placeholder.png",
        name: tutor.name || "Unknown",
        subject: tutor.subject || "Unknown Subject",
        location: tutor.location?.city
          ? `${tutor.location.city}, ${tutor.location.country || ""}`
          : "Location Unknown",
        fee: tutor.fee || "Rs. 1000",
        date: tutor.sessionDate || "2025-07-10",
        time: tutor.sessionTime || "3:00 PM",
        status: tutor.status || "Pending",
      }))
    : dummySessions;

  return (
    <section className="py-28 mx-auto max-w-[1440px] px-6 lg:px-12">
      <h1 className="text-3xl font-bold mb-10 text-deep text-center">
        My Tutoring Sessions
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {tutorsData.map((session) => (
          <div
            key={session.id}
            className="grid md:grid-cols-2 gap-6 bg-white shadow-md p-6 rounded-xl border border-gray-100"
          >
            {/* Left: Tutor Info */}
            <div className="flex items-start gap-6">
              <img
                src={session.image}
                alt={session.name}
                className="w-28 h-28 rounded-md object-cover border"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{session.name}</h2>
                <p className="text-gray-600">{session.subject}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{session.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2">
                  Fee: <span className="text-deep">{session.fee}</span>
                </p>
              </div>
            </div>

            {/* Right: Status Button */}
            <div className="flex items-center justify-center md:justify-end">
              <Button
                variant="ghost"
                className={`border px-6 py-2 rounded-full ${
                  session.status === "Paid"
                    ? "border-green-500 text-green-600"
                    : session.status === "Make Payment"
                    ? "border-yellow-500 text-yellow-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {session.status}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySessions;
