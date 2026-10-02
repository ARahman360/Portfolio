import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/portfolio";

interface AboutProps {
  className?: string;
}

export default function About({ className = "" }: AboutProps) {
  return (
    <section id="about" className={`scroll-mt-32 ${className}`}>
      <SectionHeading
        title="About Me"
        subtitle="Who I am, what I study and what keeps me interested in technology."
      />

      <Reveal delay={80}>
        <div className="grid gap-5 text-[15px] leading-7 text-ink-dim sm:text-base sm:leading-8">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <a href="#exploring" className="btn btn-ghost mt-8">
          More About Me
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
