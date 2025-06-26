import React from "react";
import { Clock, User, Clipboard, Users } from "lucide-react";

// Featured Card Component
const FeatureCard = ({ title, icon: Icon, className = "" }) => {
  return (
    <div className={`flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px] ${className}`}>
      <Icon className="w-7 h-17" />
      <h5 className="text-sm md:text-lg mb-2 font-bold">{title}</h5>
      <p className="text-tertiary">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </div>
  );
};

const Feature = () => {
  return (
    <section className="relative z-20 mx-auto max-w-[1140px] px-6 lg:px-12 bottom-5 md:12">
      <div className="flex flex-wrap gap-x-4 bg-white rounded-3xl p-8">
        <FeatureCard title="Qualified Instructors" icon={User} />
        <FeatureCard title="Flexible Scheduling" icon={Clock} className="bg-secondary " />
        <FeatureCard title="Progress Tracking" icon={Clipboard} />
        <FeatureCard title="Community Support" icon={Users} />
      </div>
    </section>
  );
};

export default Feature;
