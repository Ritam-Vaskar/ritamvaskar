"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Bold, Italic, Code, Heading1, Heading2, Heading3, List, ListOrdered,
  Image, Table, Minus, Link as LinkIcon, Quote, CheckSquare, Eye, EyeOff, Save
} from "lucide-react";

const TOOLBAR = [
  { icon: Bold, label: "Bold", action: "bold", prefix: "**", suffix: "**" },
  { icon: Italic, label: "Italic", action: "italic", prefix: "_", suffix: "_" },
  { icon: Code, label: "Inline Code", action: "code", prefix: "`", suffix: "`" },
  { type: "sep" },
  { icon: Heading1, label: "H1", action: "h1", prefix: "## ", suffix: "", line: true },
  { icon: Heading2, label: "H2", action: "h2", prefix: "### ", suffix: "", line: true },
  { type: "sep" },
  { icon: List, label: "Bullet List", action: "ul", prefix: "- ", suffix: "", line: true },
  { icon: ListOrdered, label: "Numbered List", action: "ol", prefix: "1. ", suffix: "", line: true },
  { icon: CheckSquare, label: "Checklist", action: "check", prefix: "- [ ] ", suffix: "", line: true },
  { type: "sep" },
  { icon: Quote, label: "Blockquote", action: "quote", prefix: "> ", suffix: "", line: true },
  { icon: Minus, label: "Divider", action: "hr", insert: "\n---\n" },
  { icon: LinkIcon, label: "Link", action: "link" },
  { icon: Image, label: "Image", action: "image" },
  { icon: Table, label: "Table", action: "table" },
  { icon: Code, label: "Code Block", action: "codeblock" },
];

