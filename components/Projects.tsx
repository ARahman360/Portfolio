import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { allProjectsUrl, projects } from "@/data/projects";

export default function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project !== featured);

  return (
    /* The generous bottom padding keeps the floating dock (which only shows from
       the lg breakpoint) from ever covering the last row of project cards. */
    <section
      id="projects"
      className="scroll-mt-32 border-t border-line pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pb-36"
    >
      <div className="shell">
        <SectionHeading
          title="Featured Projects"
          subtitle="Platforms and websites I am actively building and maintaining."
          action={
            <a
              href={allProjectsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all repositories on GitHub"
              className="btn btn-ghost px-5 py-2.5 text-sm"
            >
              View All Projects
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {featured ? (
            <Reveal className="h-full md:col-span-2 lg:col-span-6">
              <ProjectCard project={featured} featured />
            </Reveal>
          ) : null}

          {/* Two remaining projects fill the row evenly; with a different count
              they still stack cleanly on md and below. */}
          {rest.map((project, index) => (
            <Reveal key={project.id} delay={(index + 1) * 80} className="h-full md:col-span-1 lg:col-span-3">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
