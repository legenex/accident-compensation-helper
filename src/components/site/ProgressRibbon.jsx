import React, { useEffect, useState } from "react";

export default function ProgressRibbon({ value = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 50);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/60 transition-all duration-700 ease-out"
        style={{ width: `${width}%`, boxShadow: "0 0 12px rgba(13,148,136,0.5)" }}
      />
    </div>
  );
}