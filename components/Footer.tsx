import SocialLinks from "./SocialLinks";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-night-soft/60">
      <div className="shell flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight"
            aria-label={`${profile.name} — back to top`}
          >
            {profile.monogram}
            <span className="text-accent">.</span>
          </a>
          <p className="mt-2 text-sm text-ink-dim">© 2026 {profile.name}</p>
          <p className="mt-1 text-xs text-ink-faint">{profile.headline}</p>
          <p className="text-xs text-ink-faint">{profile.university}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <SocialLinks />
          <a
            href="#home"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint transition-colors hover:text-brand-bright"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