export default function BlogEditor({ initialData, onSave, saving }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [published, setPublished] = useState(initialData?.published || false);
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef(null);

  const insertText = useCallback((prefix, suffix, line) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end);

    let newText;
    if (line) {
      const lineStart = content.lastIndexOf("\n", start - 1) + 1;
      newText = content.substring(0, lineStart) + prefix + content.substring(lineStart);
      setContent(newText);
    } else {
      newText = content.substring(0, start) + prefix + (selected || "text") + suffix + content.substring(end);
      setContent(newText);
    }
    setTimeout(() => { ta.focus(); }, 50);
  }, [content]);

  const handleToolbar = useCallback((item) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;

    if (item.insert) {
      setContent(content.substring(0, start) + item.insert + content.substring(end));
      return;
    }

    if (item.action === "link") {
      const url = prompt("Enter URL:");
      if (!url) return;
      const text = content.substring(start, end) || "link text";
      setContent(content.substring(0, start) + `[${text}](${url})` + content.substring(end));
      return;
    }

    if (item.action === "image") {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          await uploadImageToEditor(file);
        }
      };
      fileInput.click();
      return;
    }

    if (item.action === "table") {
      const table = `\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n`;
      setContent(content.substring(0, start) + table + content.substring(end));
      return;
    }

    if (item.action === "codeblock") {
      const lang = prompt("Language (js, python, bash, etc):") || "";
      const code = content.substring(start, end) || "// your code here";
      setContent(content.substring(0, start) + `\n\`\`\`${lang}\n${code}\n\`\`\`\n` + content.substring(end));
      return;
    }

    insertText(item.prefix, item.suffix, item.line);
  }, [content, insertText]);

  const handlePaste = useCallback(async (e) => {
    // Handle image paste
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();
          const file = items[i].getAsFile();
          await uploadImageToEditor(file);
          return;
        }
      }
    }

    const text = e.clipboardData.getData("text/plain");
    if (!text) return;

    // Auto-detect code (has indentation or common code patterns)
    const codePatterns = /^(import |const |let |var |function |class |def |public |private |from |export |<\?|<!DOCTYPE|<html|SELECT |INSERT |CREATE )/m;
    const hasIndentation = text.split("\n").filter((l) => /^\s{2,}/.test(l)).length > 2;

    if ((codePatterns.test(text) || hasIndentation) && text.split("\n").length > 3) {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const lang = detectLanguage(text);
      const wrapped = `\n\`\`\`${lang}\n${text}\n\`\`\`\n`;
      setContent(content.substring(0, start) + wrapped + content.substring(end));
      return;
    }

    // Auto-detect table (tab-separated or pipe-separated)
    if (text.includes("\t") && text.split("\n").length > 1) {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const rows = text.trim().split("\n").map((r) => r.split("\t"));
      const header = rows[0].map((c) => c.trim());
      const sep = header.map(() => "--------");
      const body = rows.slice(1).map((r) => r.map((c) => c.trim()));
      let table = `\n| ${header.join(" | ")} |\n| ${sep.join(" | ")} |\n`;
      body.forEach((r) => { table += `| ${r.join(" | ")} |\n`; });
      setContent(content.substring(0, start) + table + content.substring(end));
      return;
    }

    // Auto-detect URL as image
    const imgPattern = /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i;
    if (imgPattern.test(text.trim())) {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      setContent(content.substring(0, start) + `\n![image](${text.trim()})\n` + content.substring(end));
      return;
    }
  }, [content]);

  function detectLanguage(code) {
    if (/import .+ from |export (default |const )/.test(code)) return "javascript";
    if (/def \w+\(|import \w+|print\(/.test(code)) return "python";
    if (/public (static |class )|System\.out/.test(code)) return "java";
    if (/<\?php/.test(code)) return "php";
    if (/SELECT |INSERT |CREATE TABLE/i.test(code)) return "sql";
    if (/#include|int main|std::/.test(code)) return "cpp";
    if (/^FROM |^RUN |^CMD /m.test(code)) return "dockerfile";
    if (/^name:|^on:|^jobs:/m.test(code)) return "yaml";
    if (/<html|<div|<\//.test(code)) return "html";
    if (/^{[\s\n]/.test(code)) return "json";
    return "";
  }

  const uploadImageToEditor = async (file) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    
    // Insert placeholder
    const placeholder = `\n![Uploading ${file.name}...]()\n`;
    const newContent = content.substring(0, start) + placeholder + content.substring(end);
    setContent(newContent);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;
        
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64data }),
        });
        
        if (res.ok) {
          const data = await res.json();
          // Replace placeholder with actual URL
          setContent((prev) => prev.replace(placeholder, `\n![${file.name}](${data.url})\n`));
        } else {
          setContent((prev) => prev.replace(placeholder, `\n<!-- Failed to upload ${file.name} -->\n`));
          alert("Image upload failed");
        }
      };
    } catch (error) {
      console.error(error);
      setContent((prev) => prev.replace(placeholder, `\n<!-- Error uploading ${file.name} -->\n`));
    }
  };

  const handleCoverImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      setCoverImage("Uploading...");
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64data }),
          });
          
          if (res.ok) {
            const data = await res.json();
            setCoverImage(data.url);
          } else {
            setCoverImage("");
            alert("Cover image upload failed");
          }
        } catch (error) {
          setCoverImage("");
          alert("Network error during upload");
        }
      };
    };
    fileInput.click();
  };

  const handleSubmit = () => {
    if (!title.trim()) { alert("Title is required"); return; }
    if (!content.trim()) { alert("Content is required"); return; }
    onSave({
      title: title.trim(),
      content,
      excerpt: excerpt.trim() || content.substring(0, 160).replace(/[#*`_\[\]]/g, "").trim(),
      coverImage: coverImage.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      published,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog post title..."
        className="w-full text-2xl sm:text-3xl font-bold bg-transparent border-b border-slate-700 text-white py-3 mb-4 focus:outline-none focus:border-slate-500 placeholder-gray-600"
      />

      {/* Meta fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Cover image URL (or upload ->)"
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500 placeholder-gray-600"
          />
          <button
            onClick={handleCoverImageUpload}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-sm transition-colors shrink-0 flex items-center justify-center"
            title="Upload Image"
          >
            <Image size={16} />
          </button>
        </div>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500 placeholder-gray-600"
        />
      </div>

      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Short excerpt / description (auto-generated if empty)"
        rows={2}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500 placeholder-gray-600 mb-4 resize-none"
      />

      {/* Toolbar */}
      <div className="flex items-center gap-1 flex-wrap p-2 bg-slate-800 border border-slate-700 border-b-0 overflow-x-auto">
        {TOOLBAR.map((item, i) =>
          item.type === "sep" ? (
            <div key={i} className="w-px h-5 bg-slate-600 mx-1" />
          ) : (
            <button
              key={item.action}
              onClick={() => handleToolbar(item)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
              title={item.label}
            >
              <item.icon size={15} />
            </button>
          )
        )}
        <div className="flex-1" />
        <button
          onClick={() => setPreview(!preview)}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border transition-colors ${preview ? "border-slate-500 text-white bg-slate-700" : "border-slate-700 text-gray-400 hover:text-white"}`}
        >
          {preview ? <EyeOff size={13} /> : <Eye size={13} />}
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="min-h-[400px] p-4 sm:p-6 bg-slate-900 border border-slate-700 overflow-auto prose-custom">
          <PreviewContent content={content} />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onPaste={handlePaste}
          placeholder="Write your blog content in Markdown...&#10;&#10;Paste code → auto-wrapped in code blocks&#10;Paste table data → auto-formatted as table&#10;Paste image URL → auto-embedded"
          className="w-full min-h-[400px] px-4 py-3 bg-slate-950 border border-slate-700 text-gray-300 text-sm font-mono leading-relaxed focus:outline-none focus:border-slate-500 resize-y placeholder-gray-700"
          spellCheck={false}
        />
      )}

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 p-4 bg-slate-800 border border-slate-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-slate-400" />
          <span className="text-sm text-gray-300">Publish immediately</span>
        </label>
        <div className="flex gap-3">
          <span className="text-gray-500 text-xs self-center">
            {content.split(/\s+/).filter(Boolean).length} words · ~{Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} min read
          </span>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-slate-700 border border-slate-600 text-white text-sm font-medium hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            {saving ? <div className="w-4 h-4 border-2 border-slate-500 border-t-white animate-spin" /> : <Save size={16} />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple preview renderer (reuses the same markdown logic)
function PreviewContent({ content }) {
  if (!content) return <p className="text-gray-500 italic">Nothing to preview yet...</p>;

  const lines = content.split("\n");
  const elements = [];
  let i = 0, key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") { i++; continue; }

    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "").trim();
      const code = []; i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { code.push(lines[i]); i++; }
      i++;
      elements.push(
        <div key={key++} className="my-4 border border-slate-700 overflow-hidden">
          {lang && <div className="px-3 py-1.5 bg-slate-800 border-b border-slate-700 text-xs text-gray-400 font-mono">{lang}</div>}
          <pre className="p-3 bg-slate-950 overflow-x-auto text-xs"><code className="text-gray-300 font-mono whitespace-pre">{code.join("\n")}</code></pre>
        </div>
      );
      continue;
    }
    if (line.startsWith("## ")) { elements.push(<h2 key={key++} className="text-xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h2>); i++; continue; }
    if (line.startsWith("### ")) { elements.push(<h3 key={key++} className="text-lg font-semibold text-white mt-5 mb-2">{line.slice(4)}</h3>); i++; continue; }
    if (line.trim() === "---") { elements.push(<hr key={key++} className="border-slate-700 my-6" />); i++; continue; }
    if (line.trim().startsWith("![")) {
      const m = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (m) elements.push(<div key={key++} className="my-4"><img src={m[2]} alt={m[1]} className="max-w-full h-auto border border-slate-700" />{m[1] && <p className="text-gray-500 text-xs mt-1 text-center">{m[1]}</p>}</div>);
      i++; continue;
    }
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const headers = line.split("|").filter(Boolean).map(h => h.trim()); i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|")) { rows.push(lines[i].split("|").filter(Boolean).map(c => c.trim())); i++; }
      elements.push(
        <div key={key++} className="my-4 overflow-x-auto border border-slate-700">
          <table className="w-full text-sm"><thead><tr className="bg-slate-800">{headers.map((h, j) => <th key={j} className="px-3 py-2 text-left text-slate-300 text-xs border-b border-slate-700">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, ri) => <tr key={ri} className="border-b border-slate-800">{r.map((c, ci) => <td key={ci} className="px-3 py-2 text-gray-300 text-xs">{c}</td>)}</tr>)}</tbody></table>
        </div>
      );
      continue;
    }
    if (line.trim().startsWith("> ")) {
      const ql = [line.replace(/^>\s*/, "")]; i++;
      while (i < lines.length && lines[i].trim().startsWith("> ")) { ql.push(lines[i].replace(/^>\s*/, "")); i++; }
      elements.push(<blockquote key={key++} className="my-4 pl-3 border-l-2 border-slate-600 py-2"><p className="text-gray-300 text-sm italic">{ql.join(" ")}</p></blockquote>);
      continue;
    }
    if (line.trim().startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) { items.push(lines[i].trim().slice(2)); i++; }
      elements.push(<ul key={key++} className="my-3 space-y-1 list-none">{items.map((it, j) => <li key={j} className="flex gap-2 text-gray-300 text-sm"><span className="text-slate-500 mt-1">▸</span>{it}</li>)}</ul>);
      continue;
    }
    elements.push(<p key={key++} className="text-gray-300 text-sm leading-relaxed my-3">{inlineFormat(line)}</p>);
    i++;
  }
  return <>{elements}</>;
}

function inlineFormat(text) {
  const parts = [];
  let rem = text, k = 0;
  while (rem.length > 0) {
    const cm = rem.match(/^(.*?)`([^`]+)`(.*)/s);
    const bm = rem.match(/^(.*?)\*\*([^*]+)\*\*(.*)/s);
    let best = null, pos = Infinity;
    if (cm && cm[1].length < pos) { best = "c"; pos = cm[1].length; }
    if (bm && bm[1].length < pos) { best = "b"; pos = bm[1].length; }
    if (!best) { parts.push(rem); break; }
    if (best === "c") { if (cm[1]) parts.push(cm[1]); parts.push(<code key={k++} className="px-1 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">{cm[2]}</code>); rem = cm[3]; }
    else { if (bm[1]) parts.push(bm[1]); parts.push(<strong key={k++} className="text-white font-semibold">{bm[2]}</strong>); rem = bm[3]; }
  }
  return parts.length === 1 ? parts[0] : parts;
}
