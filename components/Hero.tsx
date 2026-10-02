import { ArrowRight, Download } from "lucide-react";
import ProfileVisual from "./ProfileVisual";
import Reveal from "./Reveal";
import { heroInterests, links, profile } from "@/data/portfolio";

const FIELD = "Industrial Information Technology";

export default function Hero() {
  // Highlight the study field inside the description, if it is present
  const [beforeField, afterField] = profile.heroDescription.split(FIELD);

  return (
    <section
      id="home"
      className="relative scroll-mt-32 overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* Background: blurred violet/sky orbs behind a fading dot grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="orb orb-violet -top-32 right-[-8%] size-[520px]" />
        <div className="orb orb-sky top-1/2 left-[-14%] size-[420px]" />
        <div className="dot-grid absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_72%)]" />
      </div>

      <div className="shell relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left column — introduction */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
              <span className="h-px w-8 shrink-0 bg-primary/70" aria-hidden="true" />
              {profile.kicker}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 leading-[0.95] tracking-[-0.04em]">
              <span className="block text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold">
                Hi, I&rsquo;m
              </span>
              <span className="text-gradient mt-1 block text-[clamp(2.75rem,5.5vw,4.75rem)] font-extrabold">
                {profile.name}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-dim sm:text-lg sm:leading-8">
              {beforeField}
              <span className="font-medium text-primary">{FIELD}</span>
              {afterField}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn btn-primary h-12 px-7">
                View My Projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href={links.cv} download className="btn btn-ghost h-12 px-7">
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
            </div>

            {/* Focus-area chips */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {heroInterests.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-xs font-medium text-ink-dim shadow-sm backdrop-blur-md"
                >
                  <Icon size={13} className="text-primary" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right column — glass profile card */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <Reveal delay={200} className="w-full max-w-md">
            <ProfileVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
