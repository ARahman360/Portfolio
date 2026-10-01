import {
  AppWindow,
  Boxes,
  Braces,
  Coffee,
  Code,
  Cpu,
  Database,
  Factory,
  FileCode,
  FolderGit2,
  GitBranch,
  Gauge,
  Network,
  Palette,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: Braces,
    skills: [
      { name: "Python", icon: Code },
      { name: "Java", icon: Coffee },
      { name: "HTML", icon: FileCode },
      { name: "CSS", icon: Palette },
    ],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: FolderGit2 },
      { name: "Linux", icon: Terminal },
      { name: "VS Code", icon: AppWindow },
    ],
  },
  {
    title: "Industrial Technology",
    icon: Factory,
    skills: [
      { name: "PLC", icon: Cpu },
      { name: "Industrial Automation", icon: Workflow },
      { name: "SCADA", icon: Gauge },
      { name: "Industrial Systems", icon: Boxes },
    ],
  },
  {
    title: "IT & Systems",
    icon: Server,
    skills: [
      { name: "Networking", icon: Network },
      { name: "Databases", icon: Database },
      { name: "Cybersecurity", icon: ShieldCheck },
      { name: "AI Tools", icon: Sparkles },
    ],
  },
];
