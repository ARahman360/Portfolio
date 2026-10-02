import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/data/portfolio";

interface ExperienceProps {
  className?: string;
}

export default function Experience({ className = "" }: ExperienceProps) {
  return (
    <section id="experience" className={`scroll-mt-32 ${className}`}>
      <SectionHeading
        title="Career Journey"
        subtitle="An evolving path of responsibility, teamwork and hands-on experience."
      />

      <ol className="relative space-y-10">
        {/* Glowing vertical rail running the full height of the timeline */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[1.375rem] w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400 via-violet-500 to-transparent shadow-[0_0_14px_rgb(139_92_246/0.75)]"
        />

        {experiences.map(({ icon: Icon, title, description }, index) => (
          <li key={title} className="relative pl-16">
            {/* Timeline node — kept outside <Reveal> so its absolute position
                resolves against the <li>, not the reveal wrapper's transform. */}
            <span
              aria-hidden="true"
              className="absolute top-1 left-[1.375rem] grid size-8 -translate-x-1/2 place-items-center rounded-full bg-card"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 shadow-[0_0_18px_rgb(139_92_246/0.8)]" />
              <span className="relative size-3 rounded-full border-2 border-card bg-white" />
            </span>

            <Reveal delay={index * 90}>
              <article className="card card-hover p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-400/10 text-primary">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.22em] text-ink-faint uppercase">
                      Experience {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1.5 text-[15px] font-bold tracking-tight text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink-dim">{description}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
