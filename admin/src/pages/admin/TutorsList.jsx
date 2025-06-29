
// Dummy data

const tutors = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 300 1234567",
    city: "Lahore",
    country: "Pakistan",
    qualification: "Master's in Mathematics",
    subject: "Mathematics",
    experience: "3 years",
    fee: "Rs. 1500/hr",
    dateJoined: "2024-03-15",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali.raza@example.com",
    phone: "+92 345 9876543",
    city: "Karachi",
    country: "Pakistan",
    qualification: "Bachelor's in Computer Science",
    subject: "Computer Science",
    experience: "2 years",
    fee: "Rs. 1000/hr",
    dateJoined: "2024-04-01",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    name: "Sana Malik",
    email: "sana.malik@example.com",
    phone: "+92 312 5556677",
    city: "Islamabad",
    country: "Pakistan",
    qualification: "PhD in English Literature",
    subject: "English",
    experience: "5+ years",
    fee: "Rs. 2000/hr",
    dateJoined: "2024-02-10",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const TutorsList = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-deep mb-6">Tutors List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="group bg-white rounded-xl shadow border border-gray-200 p-4 transition transform hover:-translate-y-1 hover:shadow-xl duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-secondary mb-3"
              />
              <h3 className="text-lg font-semibold text-deep">{tutor.name}</h3>
              <p className="text-sm text-gray-500">{tutor.city}, {tutor.country}</p>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><span className="font-medium text-deep">Email:</span> {tutor.email}</p>
              <p><span className="font-medium text-deep">Phone:</span> {tutor.phone}</p>
              <p><span className="font-medium text-deep">Subject:</span> {tutor.subject}</p>
              <p><span className="font-medium text-deep">Qualification:</span> {tutor.qualification}</p>
              <p><span className="font-medium text-deep">Experience:</span> {tutor.experience}</p>
              <p><span className="font-medium text-deep">Fee:</span> {tutor.fee}</p>
              <p><span className="font-medium text-deep">Joined:</span> {new Date(tutor.dateJoined).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsList;
