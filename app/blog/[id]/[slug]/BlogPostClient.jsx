"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import BlurImage from "../../../components/BlurImage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import NewsletterForm from "../../../components/NewsletterForm";
import BlogReviewForm from "../../../components/BlogReviewForm";

export default function BlogPostClient({ params }) {
  const { id } = use(params);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-600 border-t-slate-300 animate-spin" />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-slate-300 hover:text-white transition-colors underline">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-[60px]">
      <article className="w-full py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors mb-6 sm:mb-8">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags?.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-[10px] sm:text-xs">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            {post.title}
          </h1>

          {/* Meta & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-700">
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-gray-400 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5"><User size={14} />{post.author || "Ritam Vaskar"}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime} min read</span>
            </div>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: `Check out this post: ${post.title}`,
                    url: window.location.href,
                  }).catch((error) => console.log('Error sharing', error));
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm transition-colors rounded-sm w-fit"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>

          {/* Cover image */}
          <BlurImage
            src={post.coverImage || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"}
            alt={post.title}
            className="w-full h-full object-cover"
            containerClassName="w-full h-48 sm:h-64 md:h-72 border border-slate-700 mb-8 sm:mb-10"
          />

          {/* Content */}
          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg sm:text-xl font-semibold text-white mt-8 mb-3" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-300 text-sm sm:text-base leading-relaxed my-4" {...props} />,
                ul: ({ node, ...props }) => <ul className="my-4 space-y-2 list-disc list-inside text-gray-300" {...props} />,
                ol: ({ node, ...props }) => <ol className="my-4 space-y-2 list-decimal list-inside text-gray-300" {...props} />,
                li: ({ node, ...props }) => <li className="text-gray-300 text-sm sm:text-base" {...props} />,
                a: ({ node, ...props }) => <a className="text-slate-300 underline underline-offset-2 hover:text-white" target="_blank" rel="noopener noreferrer" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="my-6 pl-4 border-l-2 border-slate-600 py-2 italic text-gray-400 bg-slate-900/50" {...props} />,
                hr: ({ node, ...props }) => <hr className="border-slate-700 my-8" {...props} />,
                img: ({ node, ...props }) => (
                  <span className="block my-6">
                    <img className="max-w-full h-auto border border-slate-700 mx-auto" {...props} />
                    {props.alt && <span className="block text-gray-500 text-xs mt-2 text-center">{props.alt}</span>}
                  </span>
                ),
                table: ({ node, ...props }) => (
                  <div className="my-6 overflow-x-auto border border-slate-700">
                    <table className="w-full text-sm" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-slate-800" {...props} />,
                th: ({ node, ...props }) => <th className="px-4 py-2 text-left text-slate-300 font-semibold border-b border-slate-700" {...props} />,
                td: ({ node, ...props }) => <td className="px-4 py-2 text-gray-300 border-b border-slate-800" {...props} />,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="my-6 border border-slate-700 overflow-hidden">
                      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-gray-400 font-mono">{match[1]}</div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1rem', background: '#020617', fontSize: '0.875rem' }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs sm:text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <BlogReviewForm blogTitle={post.title} />
          <NewsletterForm />
        </div>
      </article>
    </main>
  );
}
