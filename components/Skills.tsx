import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/data/skills";

interface SkillsProps {
  className?: string;
}

export default function Skills({ className = "" }: SkillsProps) {
  return (
    <section id="skills" className={`scroll-mt-32 ${className}`}>
      <SectionHeading
        title="My Skills"
        subtitle="The technical skills I use and keep developing through my studies and projects."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 80} className="h-full">
            <article className="card card-hover h-full p-5 sm:p-6">
              <header className="mb-4 flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <category.icon size={16} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[15px] font-bold tracking-tight text-ink">
                  {category.title}
                </h3>
              </header>

              <ul className="grid grid-cols-2 gap-2.5">
                {category.skills.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-bg-soft px-3 py-2.5"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 text-[13px] leading-tight font-medium text-ink-dim">
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
