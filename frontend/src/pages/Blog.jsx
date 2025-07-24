import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, UserCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import BecomeATutor from "./Home/Becomeatutor";

const Blog = () => {
  const { blogs } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      blog.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="py-15 mx-auto max-w-[1440px] px-6 lg:px-12 mb-5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center font-primary text-deep">
          Latest Blog Articles
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
          {/* Role Filter */}
          <div className="w-full md:w-60 relative">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px] font-primary border px-5 py-6 bg-deep text-white rounded-full border-gray-400 focus:ring-2 focus:ring-deep focus:outline-none">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className={"bg-deep text-white rounded-lg shadow-lg"}>
                <SelectItem value="All">All Blogs</SelectItem>
                <SelectItem value="Tutor">Tutor</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search blogs by title or category..."
              className="w-full px-4 py-4 pl-10 text-sm font-medium rounded-full bg-white text-deep placeholder-gray-500 border border-gray-500 focus:ring-2 focus:ring-deep focus:outline-none transition duration-200 font-primary shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-md font-bold mb-2 font-primary text-deep">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">{blog.category}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
                    <span className="flex items-center gap-1">
                      <UserCircle className="w-4 h-4" />
                      {blog.writer} ({blog.role})
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {blog.date}
                    </span>
                  </div>
                  <Link
                    to="/"
                    className="mt-4 inline-block text-sm text-white bg-deep hover:bg-deep/70 px-4 py-2 rounded transition-colors text-center"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 font-medium">
              No blogs found matching your search.
            </p>
          )}
        </div>
      </div>
     <div className="bg-gradient-to-r from-slate-900 via-deep to-slate-900 py-12">
  <BecomeATutor  bgClass="bg-gradient-to-r from-slate-900 via-deep to-slate-900"/>
</div>
    </div>
  );
};

export default Blog;
