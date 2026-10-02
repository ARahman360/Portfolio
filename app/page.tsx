'use client';

import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Network,
  ShieldCheck,
  TerminalSquare,
  Wrench,
} from 'lucide-react';

const skills = [
  { group: 'Programming', icon: Code2, items: ['Python', 'Java', 'HTML', 'CSS'] },
  { group: 'Development tools', icon: TerminalSquare, items: ['Git', 'GitHub', 'Linux', 'VS Code'] },
  { group: 'Industrial technology', icon: Cpu, items: ['PLC systems', 'Automation', 'SCADA', 'Industrial systems'] },
  { group: 'IT & systems', icon: Network, items: ['Networking', 'TCP/UDP', 'Cybersecurity', 'AI tools'] },
];

const projects = [
  {
    title: 'HomeFoods',
    subtitle: 'Homemade Food Delivery Platform',
    description: 'A role-based food delivery platform for customers, sellers, riders and admins, with ordering, kitchens, favourites, basket and delivery workflows.',
    tags: ['React', 'TypeScript', 'Web Development'],
    className: 'project-homefoods',
  },
  {
    title: 'PLC & Industrial Automation',
    subtitle: 'Automation systems and PLC architecture',
    description: 'A university project covering control systems, modular PLC architecture, industrial communication, project lifecycle and smart factory integration.',
    tags: ['PLC', 'Automation', 'Industrial Systems'],
    className: 'project-plc',
  },
  {
    title: 'Java Programming Projects',
    subtitle: 'Java exercises and small applications',
    description: 'Practice projects focused on classes, methods, object-oriented programming, application logic and clean program structure.',
    tags: ['Java', 'OOP', 'Git'],
    className: 'project-java',
  },
  {
    title: 'Python Programming Exercises',
    subtitle: 'University programming tasks',
    description: 'Exercises covering functions, file handling, input validation, data processing and problem-solving in Python.',
    tags: ['Python', 'Data Processing', 'File Handling'],
    className: 'project-python',
  },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Go to home">A<span>R</span>.</a>
        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="socials">
          <a href="https://github.com/ARahman360" target="_blank" aria-label="GitHub"><Github size={18} /></a>
          <a href="#contact" aria-label="LinkedIn placeholder"><Linkedin size={18} /></a>
          <a href="mailto:your.email@example.com" aria-label="Email"><Mail size={18} /></a>
          <a className="cv-button" href="/Md_Abdur_Rahman_CV.pdf" download>
            <Download size={16} /> Download CV
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-copy">
          <p className="eyebrow">INDUSTRIAL INFORMATION TECHNOLOGY STUDENT</p>
          <h1>Hi, I’m<br />Md Abdur <span>Rahman</span></h1>
          <p className="hero-text">
            I study Industrial Information Technology at LAB University of Applied Sciences in Finland. I am interested in software development, industrial automation, PLC systems, networking and modern digital technologies.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">View My Projects <ArrowRight size={18} /></a>
            <a className="secondary-button" href="/Md_Abdur_Rahman_CV.pdf" download><Download size={18} /> Download CV</a>
          </div>
          <div className="chips">
            {['Python', 'Java', 'Automation', 'Networking', 'Linux'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="hero-visual" aria-label="Industrial technology illustration">
          <div className="tech-orbit orbit-one" />
          <div className="tech-orbit orbit-two" />
          <div className="avatar-card">
            <div className="avatar-monogram">AR</div>
            <div>
              <strong>Industrial IT</strong>
              <small>Software × Automation × Systems</small>
            </div>
          </div>
          <div className="mini-card university-card">
            <GraduationCap size={24} />
            <div><strong>LAB University</strong><span>Industrial Information Technology</span></div>
          </div>
          <div className="mini-card focus-card">
            <Cpu size={24} />
            <div><strong>Current focus</strong><span>PLC • Networks • Software</span></div>
          </div>
        </div>
      </section>

      <section className="section split" id="about">
        <div>
          <SectionTitle eyebrow="ABOUT" title="About Me" />
          <p>I am an Industrial Information Technology student at LAB University of Applied Sciences. My studies combine information technology with industrial systems, which has helped me develop an interest in both software and automation.</p>
          <p>I enjoy learning how different technologies work together, from programming and networking to PLCs and industrial automation. I like building practical projects and continuously developing my technical skills.</p>
          <a className="text-link" href="#contact">Let’s connect <ArrowRight size={16} /></a>
        </div>
        <div id="skills">
          <SectionTitle eyebrow="SKILLS" title="Technical Skills" />
          <div className="skill-grid">
            {skills.map(({ group, icon: Icon, items }) => (
              <article className="skill-card" key={group}>
                <div className="skill-title"><Icon size={19} /><strong>{group}</strong></div>
                <div className="skill-items">{items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-row">
          <SectionTitle eyebrow="WORK" title="Featured Projects" />
          <a className="text-link" href="https://github.com/ARahman360" target="_blank">View GitHub <ArrowRight size={16} /></a>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className={`project-art ${project.className}`}>
                <div className="art-grid" />
                <span>{project.title === 'HomeFoods' ? 'HF' : project.title.startsWith('PLC') ? 'PLC' : project.title.startsWith('Java') ? 'JAVA' : 'PY'}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p>{project.description}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bottom-grid">
        <div className="info-card" id="education">
          <div className="info-icon"><GraduationCap /></div>
          <div>
            <span className="label">EDUCATION</span>
            <h3>LAB University of Applied Sciences</h3>
            <strong>Industrial Information Technology</strong>
            <p>Bachelor’s degree studies • Finland</p>
          </div>
        </div>

        <div className="info-card" id="experience">
          <div className="info-icon"><BriefcaseBusiness /></div>
          <div>
            <span className="label">EXPERIENCE</span>
            <h3>Practical work experience</h3>
            <p>Kitchen and supermarket work strengthened my teamwork, reliability, hygiene awareness, organization and ability to work efficiently in busy environments.</p>
          </div>
        </div>

        <div className="info-card interests-card">
          <div className="info-icon"><Wrench /></div>
          <div>
            <span className="label">INTERESTS</span>
            <div className="interest-list">
              <span><Cpu size={16} /> Industrial Automation</span>
              <span><Code2 size={16} /> Software Development</span>
              <span><Network size={16} /> Networking</span>
              <span><ShieldCheck size={16} /> Cybersecurity</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div>
          <span className="label">CONTACT</span>
          <h2>Let’s build something useful.</h2>
          <p>I am interested in internships, trainee positions, student projects and opportunities in software, automation and industrial IT.</p>
        </div>
        <div className="contact-actions">
          <a href="mailto:your.email@example.com"><Mail size={18} /> your.email@example.com</a>
          <a href="https://github.com/ARahman360" target="_blank"><Github size={18} /> github.com/ARahman360</a>
          <span><MapPin size={18} /> Finland</span>
        </div>
      </section>

      <footer>
        <p>© 2026 Md Abdur Rahman. Built with curiosity, code and continuous learning.</p>
      </footer>
    </main>
  );
}
