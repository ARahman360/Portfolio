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

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let frame = 0;

    const render = () => {
      x += (targetX - x) * 0.25;
      y += (targetY - y) * 0.25;
      element.style.transform = `translate(${x}px, ${y}px)`;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [role='button']");
      element.classList.toggle("is-active", Boolean(interactive));
    };

    /* Hide the follower once the pointer leaves the viewport */
    const onLeave = () => {
      targetX = -100;
      targetY = -100;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={followerRef} className="cursor-follower" aria-hidden="true">
      {/* Classic arrow pointer with its tip at the element origin (0,0) */}
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path
          d="M1 1 L1 17.6 L5.4 13.4 L8.3 20.4 L11.7 18.9 L8.8 12.2 L14.9 11.7 Z"
          fill="currentColor"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
