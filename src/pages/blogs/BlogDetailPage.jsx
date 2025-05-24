import React from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../../data/blogs";

const BlogDetailPage = () => {
  const { title } = useParams();

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces & hyphens
      .replace(/\s+/g, "-") // replace spaces with dashes
      .replace(/-+/g, "-");

  const blog = blogs.find((blog) => generateSlug(blog.title) === title);

  if (!blog) {
    return (
      <div className="relative min-h-screen bg-background-dark text-white px-6 py-16 flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">🚫 Blog not found.</p>
        <Link to="/blogs" className="btn-secondary">
          ← Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-4 md:px-12 lg:px-40 py-16">
      {/* Glowing Background */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
            {blog.title}
          </h1>
          <p className="text-sm text-text-tertiary">
            ✍ By {blog.by} | 📅 {blog.date}
          </p>
        </header>

        {/* Content Section */}
        <article className="space-y-8 text-text-secondary leading-relaxed">
          {blog.content.map((item, idx) => (
            <div
              key={idx}
              dangerouslySetInnerHTML={{ __html: item.value }}
              className="prose prose-invert prose-headings:text-white prose-h3:text-2xl prose-h3:font-semibold prose-p:mt-4 prose-p:mb-4 prose-li:marker:text-primary prose-code:bg-surface-medium prose-code:px-1 prose-code:rounded prose-pre:bg-surface-dark prose-pre:p-4 prose-pre:rounded-lg prose-a:text-primary-light hover:prose-a:underline"
            />
          ))}
        </article>

        {/* Divider */}
        <div className="h-px w-full bg-border-dark my-8"></div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/blogs"
            className="inline-block btn-secondary transition hover:scale-105"
          >
            ← Back to Blog List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
