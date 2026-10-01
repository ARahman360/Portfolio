import { Layers } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/data/skills";

interface SkillsProps {
  className?: string;
}

export default function Skills({ className = "" }: SkillsProps) {
  return (
    <section id="skills" className={`scroll-mt-24 ${className}`}>
      <SectionHeading icon={Layers} title="My Skills" />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 80} className="h-full">
            <article className="card card-hover h-full p-5">
              <header className="mb-4 flex items-center gap-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-md border border-brand/20 bg-brand/10 text-brand-bright">
                  <category.icon size={14} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[15px] font-semibold text-ink">{category.title}</h3>
              </header>

              <ul className="grid grid-cols-2 gap-2.5">
                {category.skills.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 rounded-lg border border-line/50 bg-night/40 px-3 py-2.5"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand/10 text-brand-bright">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 text-[13px] font-medium leading-tight text-ink-dim">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
