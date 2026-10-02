import {
  Briefcase,
  Building2,
  ChefHat,
  Code,
  Coffee,
  Cpu,
  GraduationCap,
  House,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Store,
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
  linkedin: "PLACEHOLDER",
  email: "PLACEHOLDER",
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
  /** Short field label used on the hero ID badge. */
  specialty: "Industrial IT & Automation",
  /** Decorative badge serial printed at the bottom of the hero ID card. */
  badgeId: "LAB-IIT-2026",
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

export interface ExperienceEntry {
  icon: LucideIcon;
  title: string;
  /** Employer / project context shown under the title. */
  organization?: string;
  /** Short period label shown above the title. */
  period?: string;
  description: string;
  /** Small technology chips shown under the description. */
  tags?: string[];
  /**
   * Marks placeholder content that is not a real role. Sample entries are
   * badged "Sample" in the UI — replace or delete them once you have
   * real project or internship experience to show.
   */
  sample?: boolean;
}

export const experiences: ExperienceEntry[] = [
  {
    icon: ChefHat,
    title: "Kitchen Work",
    period: "Work experience",
    description:
      "Worked in a fast-paced kitchen environment where teamwork, hygiene, cleanliness and time management were important. The experience helped me develop responsibility, efficiency and teamwork skills.",
  },
  {
    icon: Store,
    title: "Supermarket Experience",
    period: "Work experience",
    description:
      "Worked in a retail environment and gained experience in organization, cleanliness, customer service and working efficiently in a busy workplace.",
  },
  {
    icon: Workflow,
    title: "PLC Programming Course Project",
    organization: "Industrial automation coursework",
    period: "Academic project",
    description:
      "Built a small conveyor control system in ladder and structured-text logic, covering sensor inputs, actuator outputs, safety interlocks and fault handling in a simulated control panel.",
    tags: ["PLC", "Ladder logic", "HMI", "Industrial control"],
    sample: true,
  },
  {
    icon: Network,
    title: "Industrial Network Lab",
    organization: "Networking coursework",
    period: "Academic project",
    description:
      "Configured a small segmented industrial network with VLANs, static and DHCP addressing, and diagnostics to study how automation devices stay reliable on the shop floor.",
    tags: ["Cisco IOS", "VLAN", "TCP/IP", "Troubleshooting"],
    sample: true,
  },
  {
    icon: Code,
    title: "Python Automation Utilities",
    organization: "Personal project",
    period: "Self-directed",
    description:
      "Wrote Python tools that read sensor and production data from CSV and JSON sources, then clean it, chart trends and export reports on a schedule.",
    tags: ["Python", "Pandas", "Automation", "Data handling"],
    sample: true,
  },
];

/** Real (non-sample) roles — used for the badge's experience count. */
export const realExperienceCount = experiences.filter((item) => !item.sample).length;

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
