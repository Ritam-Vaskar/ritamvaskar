"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { skillDomains } from "./Skills";

const SkillsPreview = () => {
  return (
    <section className="w-full py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Technical <span className="text-slate-300">Expertise</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Diverse technologies across multiple domains
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {skillDomains.map((domain) => (
            <div
              key={domain.title}
              className="p-4 sm:p-5 border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors group"
            >
              <div className="text-2xl sm:text-3xl mb-2">{domain.icon}</div>
              <h3 className="text-white text-xs sm:text-sm font-semibold leading-tight mb-1">
                {domain.title}
              </h3>
              <p className="text-gray-500 text-xs">{domain.skills.length} skills</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition-colors group"
          >
            Explore All Skills
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
