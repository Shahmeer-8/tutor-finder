import React, { useState } from "react";
// dummy Data for Sessions // Please replace it 

const initialSessions = [
  {
    id: 1,
    tutorName: "Ayesha Khan",
    subject: "Mathematics",
    date: "2025-07-02",
    time: "3:00 PM - 4:00 PM",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    tutorName: "Ali Raza",
    subject: "Computer Science",
    date: "2025-06-24",
    time: "5:30 PM - 6:30 PM",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    tutorName: "Sana Malik",
    subject: "English",
    date: "2025-07-05",
    time: "11:00 AM - 12:00 PM",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const AllSessions = () => {
  const [sessions, setSessions] = useState(initialSessions);

  const handleDecline = (id) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, status: "Declined" } : session
    );
    setSessions(updatedSessions);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-deep mb-6">All Tutor Sessions</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 flex items-center gap-4 transition hover:shadow-2xl"
          >
            <img
              src={session.image}
              alt={session.tutorName}
              className="w-20 h-20 rounded-xl object-cover border-2 border-secondary"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-deep">
                {session.tutorName}
              </h3>
              <p className="text-sm text-gray-700">{session.subject}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(session.date).toLocaleDateString()} | {session.time}
              </p>

              <div className="mt-2 flex items-center justify-between gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    session.status === "Upcoming"
                      ? "bg-green-100 text-green-600"
                      : session.status === "Completed"
                      ? "bg-gray-300 text-gray-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {session.status}
                </span>

                {session.status === "Upcoming" && (
                  <button
                    onClick={() => handleDecline(session.id)}
                    className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Decline
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSessions;
