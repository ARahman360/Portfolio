/**
 * Named placeholder icons. The data file stays free of React components so it
 * can be passed from a server component into the client-rendered ProjectCard.
 */
export type ProjectIconName = "kitchen" | "restaurant" | "layout";

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
  /** Describes what the screenshot shows, for screen readers. */
  imageAlt: string;
  /** Icon used by the placeholder shown when no screenshot file exists. */
  icon?: ProjectIconName;
  /** Leave undefined until a real repository exists — the button is then hidden. */
  github?: string;
  /** Leave undefined until a real deployment exists — the button is then hidden. */
  live?: string;
  /** The first project marked `featured: true` is displayed as a large hero card. */
  featured?: boolean;
}

/**
 * Projects shown in Featured Projects.
 *
 * Every entry here is a real project with a real repository. Coursework topic
 * cards were removed deliberately — PLC, Java and Python are still covered in
 * Skills and the Career Journey timeline.
 *
 * To add a project later: drop its screenshot in /public/projects/ and append
 * an entry here. A missing image is handled gracefully by the placeholder in
 * ProjectCard, so the page never shows a broken image.
 */
export const projects: Project[] = [
  {
    id: "homefoods",
    title: "HomeFoods",
    subtitle: "Homemade Food Delivery Platform",
    description:
      "HomeFoods is a multi-role food delivery web application focused on connecting customers with homemade food sellers. The platform includes dedicated experiences for customers, sellers, riders and administrators.",
    details:
      "Features include authentication, seller kitchens, food ordering, basket and favourites, delivery management, location handling, role-specific dashboards and seller/rider workflows.",
    technologies: ["React", "TypeScript", "Web Development", "UI/UX"],
    image: "/projects/homefoods.png",
    imageAlt: "HomeFoods food delivery platform interface",
    icon: "kitchen",
    github: "https://github.com/ARahman360/Projects/tree/main/home-foods",
    featured: true,
  },
  {
    id: "halali",
    title: "Halali",
    subtitle: "Interactive Restaurant Website",
    description:
      "Halali is a modern restaurant website project focused on responsive design and interactive customer experiences. The project includes restaurant presentation, menu browsing, customer account/profile interactions, ordering and basket functionality.",
    details:
      "This project helps me develop practical front-end development skills using HTML, CSS and JavaScript while building a polished restaurant interface.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
    image: "/projects/halali.png",
    imageAlt: "Halali restaurant website interface",
    icon: "restaurant",
    github: "https://github.com/ARahman360/Projects/tree/main/Halali",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    subtitle: "Interactive Developer & Engineering Portfolio",
    description:
      "A responsive personal portfolio built to present my studies, technical skills, projects and career development in Industrial Information Technology.",
    details:
      "The site includes reusable components, responsive design, light and dark themes, interactive navigation, project and career data, a contact form and deployment through Vercel.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/projects/portfolio.png",
    imageAlt: "Md Abdur Rahman personal portfolio homepage",
    icon: "layout",
    github: "https://github.com/ARahman360/Portfolio",
    live: "https://mdabdurrahman.vercel.app",
  },
];

/** "View All Projects" points at the real GitHub repositories list. */
export const allProjectsUrl = "https://github.com/ARahman360?tab=repositories";
