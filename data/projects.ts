export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Optional second paragraph — shown on the featured card. */
  details?: string;
  technologies: string[];
  /** Path inside /public — if the file is missing an elegant placeholder is shown. */
  image: string;
  /** Leave undefined until a real repository exists — the button renders as disabled. */
  github?: string;
  /** Leave undefined until a real deployment exists — the button renders as disabled. */
  live?: string;
  /** The first featured project is displayed as a large hero card. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "homefoods",
    title: "HomeFoods",
    subtitle: "Homemade Food Delivery Platform",
    description:
      "HomeFoods is a food delivery web application focused on connecting customers with homemade food sellers. The system includes different user roles for customers, sellers, riders and administrators.",
    details:
      "Features include authentication, seller kitchens, food ordering, delivery management, favourites, basket functionality, location handling and role-specific dashboards.",
    technologies: ["React", "TypeScript", "Web Development", "UI/UX"],
    image: "/projects/homefoods.jpg",
    featured: true,
  },
  {
    id: "plc-automation",
    title: "PLC & Industrial Automation Architecture",
    subtitle: "Automation systems and PLC architecture",
    description:
      "A university project exploring PLC architecture and industrial automation systems. The project covers automation control systems, modular PLC architecture, PLC programming methods, industrial communication, project lifecycle and smart factory integration.",
    technologies: ["PLC", "Automation", "Industrial Systems", "PROFINET", "SCADA"],
    image: "/projects/plc-automation.jpg",
  },
  {
    id: "java-projects",
    title: "Java Programming Projects",
    subtitle: "Collection of Java exercises and applications",
    description:
      "A collection of Java programming exercises and applications developed while learning object-oriented programming and software development concepts.",
    technologies: ["Java", "OOP", "Programming", "Git"],
    image: "/projects/java.jpg",
  },
  {
    id: "python-exercises",
    title: "Python Programming Exercises",
    subtitle: "University programming tasks",
    description:
      "A collection of Python programming tasks developed during my studies, including functions, file handling, user input, data processing and problem solving.",
    technologies: ["Python", "Data Processing", "File Handling", "Programming Fundamentals"],
    image: "/projects/python.jpg",
  },
];

/** "View All Projects" points at the real GitHub repositories list. */
export const allProjectsUrl = "https://github.com/ARahman360?tab=repositories";
