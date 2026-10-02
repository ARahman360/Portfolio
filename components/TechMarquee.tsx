"use client";

import { useState } from "react";
import { skillCategories, type Skill } from "@/data/skills";

/* Brand logos for the marquee pills (devicon CDN, same source the template
   uses) — anything without a logo, or whose image fails to load, falls back
   to its lucide icon. */
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const devicon: Record<string, string> = {
  Python: `${DEVICON_BASE}python/python-original.svg`,
  Java: `${DEVICON_BASE}java/java-original.svg`,
  HTML: `${DEVICON_BASE}html5/html5-original.svg`,
  CSS: `${DEVICON_BASE}css3/css3-original.svg`,
  Git: `${DEVICON_BASE}git/git-original.svg`,
  GitHub: `${DEVICON_BASE}github/github-original.svg`,
  Linux: `${DEVICON_BASE}linux/linux-original.svg`,
  "VS Code": `${DEVICON_BASE}vscode/vscode-original.svg`,
};

function MarqueePill({ skill }: { skill: Skill }) {
  const [broken, setBroken] = useState(false);
  const logo = devicon[skill.name];
  const Icon = skill.icon;
  /* GitHub's monochrome logo would disappear on the dark background */
  const invert = skill.name === "GitHub" ? "dark:invert" : "";

  return (
    <li className="group mx-3 flex shrink-0 cursor-default items-center gap-3 rounded-full border border-line bg-card/80 px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/5">
      {logo && !broken ? (
        /* Plain <img> on purpose: dynamic external CDN logos with a runtime
           fallback — next/image would require remotePatterns config. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          onError={() => setBroken(true)}
          className={`h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110 ${invert}`}
        />
      ) : (
        <Icon size={18} className="text-primary" aria-hidden="true" />
      )}
      <span className="tracking-wide text-xs md:text-sm">{skill.name}</span>
    </li>
  );
}

function MarqueeTrack({ items, reverse = false }: { items: Skill[]; reverse?: boolean }) {
  /* The list is rendered twice so the -50% keyframe loops seamlessly */
  return (
    <ul className={`marquee-track items-center py-1 ${reverse ? "marquee-track--reverse" : ""}`}>
      {[...items, ...items].map((skill, index) => (
        <MarqueePill key={`${skill.name}-${index}`} skill={skill} />
      ))}
    </ul>
  );
}

/**
 * Two opposing marquee rows of skill pills (Lightswind template signature).
 * Items come straight from the skills data so the marquee always matches
 * the Skills section.
 */
export default function TechMarquee() {
  const programming = skillCategories.slice(0, 2).flatMap((category) => category.skills);
  const industrial = skillCategories.slice(2).flatMap((category) => category.skills);

  return (
    <section aria-label="Skills overview" className="relative overflow-hidden py-7">
      <div className="marquee-fade flex flex-col gap-4">
        <MarqueeTrack items={programming} />
        <MarqueeTrack items={industrial} reverse />
      </div>
    </section>
  );
}
