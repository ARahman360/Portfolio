import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  /** One-line description shown under the title (template style). */
  subtitle?: string;
  /** Optional element on the right side of the heading (e.g. a button). */
  action?: ReactNode;
  /** Extra classes on the wrapper (e.g. "text-center"). */
  className?: string;
}

/**
 * Large extrabold section title with an optional subtitle and action —
 * the heading treatment used throughout the Lightswind template.
 */
export default function SectionHeading({ title, subtitle, action, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12 ${className}`}>
      <div>
        <h2 className="text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-dim">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
