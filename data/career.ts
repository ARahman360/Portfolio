import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Factory,
  GraduationCap,
  Network,
  Terminal,
  Utensils,
  Workflow,
} from "lucide-react";

/**
 * Career Journey data.
 *
 * These entries describe what is being studied and built *now* — not
 * employment history. No dates, employers or job titles are implied, and no
 * entry claims professional experience.
 *
 * To add real work experience later, append an entry here. If you have genuine
 * employment dates at that point, add an optional `period` field and it will be
 * rendered next to the category label.
 */
export interface CareerEntry {
  /** Small uppercase label above the title, e.g. "CURRENT STUDIES". */
  category: string;
  title: string;
  /** University, project owner or context shown under the title. */
  organization?: string;
  description: string;
  /** Small technology chips shown under the description. */
  tags: string[];
  icon: LucideIcon;
  /** Optional external link (opened in a new tab). */
  link?: string;
  /** Short label for the link button, e.g. "View project". */
  linkLabel?: string;
  /**
   * Marks an entry that describes where the career is heading rather than
   * something already done — rendered with a dashed accent and its own node.
   */
  direction?: boolean;
  /** Optional period label — only add once you have a real, verifiable date. */
  period?: string;
}

export const careerEntries: CareerEntry[] = [
  {
    category: "Current Studies",
    title: "Industrial Information Technology",
    organization: "LAB University of Applied Sciences",
    description:
      "Building knowledge in industrial information technology with a focus on automation, programming, networking, digital systems and the technologies used in modern industrial environments.",
    tags: ["Industrial IT", "Automation", "Programming", "Networking"],
    icon: GraduationCap,
  },
  {
    category: "Technical Focus",
    title: "PLC & Automation Systems",
    description:
      "Developing my understanding of PLC architecture, automation control systems, IEC 61131-3 programming concepts, sensors, actuators, industrial communication and automation project design.",
    tags: ["PLC", "Automation", "IEC 61131-3", "Industrial Control"],
    icon: Workflow,
  },
  {
    category: "Software Project",
    title: "HomeFoods — Food Delivery Platform",
    description:
      "Developing a multi-role food delivery platform with dedicated experiences for customers, sellers, riders and administrators. The project gives me practical experience in application design, user roles, ordering workflows, dashboards and modern web development.",
    tags: ["React", "TypeScript", "Web Development", "UI/UX"],
    icon: Code2,
    link: "https://github.com/ARahman360/Projects/tree/main/home-foods",
    linkLabel: "View project",
  },
  {
    category: "Web Development Project",
    title: "Halali — Restaurant Website",
    description:
      "Building a modern restaurant website focused on responsive interface design and interactive customer experiences. The project includes menu browsing, customer account and profile interactions, ordering and basket functionality, helping me develop practical front-end JavaScript and UI skills.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
    icon: Utensils,
    link: "https://github.com/ARahman360/Projects/tree/main/Halali",
    linkLabel: "View project",
  },
  {
    category: "Currently Learning",
    title: "Networking & Connected Systems",
    description:
      "Developing practical understanding of computer networking, TCP/IP, Linux and system communication, with particular interest in how connected systems support industrial environments.",
    tags: ["Networking", "TCP/IP", "Linux", "Systems"],
    icon: Network,
  },
  {
    category: "Skill Development",
    title: "Programming Development",
    description:
      "Building programming experience through Java and Python coursework and projects, focusing on application logic, object-oriented programming, functions, data handling and problem solving.",
    tags: ["Java", "Python", "OOP", "Problem Solving"],
    icon: Terminal,
  },
  {
    category: "Career Direction",
    title: "Industrial Digitalization & Smart Systems",
    description:
      "Exploring how automation, software, networking and data systems work together in smart factories and modern industrial environments.",
    tags: ["Smart Factory", "Industrial Systems", "OT / IT", "Digitalization"],
    icon: Factory,
    direction: true,
  },
];

/**
 * Roles the visitor is building skills toward — interests and target career
 * paths, not positions held. Deliberately unranked.
 */
export const targetRoles: string[] = [
  "Automation Engineer / Automation Trainee",
  "PLC Programmer",
  "Industrial IT / OT Specialist",
  "Industrial Network Engineer / Technician",
  "Junior Software Developer",
  "IoT / Smart Factory Engineer",
  "OT Cybersecurity Trainee",
  "Systems / Technical Support Engineer",
];

/** Roles shown before the "show all" expander is opened. */
export const initialRoleCount = 6;

/** Short, honest summary of the section — no employment implied. */
export const careerSummary = `${careerEntries.length} areas in development`;
