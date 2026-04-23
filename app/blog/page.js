"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight, Calendar, Tag } from "lucide-react";
import BlurImage from "../components/BlurImage";
import { blogPosts } from "../../utils/blogData";

const BlogPage = () => {
  return (
    <main className="min-h-screen pt-[60px]">
      <section className="w-full py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              My <span className="text-slate-300">Blog</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Thoughts, tutorials, and insights on web development and technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}/${post.slug}`}
                className="border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors overflow-hidden group block"
              >
                <BlurImage
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-40 sm:h-44 border-b border-slate-700 overflow-hidden"
                />
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-[10px] sm:text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-snug mb-2 line-clamp-2 group-hover:text-slate-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime} min
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
