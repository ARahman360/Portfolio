import { Award, MapPin, School } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/portfolio";

interface EducationProps {
  className?: string;
}

export default function Education({ className = "" }: EducationProps) {
  const entry = education[0];

  return (
    <section id="education" className={`scroll-mt-32 ${className}`}>
      <SectionHeading
        title="Education"
        subtitle="Academic background and my current studies."
      />

      {entry ? (
        <Reveal>
          <article className="card card-hover overflow-hidden p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="gradient-ring grid size-12 shrink-0 place-items-center rounded-xl p-px shadow-md">
                  <span className="grid size-full place-items-center rounded-[11px] bg-card text-primary">
                    <School size={20} aria-hidden="true" />
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug font-extrabold tracking-tight text-ink">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{entry.program}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-[11px] font-bold tracking-wider text-ink uppercase">
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                {entry.status}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-xs text-ink-dim">
              <span className="inline-flex items-center gap-1.5">
                <Award size={13} aria-hidden="true" />
                {entry.degree}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} aria-hidden="true" />
                {entry.location}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-ink-dim">{entry.description}</p>
          </article>
        </Reveal>
      ) : null}
    </section>
  );
}
