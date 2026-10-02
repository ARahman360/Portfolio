import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { exploring } from "@/data/portfolio";

export default function Exploring() {
  return (
    <section
      id="exploring"
      className="scroll-mt-32 border-t border-line py-20 sm:py-24"
      aria-label="Areas I am exploring"
    >
      <div className="shell">
        <SectionHeading
          title="Areas I'm Exploring"
          subtitle="The technical fields I am currently learning and building projects in."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {exploring.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 70} className="h-full">
              <article className="card card-hover h-full p-5 sm:p-6">
                <span className="mb-4 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-400/10 text-primary">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="text-[15px] font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-ink-dim">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
