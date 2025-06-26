export function Stats() {
  const stats = [
    { number: "1000+", label: "Verified Tutors" },
    { number: "5000+", label: "Happy Students" },
    { number: "50+", label: "Subjects Covered" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support Availability" },
    { number: "10+", label: "Major Cities Covered" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="transform transition duration-400 hover:scale-105 hover:bg-secondary rounded-md p-4 shadow-sm"
              style={{ transitionDelay: `${index * 10}ms` }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {stat.number}
              </h3>
              <p className="text-deep text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
