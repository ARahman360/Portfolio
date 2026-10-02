"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

/**
 * Floating icon dock (Lightswind template signature): a glass pill holding one
 * circular button per section. Hovering lifts an icon and reveals its label
 * tooltip above it. Hidden on small screens, where the navbar menu is used.
 */
export default function DockNav() {
  const [active, setActive] = useState("home");
  const spyLock = useRef(0);

  /* Scroll-spy so the dock always mirrors the section in view */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (Date.now() < spyLock.current) return;

      const line = window.scrollY + window.innerHeight * 0.35;
      let currentId = navLinks[0].id;
      let bestTop = -Infinity;

      for (const item of navLinks) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= line && top > bestTop) {
          bestTop = top;
          currentId = item.id;
        }
      }

      setActive(currentId);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Section quick navigation"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center px-4 lg:flex"
    >
      <ul className="glass pointer-events-auto flex items-end gap-1.5 rounded-full p-2.5 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.45)]">
        {navLinks.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;

          return (
            <li key={id} className="group relative">
              {/* Tooltip */}
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-bg opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100"
              >
                {label}
              </span>

              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  // Instant feedback before the spy catches up
                  spyLock.current = Date.now() + 700;
                  setActive(id);
                }}
                className={`grid size-12 place-items-center rounded-full transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 ${
                  isActive
                    ? "bg-ink text-bg shadow-lg"
                    : "bg-card text-ink-dim hover:bg-bg-soft hover:text-ink"
                }`}
              >
                <Icon size={19} aria-hidden="true" />
              </a>

              {/* Active dot under the current section */}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </li>
          );
        })}
      </ul>

      {/* Screen-reader shortcut to the top of the page */}
      <span className="sr-only">
        <a href="#home">Back to {profile.name}&rsquo;s introduction</a>
      </span>
    </nav>
  );
}
