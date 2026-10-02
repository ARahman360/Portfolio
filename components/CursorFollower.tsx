"use client";

import { useEffect, useRef } from "react";

/**
 * Glowing cursor dot.
 *
 * Deliberately a symmetric dot centred on the pointer rather than an arrow:
 * an arrow has its hotspot at one corner, so any glow or scaling reads as the
 * pointer being "somewhere else". A centred dot cannot drift.
 *
 * Colours come from CSS custom properties (`--cursor-dot`, `--cursor-glow`) so
 * light and dark mode are handled entirely in globals.css.
 *
 * Only enabled on fine-pointer devices when the visitor has not asked for
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
     * Written straight from the pointer event. Any easing makes the dot trail
     * the pointer, which is most obvious when crossing large cards.
     * The element's origin (0,0) IS the pointer position; the dot is centred
     * on that origin with a -50% transform.
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
      <span className="cursor-halo" />
      <span className="cursor-dot" />
    </div>
  );
}
