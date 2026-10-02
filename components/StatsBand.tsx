import { Briefcase, Compass, Braces, Rocket } from "lucide-react";
import Reveal from "./Reveal";
import { exploring, experiences } from "@/data/portfolio";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";

/* Every number is derived from the real data files — nothing is invented. */
const skillCount = skillCategories.reduce((total, category) => total + category.skills.length, 0);

const stats = [
  { value: projects.length, label: "Projects showcased", icon: Rocket },
  { value: skillCount, label: "Technical skills", icon: Braces },
  { value: exploring.length, label: "Focus areas", icon: Compass },
  { value: experiences.length, label: "Work experiences", icon: Briefcase },
];

/** Big-number statistics band (Lightswind template signature). */
export default function StatsBand() {
  return (
    <section aria-label="Portfolio in numbers" className="border-y border-line bg-bg-soft">
      <div className="shell grid grid-cols-2 gap-8 py-14 sm:py-16 md:grid-cols-4">
        {stats.map(({ value, label, icon: Icon }, index) => (
          <Reveal key={label} delay={index * 70} className="h-full">
            <div className="text-center">
              <span className="mx-auto mb-3 grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon size={17} aria-hidden="true" />
              </span>
              <p className="text-[2rem] leading-none font-extrabold tracking-tight">{value}</p>
              <p className="mt-2 text-sm text-ink-dim">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
