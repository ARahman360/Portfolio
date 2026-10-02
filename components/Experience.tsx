import { ArrowUpRight, Target } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { GithubIcon } from "./BrandIcons";
import { careerEntries, initialRoleCount, targetRoles } from "@/data/career";

interface ExperienceProps {
  className?: string;
}

/** Roles revealed by the "show all" expander. */
const hiddenRoles = targetRoles.slice(initialRoleCount);

/** Small monospace category label (e.g. CURRENT STUDIES). */
function CategoryLabel({ category, period, isRight }: { category: string; period?: string; isRight: boolean }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase ${
        isRight ? "" : "md:justify-end"
      }`}
    >
      {category}
      {period ? <span className="text-ink-faint/80">· {period}</span> : null}
    </p>
  );
}

export default function Experience({ className = "" }: ExperienceProps) {
  return (
    <section id="experience" className={`scroll-mt-32 ${className}`}>
      <SectionHeading
        title="Technical Career Journey"
        subtitle="Building practical skills across industrial technology, software, automation and connected systems."
        className="text-center"
      />

      <ol className="relative mx-auto max-w-4xl">
        {/* Centered glowing rail (desktop); left rail on mobile */}
        <span
          aria-hidden="true"
          className="timeline-rail absolute top-3 bottom-3 left-[1.125rem] w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_14px_rgb(139_92_246/0.7)] md:left-1/2"
        />

        {careerEntries.map(
          ({ icon: Icon, title, organization, category, period, description, tags, link, linkLabel, direction }, index) => {
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
                  <span
                    className={`absolute inset-0 rounded-full shadow-[0_0_18px_rgb(139_92_246/0.85)] ${
                      direction
                        ? "border border-dashed border-primary/70 bg-transparent"
                        : "bg-gradient-to-br from-sky-400 to-violet-500"
                    }`}
                  />
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
                  <article
                    className={`card p-5 sm:p-6 ${direction ? "border-dashed border-primary/40" : "card-hover"}`}
                  >
                    <div
                      className={`flex items-start gap-4 ${isRight ? "" : "md:flex-row-reverse md:text-right"}`}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-400/10 text-primary">
                        <Icon size={19} aria-hidden="true" />
                      </span>

                      <div className="min-w-0">
                        <CategoryLabel category={category} period={period} isRight={isRight} />

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
                            className={`mt-3 flex flex-wrap gap-1.5 ${isRight ? "" : "md:justify-end"}`}
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

                        {direction ? (
                          <p
                            className={`mt-3 font-mono text-[10px] tracking-[0.12em] text-primary/80 uppercase ${
                              isRight ? "" : "md:text-right"
                            }`}
                          >
                            Where I am heading
                          </p>
                        ) : null}

                        {link ? (
                          <div className={`mt-3 ${isRight ? "" : "md:flex md:justify-end"}`}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost px-3 py-1.5 text-[12px]"
                            >
                              <GithubIcon size={14} />
                              {linkLabel ?? "View project"}
                              <ArrowUpRight size={13} aria-hidden="true" />
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          },
        )}
      </ol>

      {/* Career direction — target roles, deliberately not ranked and not
          presented as positions held. */}
      <Reveal delay={120} className="mx-auto mt-16 max-w-4xl sm:mt-20">
        <div className="card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-400/10 text-primary">
              <Target size={18} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-ink">
                Roles I&apos;m Preparing For
              </h3>
              <p className="mt-1 text-sm leading-6 text-ink-dim">
                Career paths I am developing skills toward — not roles I currently hold.
              </p>
            </div>
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {targetRoles.slice(0, initialRoleCount).map((role) => (
              <li
                key={role}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 text-[13px] font-medium text-ink"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-violet-500"
                />
                {role}
              </li>
            ))}
          </ul>

          {hiddenRoles.length ? (
            <details className="group mt-3">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-1 py-1 font-mono text-[11px] tracking-[0.12em] text-primary uppercase select-none hover:underline [&::-webkit-details-marker]:hidden">
                Show the other {hiddenRoles.length} paths
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-90"
                />
              </summary>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {hiddenRoles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 text-[13px] font-medium text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-violet-500"
                    />
                    {role}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
