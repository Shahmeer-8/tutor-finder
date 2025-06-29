import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, UserCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";


const Blog = () => {
  const { blogs} = useContext(AppContext);
  return (
    <div className="py-28 mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
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
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
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
        ))}
      </div>
    </div>
    </div>
  );
};

export default Blog;
