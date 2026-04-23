"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { getBlogById } from "../../../../utils/blogData";
import BlurImage from "../../../components/BlurImage";

// Simple markdown-to-JSX renderer
function renderMarkdown(content) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") { i++; continue; }

    // Code blocks
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "").trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="my-4 sm:my-6 border border-slate-700 overflow-hidden">
          {lang && <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 border-b border-slate-700 text-xs text-gray-400 font-mono">{lang}</div>}
          <pre className="p-3 sm:p-4 bg-slate-950 overflow-x-auto text-xs sm:text-sm">
            <code className="text-gray-300 font-mono whitespace-pre">{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-xl sm:text-2xl font-bold text-white mt-8 sm:mt-10 mb-3 sm:mb-4">{line.replace("## ", "")}</h2>);
      i++; continue;
    }
    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="text-lg sm:text-xl font-semibold text-white mt-6 sm:mt-8 mb-2 sm:mb-3">{line.replace("### ", "")}</h3>);
      i++; continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={key++} className="border-slate-700 my-6 sm:my-8" />);
      i++; continue;
    }

    // Images
    if (line.trim().startsWith("![")) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        elements.push(
          <div key={key++} className="my-4 sm:my-6">
            <BlurImage src={match[2]} alt={match[1]} className="w-full h-full object-cover" containerClassName="w-full h-48 sm:h-64 border border-slate-700" />
            {match[1] && <p className="text-gray-500 text-xs mt-2 text-center">{match[1]}</p>}
          </div>
        );
      }
      i++; continue;
    }

    // Blockquotes / alerts
    if (line.trim().startsWith("> ")) {
      const quoteLines = [line.replace(/^>\s*/, "")];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].replace(/^>\s*/, ""));
        i++;
      }
      const text = quoteLines.join(" ");
      const isWarning = text.includes("[!WARNING]");
      const isTip = text.includes("[!TIP]");
      const isImportant = text.includes("[!IMPORTANT]");
      const cleanText = text.replace(/\[!(WARNING|TIP|IMPORTANT|NOTE|CAUTION)\]\s*/, "");
      const borderColor = isWarning ? "border-yellow-600" : isTip ? "border-green-600" : isImportant ? "border-blue-600" : "border-slate-600";
      elements.push(
        <blockquote key={key++} className={`my-4 sm:my-6 pl-3 sm:pl-4 border-l-2 ${borderColor} py-2 sm:py-3`}>
          <p className="text-gray-300 text-sm sm:text-base italic">{cleanText}</p>
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 sm:my-4 space-y-1.5 sm:space-y-2 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-gray-300 text-sm sm:text-base">
              <span className="text-slate-500 mt-1.5 shrink-0">▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 sm:my-4 space-y-1.5 sm:space-y-2 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-gray-300 text-sm sm:text-base">
              <span className="text-slate-400 font-mono text-xs mt-1 shrink-0 w-5">{idx + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Checkbox list
    if (line.trim().startsWith("- [")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- [")) {
        const checked = lines[i].includes("[x]");
        const text = lines[i].trim().replace(/- \[.\]\s*/, "");
        items.push({ text, checked });
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 sm:my-4 space-y-1.5 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-gray-300 text-sm sm:text-base">
              <span className={`mt-0.5 w-4 h-4 border shrink-0 flex items-center justify-center text-[10px] ${item.checked ? "border-slate-400 text-slate-300" : "border-slate-600"}`}>
                {item.checked ? "✓" : ""}
              </span>
              <span className={item.checked ? "line-through text-gray-500" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Table
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const headers = line.split("|").filter(Boolean).map(h => h.trim());
      i++; // skip separator
      i++;
      const rows = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").filter(Boolean).map(c => c.trim()));
        i++;
      }
      elements.push(
        <div key={key++} className="my-4 sm:my-6 overflow-x-auto border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800">
                {headers.map((h, idx) => (
                  <th key={idx} className="px-3 sm:px-4 py-2 text-left text-slate-300 font-semibold text-xs sm:text-sm border-b border-slate-700">{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-800 last:border-0">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 sm:px-4 py-2 text-gray-300 text-xs sm:text-sm">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-gray-300 text-sm sm:text-base leading-relaxed my-3 sm:my-4">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// Inline formatting: bold, italic, inline code, links
function renderInline(text) {
  if (!text) return text;
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)/s);
    // Bold
    const boldMatch = remaining.match(/^(.*?)\*\*([^*]+)\*\*(.*)/s);
    // Italic
    const italicMatch = remaining.match(/^(.*?)_([^_]+)_(.*)/s);
    // Link
    const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)(.*)/s);

    // Find earliest match
    let earliest = null;
    let earliestPos = Infinity;
    if (codeMatch && codeMatch[1].length < earliestPos) { earliest = "code"; earliestPos = codeMatch[1].length; }
    if (boldMatch && boldMatch[1].length < earliestPos) { earliest = "bold"; earliestPos = boldMatch[1].length; }
    if (linkMatch && linkMatch[1].length < earliestPos) { earliest = "link"; earliestPos = linkMatch[1].length; }
    if (italicMatch && italicMatch[1].length < earliestPos) { earliest = "italic"; earliestPos = italicMatch[1].length; }

    if (!earliest) {
      parts.push(remaining);
      break;
    }

    if (earliest === "code") {
      if (codeMatch[1]) parts.push(codeMatch[1]);
      parts.push(<code key={key++} className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs sm:text-sm font-mono">{codeMatch[2]}</code>);
      remaining = codeMatch[3];
    } else if (earliest === "bold") {
      if (boldMatch[1]) parts.push(boldMatch[1]);
      parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch[2]}</strong>);
      remaining = boldMatch[3];
    } else if (earliest === "link") {
      if (linkMatch[1]) parts.push(linkMatch[1]);
      parts.push(<a key={key++} href={linkMatch[3]} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors">{linkMatch[2]}</a>);
      remaining = linkMatch[4];
    } else if (earliest === "italic") {
      if (italicMatch[1]) parts.push(italicMatch[1]);
      parts.push(<em key={key++} className="text-gray-400">{italicMatch[2]}</em>);
      remaining = italicMatch[3];
    }
  }

  return parts.length === 1 ? parts[0] : parts;
}

export default function BlogPostClient({ params }) {
  const { id } = use(params);
  const post = getBlogById(id);

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
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-[10px] sm:text-xs">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-700">
            <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime} min read</span>
          </div>

          {/* Cover image */}
          <BlurImage
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            containerClassName="w-full h-48 sm:h-64 md:h-72 border border-slate-700 mb-8 sm:mb-10"
          />

          {/* Content */}
          <div className="blog-content">
            {renderMarkdown(post.content)}
          </div>
        </div>
      </article>
    </main>
  );
}
