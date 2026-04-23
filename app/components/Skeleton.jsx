"use client";

import React from "react";

// Base skeleton shimmer block
export const Skeleton = ({ className = "" }) => (
  <div className={`bg-slate-800 animate-pulse ${className}`} />
);

// Card skeleton for Education/Experience cards
export const CardSkeleton = () => (
  <div className="p-5 sm:p-6 border border-slate-700 bg-slate-900 space-y-4">
    <div className="flex items-start gap-3">
      <Skeleton className="w-10 h-10 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-9" />
      <Skeleton className="h-9" />
    </div>
    <Skeleton className="h-8" />
    <Skeleton className="h-16" />
  </div>
);

// Project card skeleton
export const ProjectCardSkeleton = () => (
  <div className="bg-slate-900 p-6 border border-slate-700 space-y-4">
    <Skeleton className="w-full h-40" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <div className="flex gap-4">
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-10 w-28" />
    </div>
  </div>
);

// Skill card skeleton
export const SkillCardSkeleton = () => (
  <div className="p-4 border border-slate-700 bg-slate-900 space-y-3">
    <Skeleton className="w-10 h-10 mx-auto" />
    <Skeleton className="h-4 w-3/4 mx-auto" />
    <div className="space-y-1">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
      </div>
      <Skeleton className="h-2 w-full" />
    </div>
  </div>
);

// Generic page skeleton
export const PageSkeleton = () => (
  <div className="min-h-screen pt-[60px] px-4 sm:px-6">
    <div className="max-w-5xl mx-auto py-14 space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto max-w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default Skeleton;
