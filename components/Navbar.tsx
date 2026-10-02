"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Download, Menu, X } from "lucide-react";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";
import { links, navLinks, profile } from "@/data/portfolio";

/**
 * Floating glass pill navigation with scroll-spy, smooth scrolling and a
 * mobile menu — styled after the Lightswind portfolio template.
 *
 * Positioned `absolute` (not `fixed`) so it scrolls away with the hero; the
 * persistent navigation lives in the floating dock at the bottom of the page.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const spyLock = useRef(0);

  /* Highlight the section currently in view */
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
        // Greatest section top that has passed the line; ties keep the
        // earlier nav item (About/Skills share the same row).
        if (top <= line && top > bestTop) {
          bestTop = top;
          currentId = item.id;
        }
      }

      setActive(currentId);
      setScrolled(window.scrollY > 12);
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

  /* Close the menu with Escape */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleNavClick = (id: string) => {
    // Give instant feedback on the clicked item before the spy catches up
    spyLock.current = Date.now() + 700;
    setActive(id);
    setOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-4 z-50 flex flex-col items-center px-4">
      {/* Floating glass pill */}
      <div
        className={`glass w-full max-w-7xl rounded-[2rem] px-5 py-3 transition-shadow duration-300 sm:px-6 ${
          scrolled || open ? "shadow-2xl" : "shadow-xl"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo — gradient monogram tile + stacked wordmark */}
          <a
            href="#home"
            onClick={() => handleNavClick("home")}
            className="group flex shrink-0 items-center gap-3 select-none"
            aria-label={`${profile.name} — home`}
          >
            <span className="gradient-ring grid size-9 place-items-center rounded-xl p-px shadow-lg transition-transform duration-300 group-hover:scale-105">
              <span className="grid size-full place-items-center rounded-[11px] bg-bg">
                <span className="bg-gradient-to-r from-violet-500 to-sky-400 bg-clip-text text-xs font-extrabold tracking-tighter text-transparent">
                  {profile.monogram}
                </span>
              </span>
            </span>
            <span className="flex flex-col text-left">
              <span className="text-sm leading-none font-extrabold tracking-tight transition-colors group-hover:text-primary">
                {profile.name}
              </span>
              <span className="mt-1 text-[9px] font-bold tracking-widest text-ink-dim uppercase">
                Portfolio
              </span>
            </span>
          </a>

          {/* Desktop navigation — switches on at xl so the pill never
              overflows between 1024px and 1280px */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex space-x-4 xl:space-x-6">
              {navLinks.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="group relative">
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-primary" : "text-ink-dim hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-300 ${
                          isActive ? "w-6" : "w-0 group-hover:w-6"
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SocialLinks className="hidden xl:flex" />
            <a
              href={links.cv}
              download
              className="btn btn-ghost hidden px-5 py-2.5 text-sm md:inline-flex xl:hidden"
            >
              <Download size={15} aria-hidden="true" />
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-card/60 text-ink-dim transition-all duration-200 hover:border-primary/50 hover:text-primary xl:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — glass panel below the pill */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-menu-in glass mt-2 w-full max-w-7xl rounded-3xl p-4 shadow-xl xl:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="grid gap-1">
              {navLinks.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-ink-dim hover:bg-bg-soft hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <ChevronRight size={16} aria-hidden="true" className="opacity-60" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-4">
              <SocialLinks />
              <a href={links.cv} download className="btn btn-primary px-4 py-2.5 text-xs">
                <Download size={14} aria-hidden="true" />
                Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
