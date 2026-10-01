import { Compass } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { exploring } from "@/data/portfolio";

export default function Exploring() {
  return (
    <section
      id="exploring"
      className="scroll-mt-24 border-t border-line/40 py-20 sm:py-24"
      aria-label="Areas I am exploring"
    >
      <div className="shell">
        <SectionHeading icon={Compass} title="Areas I'm Exploring" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {exploring.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 70} className="h-full">
              <article className="card card-hover h-full p-5">
                <span className="mb-3 grid size-9 place-items-center rounded-lg border border-brand/20 bg-brand/10 text-brand-bright">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-ink-dim">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
