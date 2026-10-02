"use client";

import { useEffect, useRef } from "react";

/* Eight tapered rays, rotated around the sun's core. */
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

/**
 * Theme cursor: a cratered crescent moon in light mode, a radiant sun in dark
 * mode. Both are centred exactly on the pointer — the wrapper's (0,0) origin
 * is the pointer position and the icon centres itself on that origin, so the
 * glow can never read as the pointer being "somewhere else".
 *
 * Which icon shows is driven purely by the `.dark` class on <html>, so it
 * swaps correctly on first paint without any JS theme state.
 *
 * Enabled only on fine-pointer devices when the visitor has not asked for
 * reduced motion — otherwise the native cursor stays untouched.
 */
export default function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = followerRef.current;
    if (!element) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const OFFSCREEN = -200;

    /*
     * Written straight from the pointer event — any easing makes the icon
     * trail the pointer, which is most obvious crossing large cards.
     */
    const place = (x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (event: MouseEvent) => {
      place(event.clientX, event.clientY);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [role='button']");
      element.classList.toggle("is-active", Boolean(interactive));
    };

    const park = () => {
      place(OFFSCREEN, OFFSCREEN);
      element.classList.remove("is-active");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", park);
    document.addEventListener("mouseenter", park);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", park);
      document.removeEventListener("mouseenter", park);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={followerRef} className="cursor-follower" aria-hidden="true">
      {/* Soft outer bloom, tinted per theme by --cursor-glow */}
      <span className="cursor-halo" />

      <span className="cursor-icon">
        {/* ---- Crescent moon (light mode) ---- */}
        <svg className="cursor-moon" viewBox="0 0 32 32" width="26" height="26" fill="none">
          <defs>
            <linearGradient id="cursorMoonFill" x1="6" y1="4" x2="26" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="45%" stopColor="#e6edf7" />
              <stop offset="100%" stopColor="#9fb0c7" />
            </linearGradient>
            {/* Carve the crescent: full disc minus an offset disc */}
            <mask id="cursorMoonMask" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
              <circle cx="14.5" cy="16.5" r="12.6" fill="#fff" />
              <circle cx="22.5" cy="11.5" r="11.2" fill="#000" />
            </mask>
          </defs>

          <g mask="url(#cursorMoonMask)">
            <circle cx="14.5" cy="16.5" r="12.6" fill="url(#cursorMoonFill)" />
            {/* Craters */}
            <circle cx="10.2" cy="11.4" r="2.5" fill="#64748b" opacity="0.26" />
            <circle cx="7.6" cy="18.6" r="1.8" fill="#64748b" opacity="0.22" />
            <circle cx="12.4" cy="23.4" r="1.5" fill="#64748b" opacity="0.2" />
            <circle cx="6.4" cy="24.6" r="1.1" fill="#64748b" opacity="0.18" />
            <circle cx="13.6" cy="7.4" r="1.2" fill="#64748b" opacity="0.16" />
            <circle cx="9.4" cy="28" r="0.9" fill="#64748b" opacity="0.15" />
            {/* Bright inner-rim highlight along the terminator */}
            <path
              d="M22.6 4.4a12.6 12.6 0 0 0-6.4 23.4 12.6 12.6 0 0 1 6.4-23.4Z"
              fill="#ffffff"
              opacity="0.5"
            />
          </g>

          <circle
            cx="14.5"
            cy="16.5"
            r="12.6"
            stroke="#334155"
            strokeOpacity="0.3"
            strokeWidth="0.7"
            mask="url(#cursorMoonMask)"
          />
        </svg>

        {/* ---- Radiant sun (dark mode) ---- */}
        <svg className="cursor-sun" viewBox="0 0 32 32" width="26" height="26" fill="none">
          <defs>
            <radialGradient id="cursorSunCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="40%" stopColor="#fde68a" />
              <stop offset="78%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <linearGradient id="cursorSunRay" x1="16" y1="1.5" x2="16" y2="9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* Tapered rays, slowly rotating */}
          <g className="cursor-sun-rays">
            {RAY_ANGLES.map((angle) => (
              <path
                key={angle}
                d="M16 1.4 L17.6 8.8 L14.4 8.8 Z"
                fill="url(#cursorSunRay)"
                transform={`rotate(${angle} 16 16)`}
              />
            ))}
          </g>

          {/* Photosphere */}
          <circle cx="16" cy="16" r="8.4" fill="url(#cursorSunCore)" />
          {/* Granulation */}
          <circle cx="13.2" cy="13.8" r="1.6" fill="#f59e0b" opacity="0.26" />
          <circle cx="18.6" cy="14.6" r="1.2" fill="#ea580c" opacity="0.22" />
          <circle cx="14.4" cy="19.4" r="1.4" fill="#ea580c" opacity="0.2" />
          <circle cx="19.4" cy="19" r="0.9" fill="#f59e0b" opacity="0.22" />
          <circle cx="16" cy="16" r="8.4" stroke="#fffbeb" strokeOpacity="0.75" strokeWidth="0.7" />
        </svg>
      </span>
    </div>
  );
}
