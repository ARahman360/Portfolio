"use client";

import { useEffect, useRef } from "react";

/* Eight tapered rays, rotated around the sun's core. */
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

/*
 * Moon craters. Each is drawn twice: a dark basin plus a slightly offset
 * lighter ring on the upper-left, which reads as a lit crater rim.
 */
const CRATERS = [
  { x: 10.4, y: 11.2, r: 2.6, o: 0.42 },
  { x: 6.6, y: 17.4, r: 1.9, o: 0.38 },
  { x: 12.6, y: 23.2, r: 2.2, o: 0.4 },
  { x: 17.8, y: 9.4, r: 1.4, o: 0.32 },
  { x: 20.6, y: 17.8, r: 1.7, o: 0.34 },
  { x: 15.2, y: 18.6, r: 1.1, o: 0.3 },
  { x: 8.2, y: 23.6, r: 1.2, o: 0.32 },
  { x: 23.2, y: 12.4, r: 1, o: 0.3 },
  { x: 19.4, y: 24.2, r: 1.3, o: 0.32 },
  { x: 13.4, y: 6.6, r: 0.9, o: 0.26 },
] as const;

/* Dark basalt plains (the "seas") on the near side of the moon. */
const MARIA = [
  { x: 11.4, y: 13.2, rx: 4.4, ry: 3.6, rot: -22, o: 0.42 },
  { x: 20.6, y: 15.4, rx: 3.2, ry: 4.1, rot: 14, o: 0.36 },
  { x: 14.8, y: 21.4, rx: 4, ry: 2.7, rot: -8, o: 0.34 },
  { x: 22.4, y: 21.6, rx: 2, ry: 1.7, rot: 20, o: 0.28 },
] as const;

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
        {/* ---- Full moon (light mode) ---- */}
        <svg className="cursor-moon" viewBox="0 0 32 32" width="26" height="26" fill="none">
          <defs>
            {/* Sphere shading: lit upper-left, shadowed lower-right limb */}
            <radialGradient id="cursorMoonBody" cx="36%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#b9c5d6" />
              <stop offset="45%" stopColor="#8b99ae" />
              <stop offset="100%" stopColor="#525f75" />
            </radialGradient>
            {/* Limb darkening so the disc reads as a sphere */}
            <radialGradient id="cursorMoonLimb" cx="40%" cy="34%" r="72%">
              <stop offset="58%" stopColor="#0b1220" stopOpacity="0" />
              <stop offset="100%" stopColor="#0b1220" stopOpacity="0.45" />
            </radialGradient>
          </defs>

          {/* Base disc */}
          <circle cx="16" cy="16" r="12.6" fill="url(#cursorMoonBody)" />

          {/* Maria */}
          {MARIA.map((m) => (
            <ellipse
              key={`${m.x}-${m.y}`}
              cx={m.x}
              cy={m.y}
              rx={m.rx}
              ry={m.ry}
              fill="#4a5768"
              opacity={m.o}
              transform={`rotate(${m.rot} ${m.x} ${m.y})`}
            />
          ))}

          {/* Craters with lit rims */}
          {CRATERS.map((c) => (
            <g key={`${c.x}-${c.y}`}>
              <circle cx={c.x} cy={c.y} r={c.r} fill="#3d495c" opacity={c.o} />
              <circle
                cx={c.x - c.r * 0.16}
                cy={c.y - c.r * 0.16}
                r={c.r}
                fill="none"
                stroke="#f4f7fb"
                strokeOpacity="0.6"
                strokeWidth={Math.max(c.r * 0.22, 0.4)}
              />
            </g>
          ))}

          {/* Limb shading + outline */}
          <circle cx="16" cy="16" r="12.6" fill="url(#cursorMoonLimb)" />
          <circle cx="16" cy="16" r="12.6" stroke="#475569" strokeOpacity="0.4" strokeWidth="0.7" />
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
