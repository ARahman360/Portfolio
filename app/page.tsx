import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Exploring from "@/components/Exploring";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import StatsBand from "@/components/StatsBand";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      {/* Skill pills scrolling in both directions */}
      <TechMarquee />

      {/* Big-number stats band */}
      <StatsBand />

      {/* About + Skills share one band, side by side */}
      <div className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <About className="lg:col-span-5" />
          <Skills className="lg:col-span-7" />
        </div>
      </div>

      <Exploring />

      <Projects />

      {/* Education */}
      <div className="border-t border-line py-20 sm:py-24">
        <div className="shell">
          <Education />
        </div>
      </div>

      {/* Career journey timeline — full width */}
      <div className="py-20 sm:py-24">
        <div className="shell max-w-3xl">
          <Experience />
        </div>
      </div>

      <Contact />
    </main>
  );
}
