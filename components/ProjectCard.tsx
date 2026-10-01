"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "@/data/projects";

interface ProjectLinkProps {
  href: string | undefined;
  label: string;
  icon: ReactNode;
}

/** Renders a normal link, or a clearly disabled button when no URL exists yet. */
function ProjectLink({ href, label, icon }: ProjectLinkProps) {
  if (!href) {
    return (
      <span
        className="btn btn-disabled px-3.5 py-2 text-xs"
        aria-disabled="true"
        title="No link yet — add one in data/projects.ts"
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
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

  return (
    <article
      className={`card card-hover flex h-full flex-col overflow-hidden ${featured ? "lg:flex-row" : ""}`}
    >
      {/* Media — an elegant placeholder shows when the image file is missing */}
      <div
        className={`relative aspect-video shrink-0 overflow-hidden border-b border-line/50 ${
          featured
            ? "lg:aspect-auto lg:w-1/2 lg:border-b-0 lg:border-r"
            : ""
        }`}
      >
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#0b1526] via-night-soft to-[#0d1a33] p-6">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative max-w-[90%] text-center">
            <span className="block break-words font-display text-base font-semibold text-ink-dim">
              {project.title}
            </span>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
              Project image
            </span>
          </div>
        </div>

        {imageOk && (
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onError={() => setImageOk(false)}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-5"}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-bright">
          {project.subtitle}
        </p>
        <h3
          className={`mt-2 font-display font-semibold leading-snug tracking-tight text-ink ${
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
              className="rounded-md border border-line/60 bg-night/50 px-2 py-1 font-mono text-[11px] text-ink-dim"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <ProjectLink
            href={project.github}
            label="GitHub"
            icon={<GithubIcon size={14} />}
          />
          <ProjectLink
            href={project.live}
            label="Live Demo"
            icon={<ExternalLink size={14} />}
          />
        </div>
      </div>
    </article>
  );
}
