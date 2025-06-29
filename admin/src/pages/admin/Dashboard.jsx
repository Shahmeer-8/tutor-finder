
import { Users, Calendar, AlertCircle, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Tutors", value: 128, icon: Users, bg: "bg-[#0B1D51]" },
    { title: "Active Sessions", value: 23, icon: Calendar, bg: "bg-green-600" },
    { title: "Pending Requests", value: 5, icon: AlertCircle, bg: "bg-yellow-500" },
  ];

  // dummy data 
  const latestSessions = [
    {
      id: 1,
      tutor: "Ayesha Khan",
      student: "John Doe",
      date: "2025-06-25",
      status: "Completed",
    },
    {
      id: 2,
      tutor: "Ali Raza",
      student: "Sara Lee",
      date: "2025-06-24",
      status: "Pending",
    },
    {
      id: 3,
      tutor: "Sana Malik",
      student: "Mark Smith",
      date: "2025-06-23",
      status: "Cancelled",
    },
  ];

  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-deep">Welcome Back, Admin</h1>
        <p className="text-gray-600 mt-2">
          Here's a quick overview of TutorFinder dashboard.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map(({ title, value, icon: Icon, bg }) => (
          <div
            key={title}
            className={`${bg} rounded-xl shadow p-4 flex flex-col justify-center items-center
                       transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
            title={title}
          >
            <div className="p-4 bg-white rounded-full mb-4">
              <Icon className={`${bg === "bg-yellow-500" ? "text-black" : "text-" + bg.split("-")[1] + "-600"} w-8 h-8`} />
            </div>
            <p className="text-white font-medium">{title}</p>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
          </div>
        ))}
      </section>

      {/* Latest Sessions */}
      <section>
        <h2 className="text-2xl font-semibold text-deep mb-4">Latest Sessions</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-deep ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Tutor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {latestSessions.map(({ id, tutor, student, date, status }) => (
                <tr key={id} className="hover:bg-secondary transition">
                  <td className="px-6 py-4 whitespace-nowrap text-deep font-semibold">{tutor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
