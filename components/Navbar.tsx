"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Download, Menu, X } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { links, navLinks, profile } from "@/data/portfolio";

/**
 * Fixed navigation bar with scroll-spy, smooth scrolling and a
 * mobile hamburger menu.
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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line/70 bg-night/85 backdrop-blur-xl"
          : "border-transparent bg-night/40 backdrop-blur-md"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        {/* Monogram */}
        <a
          href="#home"
          onClick={() => handleNavClick("home")}
          className="shrink-0 font-display text-xl font-bold tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          {profile.monogram}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-brand-bright" : "text-ink-dim hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px bg-brand-bright transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
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
          <SocialLinks className="hidden sm:flex" />
          <a href={links.cv} download className="btn btn-ghost hidden px-4 py-2.5 text-sm md:inline-flex">
            <Download size={15} aria-hidden="true" />
            Download CV
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-lg border border-line/70 bg-surface/60 text-ink-dim transition hover:border-brand/50 hover:text-ink lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-menu-in border-t border-line/60 bg-night/95 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile" className="shell py-4">
            <ul className="grid gap-1">
              {navLinks.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                        isActive
                          ? "bg-brand/10 text-brand-bright"
                          : "text-ink-dim hover:bg-surface hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <ChevronRight size={16} aria-hidden="true" className="opacity-60" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/60 pt-4">
              <SocialLinks />
              <a href={links.cv} download className="btn btn-primary px-4 py-2.5 text-xs">
                <Download size={14} aria-hidden="true" />
                Download CV
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
