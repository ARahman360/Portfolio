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
        className="text-center"
      />

      <ol className="relative mx-auto max-w-4xl">
        {/* Centered glowing rail (desktop); left rail on mobile */}
        <span
          aria-hidden="true"
          className="timeline-rail absolute top-3 bottom-3 left-[1.125rem] w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_14px_rgb(139_92_246/0.7)] md:left-1/2"
        />

        {experiences.map(({ icon: Icon, title, organization, period, description, tags, sample }, index) => {
          const isRight = index % 2 === 1;

          return (
            <li
              key={title}
              className="relative pb-10 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-12 md:pb-14 md:pl-0"
            >
              {/* Node — direct child of <li> so its absolute position resolves
                  against the <li> rather than the reveal wrapper's transform. */}
              <span
                aria-hidden="true"
                className="timeline-node absolute top-2 left-[1.125rem] grid size-9 -translate-x-1/2 place-items-center rounded-full bg-bg md:top-6 md:left-1/2"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 shadow-[0_0_18px_rgb(139_92_246/0.85)]" />
                <span className="relative size-3 rounded-full border-2 border-bg bg-white" />
              </span>

              {/* Card sits on the left or right half on desktop */}
              <Reveal
                delay={index * 90}
                className={
                  isRight
                    ? "md:col-start-2 md:row-start-1 md:pl-6"
                    : "md:col-start-1 md:row-start-1 md:pr-6 md:text-right"
                }
              >
                <article className="card card-hover p-5 sm:p-6">
                  <div
                    className={`flex items-start gap-4 ${
                      isRight ? "" : "md:flex-row-reverse md:text-right"
                    }`}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-400/10 text-primary">
                      <Icon size={19} aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <p
                        className={`flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase ${
                          isRight ? "" : "md:justify-end"
                        }`}
                      >
                        {period}
                        {sample ? (
                          <span className="rounded-full border border-dashed border-primary/50 px-2 py-0.5 text-[9px] text-primary">
                            Sample
                          </span>
                        ) : null}
                      </p>

                      <h3 className="mt-1.5 text-base font-bold tracking-tight text-ink">
                        {title}
                      </h3>

                      {organization ? (
                        <p className="mt-0.5 text-[13px] font-semibold text-primary">
                          {organization}
                        </p>
                      ) : null}

                      <p className="mt-2 text-sm leading-6 text-ink-dim">{description}</p>

                      {tags?.length ? (
                        <ul
                          className={`mt-3 flex flex-wrap gap-1.5 ${
                            isRight ? "" : "md:justify-end"
                          }`}
                        >
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-line bg-bg-soft px-2.5 py-0.5 font-mono text-[10px] text-ink-dim"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
