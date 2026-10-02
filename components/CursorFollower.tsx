"use client";

import { useEffect, useRef } from "react";

/**
 * Glowing custom cursor (Lightswind template signature).
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

    /* The follower is parked off-screen until the first pointer event. */
    const OFFSCREEN = -200;
    let lastX = OFFSCREEN;
    let lastY = OFFSCREEN;
    let seen = false;

    /*
     * Position is written straight from the pointer event — no easing loop.
     * Any lerp/smoothing makes the arrow visibly trail the real cursor, which
     * is worst exactly where it matters: crossing a large card or heading.
     */
    const onMove = (event: MouseEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!seen) {
        seen = true;
        element.style.transition = "none";
      }
      element.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [role='button']");
      element.classList.toggle("is-active", Boolean(interactive));
    };

    /* Park the follower once the pointer leaves the viewport */
    const onLeave = () => {
      element.style.transform = `translate3d(${OFFSCREEN}px, ${OFFSCREEN}px, 0)`;
      element.classList.remove("is-active");
    };

    /* Park it on entry too, so it never shows at the last known spot */
    const onEnter = () => {
      if (!seen) onLeave();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={followerRef} className="cursor-follower" aria-hidden="true">
      {/* Classic arrow pointer. The tip sits at (0,0) so the hotspot lands
          exactly under the real pointer position. */}
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path
          d="M0 0 L0 16.6 L4.4 12.4 L7.3 19.4 L10.7 17.9 L7.8 11.2 L13.9 10.7 Z"
          fill="currentColor"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
