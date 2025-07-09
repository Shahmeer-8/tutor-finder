import {
  GraduationCap,
  Users,
  Star,
  Clock,
  BookOpen,
  Globe,
} from "lucide-react";

export function Stats() {
  const stats = [
  { number: "10K+", label: "Students", icon: GraduationCap },
  { number: "2K+", label: "Tutors", icon: Users },
  { number: "95%", label: "Satisfaction", icon: Star },
  { number: "24/7", label: "Availability", icon: Clock },
  { number: "50+", label: "Subjects", icon: BookOpen },
  { number: "100+", label: "Cities", icon: Globe },
];



  return (
    <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
    {stats.map(({ number, label, icon: Icon }, index) => (
  <div
    key={index}
    className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-deep/60 flex flex-col items-center text-center"
    style={{ transitionDelay: `${index * 50}ms` }}
  >
    {/* Icon centered */}
    <Icon className="mb-3 w-10 h-10 text-deep" />

    <h3 className="text-3xl md:text-4xl font-bold text-deep mb-1">
      {number}
    </h3>
    <p className="text-deep/80 text-sm md:text-base">{label}</p>
  </div>
))}

    </div>
  </div>
</section>

  );
}
