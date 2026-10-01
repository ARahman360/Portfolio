import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Exploring from "@/components/Exploring";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      {/* About + Skills share one band, side by side */}
      <div className="border-t border-line/40 py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <About className="lg:col-span-5" />
          <Skills className="lg:col-span-7" />
        </div>
      </div>

      <Exploring />

      <Projects />

      {/* Education + Experience share one band */}
      <div className="border-t border-line/40 py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-10">
          <Education />
          <Experience />
        </div>
      </div>

      <Contact />
    </main>
  );
}
