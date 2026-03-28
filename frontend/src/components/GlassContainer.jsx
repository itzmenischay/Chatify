import React from "react";

const GlassContainer = ({
  children,
  className = "",
  padding = ""
}) => {
  return (
    <div
      className={`
        relative w-full h-full rounded-2xl md:rounded-3xl backdrop-blur-xl bg-white/0 border border-blue-400/20 shadow-[0_0_30px_rgba(59,130,246,0.18)] overflow-hidden mb-10 md:mb-400"
         ${className}
         ${padding ? "p-4 sm:p-6 md:p-8" : "p-0"}
      `}
    >
      {/* glass reflection layer */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-inherit
          bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_45%)]
        "
      />

      {/* subtle top glow */}
      <div
        className="
          pointer-events-none
          absolute -top-20 left-1/2 -translate-x-1/2
          w-[120%] h-40
          bg-blue-400/10 blur-3xl
        "
      />

      {/* content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassContainer;