import { Award, GraduationCap, MapPin, School } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/portfolio";

interface EducationProps {
  className?: string;
}

export default function Education({ className = "" }: EducationProps) {
  const entry = education[0];

  return (
    <section id="education" className={`scroll-mt-24 ${className}`}>
      <SectionHeading icon={GraduationCap} title="Education" />

      {entry ? (
        <Reveal>
          <article className="card card-hover overflow-hidden p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                  <School size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-bright">{entry.program}</p>
                </div>
              </div>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-brand-bright">
                {entry.status}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line/50 pt-4 font-mono text-xs text-ink-faint">
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
