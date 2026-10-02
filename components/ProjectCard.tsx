"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { CookingPot, ExternalLink, ImageOff, LayoutTemplate, Utensils } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project, ProjectIconName } from "@/data/projects";

/** Placeholder icon per project — kept here so the data file stays serialisable. */
const PLACEHOLDER_ICONS: Record<ProjectIconName, typeof CookingPot> = {
  kitchen: CookingPot,
  restaurant: Utensils,
  layout: LayoutTemplate,
};

interface ProjectLinkProps {
  href: string | undefined;
  label: string;
  /** Accessible name, e.g. "Open the HomeFoods repository on GitHub". */
  ariaLabel: string;
  icon: ReactNode;
}

/** Renders a link, or nothing at all when no real URL exists yet. */
function ProjectLink({ href, label, ariaLabel, icon }: ProjectLinkProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="btn btn-ghost px-3.5 py-2 text-xs"
    >
      {icon}
      {label}
    </a>
  );
}

interface ProjectCardProps {
  project: Project;
  /** The featured project uses a larger horizontal layout. */
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imageOk, setImageOk] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const Icon = project.icon ? PLACEHOLDER_ICONS[project.icon] : null;

  return (
    <article
      className={`card card-hover group flex h-full flex-col overflow-hidden ${featured ? "lg:flex-row" : ""}`}
    >
      {/* Media — a polished branded placeholder shows when the file is missing,
          so a missing screenshot never breaks the card or triggers a broken icon. */}
      <div
        className={`relative aspect-video shrink-0 overflow-hidden border-b border-line ${
          featured ? "lg:aspect-auto lg:w-1/2 lg:border-r lg:border-b-0" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-sky-400/10 to-violet-500/5">
          <div className="dot-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative grid h-full place-items-center p-6 text-center">
            <div>
              <span className="mx-auto mb-3 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-sky-400/15 text-primary">
                {Icon ? <Icon size={20} aria-hidden="true" /> : <ImageOff size={18} aria-hidden="true" />}
              </span>
              <span className="block break-words font-display text-base font-bold text-ink">
                {project.title}
              </span>
              <span className="mt-1.5 block font-mono text-[9px] tracking-[0.2em] text-ink-faint uppercase">
                Screenshot coming soon
              </span>
            </div>
          </div>
        </div>

        {imageOk && (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
            className={`object-cover object-top transition-all duration-500 group-hover:scale-[1.04] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={() => setImageOk(false)}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
        <p className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
          {project.subtitle}
        </p>
        <h3
          className={`mt-2 font-display leading-snug font-extrabold tracking-tight text-ink ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>

        <p className={`mt-3 leading-6 text-ink-dim ${featured ? "text-sm sm:text-[15px]" : "text-sm"}`}>
          {project.description}
        </p>
        {featured && project.details ? (
          <p className="mt-3 text-sm leading-6 text-ink-dim">{project.details}</p>
        ) : null}

        {/* Technology tags */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-bg-soft px-2.5 py-1 text-[11px] font-medium text-ink-dim"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Links — hidden entirely when the project has no real URL for them */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <ProjectLink
            href={project.github}
            label="GitHub"
            ariaLabel={`Open the ${project.title} repository on GitHub`}
            icon={<GithubIcon size={14} />}
          />
          <ProjectLink
            href={project.live}
            label="Live Site"
            ariaLabel={`Open the live ${project.title} website`}
            icon={<ExternalLink size={14} />}
          />
        </div>
      </div>
    </article>
  );
}
