"use client";

import React from "react";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const BlogPage = () => {
  return (
    <main className="min-h-screen pt-[60px]">
      <section className="w-full py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-slate-300">Blog</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Thoughts, tutorials, and insights on web development and technology
            </p>
          </div>

          {/* Placeholder state */}
          <div className="flex flex-col items-center justify-center py-16 border border-slate-700 bg-slate-900">
            <div className="text-6xl mb-6">✍️</div>
            <BookOpen className="w-12 h-12 text-slate-500 mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Blog Posts Coming Soon
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-md text-center px-4">
              I'm working on some exciting articles about web development, tech insights, and my journey as a developer. Stay tuned!
            </p>
          </div>

          {/* Ready-to-use blog card structure for when posts are added */}
          {/*
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.title} className="p-5 border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base sm:text-lg">{post.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-2 text-gray-500 text-xs">
                      <span className="flex items-center gap-1"><Clock size={12} />{post.date}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  <a href={post.url} className="flex items-center gap-1 text-slate-300 text-sm hover:text-white transition-colors shrink-0">
                    Read <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          */}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
