import React from "react";
import { Link } from "react-router-dom";
import blogs from "../../data/blogs";

const BlogListPage = () => {
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces & hyphens
      .replace(/\s+/g, "-") // replace spaces with dashes
      .replace(/-+/g, "-");

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-4 lg:px-40 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[150px] rounded-full animate-pulse-slow" />
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold text-center mb-16">
          🚀 Our Latest Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              to={`/blogs/${generateSlug(blog.title)}`}
              className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 hover:border-primary-light transition-transform shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {blog.description}
                </p>
              </div>

              <div className="mt-auto flex justify-between items-center text-sm text-text-tertiary">
                <span className="text-primary-light">By {blog.by}</span>
                <span>{blog.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
