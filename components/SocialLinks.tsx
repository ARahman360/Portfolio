import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { links, linkedinHref, mailHref } from "@/data/portfolio";

interface SocialIconProps {
  href: string | null;
  label: string;
  children: ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  const baseClass =
    "grid size-9 place-items-center rounded-lg border border-line/70 bg-surface/60 text-ink-dim transition duration-200";

  if (!href) {
    return (
      <span
        className={`${baseClass} cursor-not-allowed opacity-50`}
        title={`${label} link not set yet — add it in data/portfolio.ts`}
        aria-label={`${label} link not set yet`}
      >
        {children}
      </span>
    );
  }

  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer noopener"}
      aria-label={label}
      className={`${baseClass} hover:-translate-y-0.5 hover:border-brand/50 hover:text-ink`}
    >
      {children}
    </a>
  );
}

interface SocialLinksProps {
  className?: string;
  size?: number;
}

/** GitHub / LinkedIn / Email icon row — used in the navbar and footer. */
export default function SocialLinks({ className = "", size = 17 }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SocialIcon href={links.github} label="GitHub">
        <GithubIcon size={size} />
      </SocialIcon>
      <SocialIcon href={linkedinHref} label="LinkedIn">
        <LinkedinIcon size={size} />
      </SocialIcon>
      <SocialIcon href={mailHref} label="Email">
        <Mail size={size} aria-hidden="true" />
      </SocialIcon>
    </div>
  );
}
