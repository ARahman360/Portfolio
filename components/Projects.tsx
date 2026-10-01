import { ArrowUpRight, Rocket } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { allProjectsUrl, projects } from "@/data/projects";

export default function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project !== featured);

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line/40 py-20 sm:py-24">
      <div className="shell">
        <SectionHeading
          icon={Rocket}
          title="Featured Projects"
          action={
            <a
              href={allProjectsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost px-4 py-2.5 text-sm"
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

          {rest.map((project, index) => (
            <Reveal key={project.id} delay={(index + 1) * 80} className="h-full lg:col-span-2">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
