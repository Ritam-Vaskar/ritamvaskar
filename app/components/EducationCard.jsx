"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const EducationCard = ({ data, index }) => {
  return (
    <div className="relative h-full">
      <div className="w-full h-full flex flex-col p-4 sm:p-5 border border-slate-700 bg-slate-900">
        <div className="absolute top-0 right-0 px-3 py-1 border-l border-b border-slate-700 bg-slate-800 text-xs text-slate-300">
          Record {index + 1}
        </div>

        <div className="flex-1 space-y-4 flex flex-col">
          <div className="flex items-start gap-3 pr-12">
            <div className="p-2 border border-slate-600 bg-slate-800 mt-1">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">{data.institution}</h3>
              <p className="text-slate-300 text-sm sm:text-base mt-1">{data.degree}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
            <div className="flex items-center gap-2 border border-slate-700 bg-slate-800 px-3 py-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{data.duration}</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-700 bg-slate-800 px-3 py-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{data.location}</span>
            </div>
          </div>

          <div className="space-y-2 border border-slate-700 bg-slate-800 px-3 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Grade:</span>
              <span className="text-slate-300 font-medium">{data.grade}</span>
            </div>
            <div className="h-2 bg-slate-700">
              <div className="h-2 bg-slate-400" style={{ width: `${data.gradePercentage}%` }} />
            </div>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed border border-slate-700 bg-slate-800 px-3 py-2 flex-1">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
