import { ArrowRight, Download } from "lucide-react";
import ProfileVisual from "./ProfileVisual";
import Reveal from "./Reveal";
import { links, profile, techChips } from "@/data/portfolio";

const FIELD = "Industrial Information Technology";

export default function Hero() {
  // Highlight the study field inside the description, if it is present
  const [beforeField, afterField] = profile.heroDescription.split(FIELD);

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
      {/* Background: faint technical grid + a single soft blue glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_75%)]" />
        <div className="hero-glow absolute -top-40 right-[-12%] size-[560px]" />
      </div>

      <div className="shell relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left column — introduction */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-brand-bright">
              <span className="h-px w-8 shrink-0 bg-brand-bright/70" aria-hidden="true" />
              {profile.kicker}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">Hi, I&rsquo;m</span>
              <span className="block">
                Md Abdur <span className="text-gradient">Rahman</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-dim">
              {beforeField}
              <span className="font-medium text-brand-bright">{FIELD}</span>
              {afterField}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn btn-primary">
                View My Projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href={links.cv} download className="btn btn-ghost">
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
            </div>

            {/* Technology chips */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {techChips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-surface/60 px-3.5 py-1.5 font-mono text-xs text-ink-dim"
                >
                  <Icon size={13} className="text-brand-bright" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right column — portrait / monogram visual */}
        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <ProfileVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
