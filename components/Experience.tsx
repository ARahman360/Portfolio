import { Briefcase } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/data/portfolio";

interface ExperienceProps {
  className?: string;
}

export default function Experience({ className = "" }: ExperienceProps) {
  return (
    <section id="experience" className={`scroll-mt-24 ${className}`}>
      <SectionHeading icon={Briefcase} title="Experience" />

      <div className="grid gap-4">
        {experiences.map(({ icon: Icon, title, description }, index) => (
          <Reveal key={title} delay={index * 80}>
            <article className="card card-hover flex items-start gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-brand/20 bg-brand/10 text-brand-bright">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-dim">{description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
