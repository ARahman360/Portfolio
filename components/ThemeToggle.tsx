"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/* Custom event fired in this tab so the toggle re-renders after the DOM
   class changes (the `storage` event only fires in other tabs). */
const THEME_EVENT = "theme-change";

const readIsDark = () => document.documentElement.classList.contains("dark");
const readServerIsDark = () => false;

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

/**
 * Light/dark switch for the template-style theme. The default is light and
 * the choice is persisted in localStorage (applied pre-paint by the inline
 * script in app/layout.tsx). The DOM class is the single source of truth,
 * read through useSyncExternalStore.
 */
export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, readIsDark, readServerIsDark);

  const toggle = () => {
    const next = !readIsDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage may be unavailable — the toggle still works for this visit */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-card/60 text-ink-dim transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
    >
      {dark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  );
}
