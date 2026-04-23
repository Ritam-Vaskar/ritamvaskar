"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    setProgress(0);

    const t1 = setTimeout(() => setProgress(40), 50);
    const t2 = setTimeout(() => setProgress(70), 150);
    const t3 = setTimeout(() => setProgress(100), 300);
    const t4 = setTimeout(() => setLoading(false), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]">
      <div
        className="h-full bg-slate-300 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-200/30 to-transparent animate-pulse" />
    </div>
  );
};

export default PageLoader;
