import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  /** Optional element on the right side of the heading (e.g. a button). */
  action?: ReactNode;
}

export default function SectionHeading({ icon: Icon, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2.1rem]">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
          <Icon size={18} aria-hidden="true" />
        </span>
        {title}
      </h2>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
