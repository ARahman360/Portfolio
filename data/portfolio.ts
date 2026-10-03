import {
  Briefcase,
  Building2,
  Code,
  Coffee,
  Cpu,
  GraduationCap,
  House,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  User,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------
   Every personal link lives in one place: `links` below.
   Replace "PLACEHOLDER" values with your real profiles — the site
   automatically hides/disables anything that is still a placeholder.
------------------------------------------------------------------ */
export const links = {
  github: "https://github.com/ARahman360",
  linkedin: "https://www.linkedin.com/in/md-abdur-rahman-6b1954440",
  email: "mdabdurrahman02.fi@gmail.com",
  cv: "/Md_Abdur_Rahman_CV.pdf",
  // Real domain — used for Open Graph / canonical URLs in app/layout.tsx.
  siteUrl: "https://mdabdurrahman.vercel.app",
};

export const profile = {
  name: "Md Abdur Rahman",
  monogram: "AR",
  kicker: "Industrial Information Technology Student",
  headline: "Industrial Information Technology Student",
  university: "LAB University of Applied Sciences",
  degree: "Industrial Information Technology",
  location: "Finland",
  /** Field of study, shown as SPECIALTY on the hero ID badge. */
  specialty: "Industrial Information Technology",
  /** Areas currently being developed — shown as CURRENT FOCUS on the badge. */
  currentFocus: "Automation • PLC • Networking",
  /** Student availability. This is not an employment status. */
  availability: "Open to Opportunities",
  /** Left-hand text on the badge's bottom identifier row. */
  badgeFooter: "LAB University of Applied Sciences",
  heroDescription:
    "I am an Industrial Information Technology student at LAB University of Applied Sciences in Finland. I am interested in software development, industrial automation, PLC systems, networking and modern digital technologies.",
  about: [
    "I am an Industrial Information Technology student at LAB University of Applied Sciences. My studies combine information technology with industrial systems, which has helped me develop an interest in both software and automation.",
    "I enjoy learning how different technologies work together, from programming and networking to PLCs and industrial automation. I like building practical projects and continuously developing my technical skills.",
    "I am looking for opportunities where I can gain real-world experience, learn new technologies and contribute to useful projects.",
  ],
  contactIntro:
    "I am interested in internships, trainee positions, student projects and opportunities where I can develop my skills in information technology, software or industrial technology.",
};

const isPlaceholder = (value: string): boolean =>
  value.trim().toUpperCase() === "PLACEHOLDER";

/** null when the email address has not been added yet. */
export const mailHref: string | null = isPlaceholder(links.email)
  ? null
  : `mailto:${links.email.replace(/^mailto:/i, "")}`;

export const linkedinHref: string | null = isPlaceholder(links.linkedin)
  ? null
  : links.linkedin;

export interface NavLink {
  id: string;
  label: string;
  /** Icon used by the floating dock navigation. */
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Building2 },
  { id: "contact", label: "Contact", icon: Mail },
];

export interface Tag {
  icon: LucideIcon;
  label: string;
}

export const techChips: Tag[] = [
  { icon: Code, label: "Python" },
  { icon: Coffee, label: "Java" },
  { icon: Workflow, label: "Automation" },
  { icon: Network, label: "Networking" },
  { icon: Terminal, label: "Linux" },
];

export const heroInterests: Tag[] = [
  { icon: Cpu, label: "Industrial Automation" },
  { icon: Code, label: "Software Development" },
  { icon: Network, label: "Networking & Systems" },
  { icon: ShieldCheck, label: "Cybersecurity" },
  { icon: Sparkles, label: "Modern Digital Technology" },
];

export interface EducationEntry {
  institution: string;
  program: string;
  degree: string;
  location: string;
  status: string;
  description: string;
}

export const education: EducationEntry[] = [
  {
    institution: "LAB University of Applied Sciences",
    program: "Industrial Information Technology",
    degree: "Bachelor's Degree",
    location: "Finland",
    status: "Ongoing",
    description:
      "My studies focus on information technology and its applications in industrial environments, including programming, automation, industrial systems, networking and digital technologies.",
  },
];

export interface Area {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const exploring: Area[] = [
  {
    icon: Workflow,
    title: "Industrial Automation",
    description: "PLC programming, control systems and smart factory concepts.",
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Building practical applications with modern programming languages.",
  },
  {
    icon: Network,
    title: "Networking",
    description: "How networks are designed, configured and kept reliable.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Core principles for protecting systems, data and industrial networks.",
  },
  {
    icon: Sparkles,
    title: "Artificial Intelligence",
    description: "How AI tools can support engineering and industrial workflows.",
  },
];
