import SocialLinks from "./SocialLinks";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative z-10 rounded-t-[3rem] border-t border-line bg-card/60 shadow-2xl backdrop-blur-2xl">
      {/* Extra bottom padding keeps content clear of the floating dock */}
      <div className="shell flex flex-col items-center justify-between gap-8 py-12 pb-28 sm:flex-row sm:py-14 sm:pb-28">
        {/* Identity */}
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <a
            href="#home"
            className="group inline-flex items-center gap-3"
            aria-label={`${profile.name} — back to top`}
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
          <p className="text-sm text-ink-dim">
            © 2026 {profile.name} · {profile.headline}
          </p>
          <p className="text-xs text-ink-faint">{profile.university}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          <SocialLinks />
          <a
            href="#home"
            className="btn btn-ghost px-4 py-2 text-[11px] tracking-widest uppercase"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
